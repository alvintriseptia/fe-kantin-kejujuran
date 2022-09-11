import { Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import { useBalance } from "./contexts/BalanceContext";
import priceInRupiah from "./utils/priceInRupiah";

function CanteenBox() {
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("");
	const balance = useBalance();

	useEffect(() => {
		balance.getBalance();
	}, [balance]);

	const handleClickOpen = (type) => {
		setType(type);
		setOpen(true);
	};

	return (
		<Container maxWidth="lg">
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
			</Box>
			<Stack justifyContent="center" spacing={2} mt={4}>
				<Button
					onClick={() => handleClickOpen("add")}
					sx={{
						border: "2px solid #EB1484",
						color: "#EB1484",
						textTransform: "capitalize",
					}}
				>
					Add
				</Button>
				<Button
					onClick={() => handleClickOpen("withdraw")}
					sx={{
						border: "2px solid #EB1484",
						color: "#EB1484",
						textTransform: "capitalize",
					}}
				>
					Withdraw
				</Button>
			</Stack>
			<TransactionForm open={open} setOpen={setOpen} type={type} />
		</Container>
	);
}

export default CanteenBox;
