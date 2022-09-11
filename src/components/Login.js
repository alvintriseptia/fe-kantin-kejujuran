import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import config from "../configs/config.json";
import axios from "axios";

import { Alert, Container, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "../contexts/SnackbarContext";

function Login() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const { login } = useAuth();
	const snackbar = useSnackbar();

	const onSubmit = async (data) => {
		setLoading(true);
		setError(null);
		try {
			const url = `${config.API_URL}/login`;
			const response = await axios.post(url, data);
			if (response) {
				login(response.data.token);
				snackbar.setSnackbar(response.data.message, 1);
				navigate(-1, { replace: true });
			}
			setLoading(false);
		} catch (error) {
			setError(error.response.data.message);
			setLoading(false);
			throw error;
		}
	};

	return (
		<Container maxWidth="lg">
			<Typography mt={2} variant="h4" fontWeight="bold">
				Login Form
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack mt={4} mb={2} spacing={2}>
					{error && <Alert severity="error">{error}</Alert>}
					<TextField
						id="studentId"
						label="Student ID"
						inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
						{...register("studentID", { required: true })}
					/>
					{errors.studentID && (
						<Typography color="red" variant="captionRegular" component="p">
							Student ID is required
						</Typography>
					)}
					<TextField
						id="password"
						type="password"
						label="Password"
						{...register("password", { required: true })}
					/>
					{errors.password && (
						<Typography color="red" variant="captionRegular" component="p">
							Password is required
						</Typography>
					)}
					<LoadingButton
						sx={{
							background:
								"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
							color: "#fff",
							paddingX: "1.5rem",
							textTransform: "capitalize",
						}}
						loading={loading}
						variant="contained"
						type="submit"
					>
						Login
					</LoadingButton>
				</Stack>
			</form>
			<Typography textAlign="center" component="div">
				<Link to="/register">
					Don't have an account?{" "}
					<Typography component="span" color="redViolet">
						Register
					</Typography>
				</Link>
			</Typography>
		</Container>
	);
}

export default Login;
