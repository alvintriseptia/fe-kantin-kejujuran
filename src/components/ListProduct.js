import { useCallback, useEffect, useRef, useState } from "react";
import config from "../configs/config.json";
import axios from "axios";

import ProductCard from "./ProductCard";
import SalesForm from "./SalesForm";
import SortSelect from "./SortSelect";
import {
	Alert,
	Box,
	Grid,
	Stack,
	Typography,
	LinearProgress,
} from "@mui/material";

import { useAuth } from "../contexts/AuthContext";

function ListProduct() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [sortBy, setSortBy] = useState(["date", "desc"]);
	const [pageNumber, setPageNumber] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const [isRefreshed, setIsRefreshed] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const isFirstRender = useRef(0);

	const auth = useAuth();

	const observer = useRef();
	const lastProductElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					console.log("isIntersecting");
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	const getProducts = async (sortBy) => {
		const apiUrl = config.API_URL;
		setLoading(true);
		try {
			const url = `${apiUrl}/products`;
			const response = await axios.get(url, {
				params: {
					sortBy: sortBy[0] || "",
					type: sortBy[1] || "",
					page: pageNumber - 1,
					size: 8,
				},
			});
			const data = await response.data.products;

			if (products.length < 8) {
				setProducts(data);
				setHasMore(response.data.total > 8);
			} else {
				setProducts([...products, ...data]);
				setHasMore(response.data.total > 8);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
			throw error;
		}
	};

	useEffect(() => {
		if (isFirstRender.current < 2) {
			isFirstRender.current++;
			return;
		} else {
			setProducts([]);
			if (sortBy) setPageNumber(1);
			setIsRefreshed(!isRefreshed);
			console.log("refreshed");
		}
	}, [sortBy, isSubmitted]);

	useEffect(() => {
		getProducts(sortBy);
		setIsSubmitted(false);
		console.log("addLoad");
	}, [pageNumber, isRefreshed]);

	return (
		<Box mt={6}>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				justifyContent="space-between"
			>
				<Box>
					<Typography variant="h1" component="h1" mb={{ xs: 3, sm: 0 }}>
						Discover Products
					</Typography>
					<Box mt={1}>
						{auth.token && <SalesForm setIsSubmitted={setIsSubmitted} />}
					</Box>
				</Box>
				<SortSelect sortBy={sortBy} setSortBy={setSortBy} />
			</Stack>
			{error && <Alert severity="error">{error.message}</Alert>}
			<Grid justifyContent="center" container spacing={2} mt={2}>
				{products.length > 0 ? (
					products.map((product, index) =>
						products.length === index + 1 ? (
							<Grid ref={lastProductElementRef} key={index} item sm={6} md={3}>
								<ProductCard
									setIsSubmitted={setIsSubmitted}
									product={product}
								/>
							</Grid>
						) : (
							<Grid key={index} item sm={6} md={3}>
								<ProductCard
									setIsSubmitted={setIsSubmitted}
									product={product}
								/>
							</Grid>
						)
					)
				) : (
					<div>There is no Data</div>
				)}
			</Grid>
			<div>{loading && <LinearProgress />}</div>
		</Box>
	);
}

export default ListProduct;
