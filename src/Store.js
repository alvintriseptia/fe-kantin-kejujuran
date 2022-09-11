import { Container } from "@mui/material";
import React from "react";
import ListProduct from "./components/ListProduct";

function Store() {
	return (
		<Container maxWidth="lg" mb={10}>
			<ListProduct />
		</Container>
	);
}

export default Store;
