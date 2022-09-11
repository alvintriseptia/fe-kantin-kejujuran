import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/material";

import axios from "axios";
import config from "../configs/config.json";

import { useBalance } from "../contexts/BalanceContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useAuth } from "../contexts/AuthContext";

export default function TransactionForm({ open, setOpen, type }) {
	const [error, setError] = useState(null);
	const auth = useAuth();
	const balance = useBalance();
	const snackbar = useSnackbar();

	const handleClose = () => {
		setOpen(false);
	};

	// form
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful, errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const url = `${config.API_URL}/box/${type}`;
			const response = await axios.post(
				url,
				{
					amount: data.price,
				},
				{
					headers: {
						"x-access-token": auth.token,
					},
				}
			);
			snackbar.setSnackbar(response.data.message, 1);
			handleClose();
			if (type === "add") {
				balance.setBalance(balance.balance + parseInt(data.price));
			} else if (type === "withdraw") {
				balance.setBalance(balance.balance - parseInt(data.price));
			}
		} catch (error) {
			if (error.response.status === 401) {
				auth.logout();
			}
			setError(error.response.data.message);
			throw error;
		}
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({
				productName: "",
				price: "",
				description: "",
			});
		}
	}, [formState, isSubmitSuccessful, reset]);

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle
					variant="h2"
					component="h2"
					id="alert-dialog-title"
					sx={{
						borderBottom: "2px solid rgba(0,0,0,0.1)",
						textAlign: "center",
					}}
				>
					Enter amount do you want {type}
				</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<Stack>
							<TextField
								id="outlined-required"
								label="Price"
								inputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
									autoFocus: true,
								}}
								{...register("price", { min: 0, required: true })}
							/>
							{errors.price && (
								<p className="text-red-600 text-xs">Price is required</p>
							)}
							{error && <p className="text-red-600 text-xs">{error}</p>}
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button
							size="small"
							sx={{
								border: "2px solid #EB1484",
								color: "#2D2E36",
								paddingX: "1.5rem",
								textTransform: "capitalize",
							}}
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button
							size="small"
							variant="contained"
							autoFocus
							sx={{
								background:
									"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
								color: "#fff",
								paddingX: "1.5rem",
								textTransform: "capitalize",
							}}
							type="submit"
						>
							{type && type[0].toUpperCase() + type.substring(1)}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
