import { Circle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function Banner() {
	return (
		<Box
			mt={6}
			sx={{
				height: "300px",
				background:
					"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
				display: "flex",
				paddingX: "1rem",
				"@media screen and (min-width: 769px)": {
					paddingLeft: "4rem",
				},
				alignItems: "center",
				borderRadius: "25px",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<Circle
				sx={{
					color: "rgba(255, 255, 255, 0.2)",
					width: "338px",
					height: "338px",
					position: "absolute",
					top: "-50%",
					left: "-10%",
					"@media screen and (max-width: 768px)": {
						top: "-70%",
						left: "-40%",
					},
				}}
			></Circle>
			<Circle
				sx={{
					color: "rgba(255, 255, 255, 0.2)",
					width: "338px",
					height: "338px",
					position: "absolute",
					right: "-5%",
					bottom: "-40%",
					"@media screen and (max-width: 768px)": {
						right: "-40%",
						bottom: "-60%",
					},
				}}
			></Circle>
			<Typography
				sx={{
					fontSize: "3rem",
					width: "80%",
					fontWeight: "bold",
					"@media (max-width:768px)": {
						width: "100%",
						fontSize: "2.5rem",
					},
				}}
				color="white"
				component="h1"
			>
				Discover, buy, and sell a product you love
			</Typography>
		</Box>
	);
}

export default Banner;
