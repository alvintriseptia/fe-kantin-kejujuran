import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../configs/config.json";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import priceInRupiah from "../utils/priceInRupiah";

function Checkout({ productId, image, productName, price, open, setOpen }) {
	const auth = useAuth();
	const snackbar = useSnackbar();
	const handleClose = () => {
		setOpen(false);
	};
	const [isSuccess, setIsSuccess] = useState(false);
	const [counter, setCounter] = useState(2);
	const handleSubmit = async () => {
		try {
			const url = `${config.API_URL}/products/buy/${productId}`;
			await axios.post(
				url,
				{},
				{
					headers: {
						"x-access-token": auth.token,
					},
				}
			);
			setIsSuccess(true);
			setTimeout(() => {
				window.location.href = "/store";
			}, 2000);
		} catch (error) {
			if (error.status === 401) {
				auth.logout();
			}
			snackbar.setSnackbar(error.response.data.message, 0);
			throw error;
		}
	};

	useEffect(() => {
		if (isSuccess) {
			counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
		}
	}, [counter, isSuccess]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			{auth.token
				? isSuccess
					? [
							<DialogTitle
								variant="h2"
								component="h2"
								id="alert-dialog-title"
								sx={{
									borderBottom: "2px solid rgba(0,0,0,0.1)",
									textAlign: "center",
								}}
							>
								Payment Successful
							</DialogTitle>,
							<DialogContent sx={{ width: "300px" }}>
								<Stack alignItems="center" mt={2}>
									<Box mt={1} sx={{ textAlign: "center" }}>
										<img src={image} alt="product" width={200} height={200} />
										<Typography
											component="p"
											variant="body2Regular"
											sx={{ marginTop: "1rem" }}
										>
											You successfully purchased <strong>{productName}</strong>
										</Typography>
										<Typography
											component="p"
											variant="captionRegular"
											sx={{ marginTop: "1rem" }}
										>
											redirect in {counter}
										</Typography>
									</Box>
								</Stack>
							</DialogContent>,
					  ]
					: [
							<DialogTitle
								variant="h2"
								component="h2"
								id="alert-dialog-title"
								sx={{
									borderBottom: "2px solid rgba(0,0,0,0.1)",
									textAlign: "center",
								}}
							>
								Checkout
							</DialogTitle>,
							<DialogContent sx={{ width: "300px" }}>
								<Stack alignItems="center" mt={2}>
									<Typography component="div" variant="body1Semibold">
										Item
									</Typography>
									<Box mt={1} sx={{ textAlign: "center" }}>
										<img src={image} alt="product" width={100} height={100} />
										<Typography component="p" variant="body2Regular">
											{productName}
										</Typography>
									</Box>
								</Stack>
								<Stack
									direction="row"
									justifyContent="center"
									alignItems="center"
									spacing={1}
									mt={1}
								>
									<Typography component="div" variant="body1Semibold">
										Price :
									</Typography>
									<Typography component="p" variant="body2Regular">
										{priceInRupiah(price)}
									</Typography>
								</Stack>
							</DialogContent>,
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
									onClick={handleSubmit}
									sx={{
										background:
											"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
										color: "#fff",
										paddingX: "1.5rem",
										textTransform: "capitalize",
									}}
								>
									Buy
								</Button>
							</DialogActions>,
					  ]
				: [
						<DialogTitle
							variant="h2"
							component="h2"
							id="alert-dialog-title"
							sx={{
								borderBottom: "2px solid rgba(0,0,0,0.1)",
								textAlign: "center",
							}}
						>
							You need to be logged in
						</DialogTitle>,
						<DialogActions>
							<Button
								size="small"
								sx={{
									border: "2px solid #EB1484",
									color: "#2D2E36",
									paddingX: "1.5rem",
									textTransform: "capitalize",
									marginRight: "1rem",
								}}
								onClick={handleClose}
							>
								Cancel
							</Button>
							<Link to="/login">
								<Button
									size="small"
									variant="contained"
									onClick={handleClose}
									autoFocussize="small"
									sx={{
										background:
											"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
										color: "#fff",
										paddingX: "1.5rem",
										textTransform: "capitalize",
									}}
								>
									Login Now
								</Button>
							</Link>
						</DialogActions>,
				  ]}
		</Dialog>
	);
}

export default Checkout;
