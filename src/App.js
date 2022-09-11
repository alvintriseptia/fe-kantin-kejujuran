import Login from "./components/Login";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/Register";
import CustomSnackbar from "./components/CustomSnackbar";
import { useSnackbar } from "./contexts/SnackbarContext";

import { useAuth } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

import config from "./configs/config.json";

import { CircularProgress, Stack } from "@mui/material";

import Store from "./Store";
import CanteenBox from "./CanteenBox";
import Home from "./Home";
import Product from "./Product";

function App() {
	const auth = useAuth();
	const [loading, setLoading] = useState(true);
	const snackbar = useSnackbar();

	// verify token
	useEffect(() => {
		const verifyToken = async () => {
			try {
				const tokenUser = localStorage.getItem("token");
				if (tokenUser) {
					await axios.get(`${config.API_URL}/verify`, {
						headers: {
							"x-access-token": tokenUser,
						},
					});
					auth.setToken(tokenUser);
				}
			} catch (error) {
				if (error.response.status === 401) {
					auth.logout();
				}
				throw error;
			}
		};
		verifyToken();
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, [auth, auth.token]);

	return (
		<>
			{loading ? (
				<Stack
					sx={{ width: "100vw", height: "100vh" }}
					justifyContent="center"
					alignItems="center"
				>
					<CircularProgress color="success" />
				</Stack>
			) : (
				<>
					<BrowserRouter>
						<Navbar />
						{snackbar.message !== "" && (
							<CustomSnackbar message={snackbar.message} code={snackbar.code} />
						)}
						<Routes>
							{!auth.token && (
								<>
									<Route
										path="/login"
										element={
											auth.token ? <Navigate replace to="/" /> : <Login />
										}
									/>
									<Route
										path="/register"
										element={
											auth.token ? (
												<Navigate replace to="/" />
											) : (
												<RegisterForm />
											)
										}
									/>
								</>
							)}
							<Route path="/" element={<Home />} />
							<Route path="/store" element={<Store />} />
							<Route path="/store/:id" element={<Product />} />
							<Route
								path="/box"
								element={
									auth.token ? <CanteenBox /> : <Navigate replace to="/" />
								}
							/>
						</Routes>
					</BrowserRouter>
				</>
			)}
		</>
	);
}

export default App;
