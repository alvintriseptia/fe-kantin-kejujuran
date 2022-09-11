import {
	Box,
	Button,
	Container,
	Grid,
	LinearProgress,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "./components/Banner";
import config from "./configs/config.json";
import axios from "axios";
import priceInRupiah from "./utils/priceInRupiah";
import { useBalance } from "./contexts/BalanceContext";
import ProductCard from "./components/ProductCard";
import { useAuth } from "./contexts/AuthContext";

function Home() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const balance = useBalance();
	const auth = useAuth();

	const getProducts = async (sortBy) => {
		const apiUrl = config.API_URL;
		setLoading(true);
		try {
			const url = `${apiUrl}/products`;
			const response = await axios.get(url, {
				params: {
					sortBy: sortBy[0] || "",
					type: sortBy[1] || "",
					page: 0,
					size: 8,
				},
			});
			const data = await response.data.products;
			setProducts(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	useEffect(() => {
		getProducts(["date", "desc"]);
		balance.getBalance();
	}, [balance]);

	return (
		<Container maxWidth="lg" mb={10}>
			<Banner />
			<Typography variant="h1" component="h1" mt={6}>
				New Products
			</Typography>
			<Grid justifyContent="center" container spacing={2} mt={2}>
				{products.length > 0 ? (
					products.map((product, index) =>
						products.length === index + 1 ? (
							<Grid key={index} item sm={6} md={3}>
								<ProductCard product={product} />
							</Grid>
						) : (
							<Grid key={index} item sm={6} md={3}>
								<ProductCard product={product} />
							</Grid>
						)
					)
				) : (
					<div>There is no Data</div>
				)}
			</Grid>
			<div>{loading && <LinearProgress />}</div>
			<Stack my={4} direction="row" justifyContent="center">
				<Link to="/store">
					<Button
						sx={{
							border: "2px solid #EB1484",
							color: "#EB1484",
							maxWidth: "300px",
							textTransform: "capitalize",
						}}
					>
						Explore More
					</Button>
				</Link>
			</Stack>
			{auth.token && [
				<Typography variant="h1" component="h1" mt={6}>
					Canteen's Box Balance
				</Typography>,
				<Box
					textAlign="center"
					sx={{
						background: "#00B247",
						color: "#fff",
						boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
						borderRadius: "10px",
						padding: "1rem",
						maxWidth: "500px",
						margin: "0 auto",
						marginTop: "3rem",
						fontWeight: 500,
					}}
				>
					Box Balance : <br></br>
					{priceInRupiah(balance.balance)}
				</Box>,
				<Stack my={4} direction="row" justifyContent="center">
					<Link to="/box">
						<Button
							sx={{
								border: "2px solid #EB1484",
								color: "#EB1484",
								maxWidth: "300px",
								textTransform: "capitalize",
							}}
						>
							Create Transaction
						</Button>
					</Link>
				</Stack>,
			]}
		</Container>
	);
}

export default Home;
