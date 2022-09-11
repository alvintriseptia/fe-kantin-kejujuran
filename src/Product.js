import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import priceInRupiah from "./utils/priceInRupiah";
import config from "./configs/config.json";
import {
	Alert,
	LinearProgress,
	Box,
	CardMedia,
	Container,
	Typography,
	Grid,
	Button,
} from "@mui/material";
import convertTimestamp from "./utils/convertTimestamp";
import Checkout from "./components/Checkout";

function Product() {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [open, setOpen] = useState(false);
	const { id } = useParams();

	const getProductById = async () => {
		const apiUrl = config.API_URL;
		setLoading(true);
		try {
			const url = `${apiUrl}/products/${id}`;
			const response = await axios.get(url);
			const data = await response.data.product;
			setProduct(data);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
			throw error;
		}
	};

	useEffect(() => {
		getProductById();
	}, []);

	let image;
	if (product) {
		if (product.productImage.slice(0, 4) === "http") {
			image = product.productImage;
		} else {
			image = `${config.IMAGE_URL}/${product.productImage}`;
		}
	}

	console.log(image);

	return (
		<Container maxWidth="lg">
			{error && <Alert severity="error">{error.message}</Alert>}
			{product && [
				<Grid
					justifyContent="center"
					container
					direction="row"
					spacing={6}
					marginY={{ xs: 4, md: 8 }}
				>
					<Grid item md={6}>
						<Box
							sx={{
								width: { xs: "300px", md: "400px", lg: "542px" },
								height: { xs: "300px", md: "400px", lg: "542px" },
								boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
							}}
						>
							<CardMedia
								image={image}
								alt={product.productName}
								component="img"
								sx={{
									width: "100%",
									height: "100%",
									borderRadius: "20px",
									objectFit: "contain",
								}}
							/>
						</Box>
					</Grid>
					<Grid item md={6}>
						<Box paddingY={{ lg: 4 }}>
							<Box>
								<Typography component="h1" variant="h1">
									{product.productName}
								</Typography>
								<Typography component="div" variant="body2Regular">
									{convertTimestamp(product.createdAt)}
								</Typography>
							</Box>
							<Box mt={3}>
								<Typography component="h3" variant="h3">
									Product Description
								</Typography>
								<Typography component="p" variant="body1Regular" mt={1}>
									{product.description}
								</Typography>
							</Box>
							<Box mt={2}>
								<Typography component="h3" variant="h3">
									Price
								</Typography>
								<Typography component="div" variant="body1Regular" mt={1}>
									{priceInRupiah(product.price)}
								</Typography>
							</Box>
							<Box mt={3}>
								<Button
									onClick={() => setOpen(!open)}
									sx={{
										background:
											"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
										color: "#fff",
										paddingX: "1.5rem",
										maxWidth: "300px",
										textTransform: "capitalize",
									}}
								>
									Buy
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>,
				<Checkout
					key="confirm"
					productId={product.id}
					image={image}
					productName={product.productName}
					price={product.price}
					open={open}
					setOpen={setOpen}
				/>,
			]}
			<div>{loading && <LinearProgress />}</div>
		</Container>
	);
}

export default Product;
