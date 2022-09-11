import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";

import { Link } from "react-router-dom";
import config from "../configs/config.json";

import priceInRupiah from "../utils/priceInRupiah";
import convertTimestamp from "../utils/convertTimestamp";

export default function ProductCard({ product }) {
	let image;
	if (product.productImage.slice(0, 4) === "http") {
		image = product.productImage;
	} else {
		image = `${config.IMAGE_URL}/${product.productImage}`;
	}

	return (
		<Card
			sx={{
				width: "235px",
				height: "320px",
				borderRadius: "20px",
				boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Link to={`/store/${product.id}`}>
				<CardActionArea sx={{ padding: "12px" }}>
					<CardMedia
						sx={{ borderRadius: "20px" }}
						component="img"
						alt={product.productName}
						height="230"
						image={image}
					/>
					<CardContent
						sx={{ padding: "0", marginTop: "16px", marginBottom: "5px" }}
					>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							mb={1}
						>
							<Typography
								variant="body2Semibold"
								component="div"
								sx={{
									paddingRight: "0.2rem",
									maxHeight: "35px",
									overflowY: "hidden",
								}}
							>
								{product.productName}
							</Typography>
							<Typography variant="captionRegular" component="div">
								{priceInRupiah(product.price)}
							</Typography>
						</Stack>
						<Typography variant="captionRegular" color="grey2">
							{convertTimestamp(product.createdAt)}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	);
}
