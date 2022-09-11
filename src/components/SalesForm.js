import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { PhotoCamera } from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
	Alert,
	Card,
	CardMedia,
	IconButton,
	LinearProgress,
	Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import config from "../configs/config.json";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function SalesForm({ setIsSubmitted }) {
	const [open, setOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const auth = useAuth();
	const snackbar = useSnackbar();

	const handleImage = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedImage(e.target.files[0]);
		}
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
			setLoading(true);
			const formData = new FormData();
			formData.append("productName", data.productName);
			formData.append("productImage", selectedImage);
			formData.append("price", data.price);
			formData.append("description", data.description);
			const url = `${config.API_URL}/products`;
			const response = await axios.post(url, formData, {
				headers: {
					"Content-Type": "application/json",
					"x-access-token": auth.token,
				},
			});
			setLoading(false);
			setSelectedImage(null);
			snackbar.setSnackbar(response.data.message, 1);
			setIsSubmitted(true);
			handleClose();
		} catch (error) {
			if (error.status === 401) {
				auth.logout();
			} else if (error.response.data) {
				setError(error.response.data.message);
			}
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
			console.log("here");
		}
	}, [formState, isSubmitSuccessful, reset]);

	return (
		<div>
			<Button
				sx={{
					background:
						"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
					color: "#fff",
					paddingX: "1.5rem",
					textTransform: "capitalize",
				}}
				onClick={handleOpen}
			>
				Sell An Item
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography
							id="transition-modal-title"
							variant="h2"
							component="h2"
							sx={{
								borderBottom: "2px solid rgba(0,0,0,0.1)",
								textAlign: "center",
								paddingBottom: "1rem",
							}}
						>
							Sale your item
						</Typography>
						<form
							encType="multipart/form-data"
							onSubmit={handleSubmit(onSubmit)}
						>
							<Stack mt={1} spacing={2}>
								<Stack>
									<div>{loading && <LinearProgress />}</div>
									{error && <Alert severity="error">{error.message}</Alert>}
								</Stack>
								<Stack>
									<TextField
										inputProps={{ style: { fontSize: "1rem" } }}
										size="small"
										id="outlined-required"
										label="Product Name"
										{...register("productName", { required: true })}
									/>
									{errors.productName && (
										<Typography
											variant="captionRegular"
											component="p"
											color="red"
										>
											Product Name is required
										</Typography>
									)}
								</Stack>
								<Stack>
									<TextField
										size="small"
										id="outlined-required"
										label="Price"
										inputProps={{
											inputMode: "numeric",
											pattern: "[0-9]*",
											style: { fontSize: "1rem" },
										}}
										{...register("price", { min: 0, required: true })}
									/>
									{errors.price && (
										<Typography
											variant="captionRegular"
											component="p"
											color="red"
										>
											Price is required
										</Typography>
									)}
								</Stack>
								<Stack>
									<TextField
										inputProps={{ style: { fontSize: "1rem" } }}
										size="small"
										id="filled-multiline-flexible"
										label="Description"
										multiline
										minRows={4}
										maxRows={4}
										{...register("description", { required: true })}
									/>
									{errors.description && (
										<Typography
											variant="captionRegular"
											component="p"
											color="red"
										>
											Description is required
										</Typography>
									)}
								</Stack>
								<Stack direction="row" spacing={1} alignItems="center">
									<Card sx={{ width: 130, height: 100 }}>
										{selectedImage ? (
											<CardMedia
												component="img"
												sx={{
													objectFit: "contain",
													width: "100%",
													height: "100%",
												}}
												image={URL.createObjectURL(selectedImage)}
												alt={selectedImage.name}
											/>
										) : (
											<Stack
												justifyContent="center"
												alignItems="center"
												sx={{ width: "100%", height: "100%" }}
											>
												<Typography variant="smallRegular" component="div">
													Upload an image
												</Typography>
											</Stack>
										)}
									</Card>
									<label htmlFor="upload-button">
										<input
											style={{ display: "none" }}
											accept="image/*"
											id="upload-button"
											type="file"
											onChange={handleImage}
										/>
										<IconButton
											color="primary"
											aria-label="upload picture"
											component="span"
										>
											<PhotoCamera />
											<Typography variant="body1Semibold" component="div">
												Upload an Image
											</Typography>
										</IconButton>
										{errors.productImage && (
											<Typography
												variant="captionRegular"
												component="p"
												color="red"
											>
												Image is required
											</Typography>
										)}
									</label>
								</Stack>
								<Button variant="contained" type="submit">
									Submit
								</Button>
							</Stack>
						</form>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
