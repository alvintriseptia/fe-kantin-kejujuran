import { createTheme } from "@mui/material";

export const customTheme = createTheme({
	palette: {
		redViolet: "#DA18A3",
		redLinearLeft: "#EB1484",
		redLinearRight: "#C81CC5",
		dark: "#24252D",
		white: "#FFFFFF",
		grey1: "#E3E1E3",
		grey2: "#888888",
		grey3: "#4F4F4F",
		black1: "#2D2E36",
		black2: "#1B1A21",
		black3: "#E3E1E3",
		black4: "#24252D",
	},
	typography: {
		fontSize: 16,
		fontWeight: 400,
		h1: {
			fontSize: "1.75rem",
			fontWeight: 600,
		},
		h2: {
			fontSize: "1.5rem",
			fontWeight: 600,
		},
		h3: {
			fontSize: "1.25rem",
			fontWeight: 600,
		},
		body1Regular: {
			fontSize: "1rem",
			fontWeight: 400,
		},
		body1Semibold: {
			fontSize: "1rem",
			fontWeight: 600,
		},
		body2Regular: {
			fontSize: "0.875rem",
			fontWeight: 400,
		},
		body2Semibold: {
			fontSize: "0.875rem",
			fontWeight: 600,
		},
		captionRegular: {
			fontSize: "0.75rem",
			fontWeight: 400,
		},
		captionSemibold: {
			fontSize: "0.75rem",
			fontWeight: 600,
		},
		smallRegular: {
			fontSize: "0.625rem",
			fontWeight: 400,
		},
		smallSemibold: {
			fontSize: "0.625rem",
			fontWeight: 600,
		},
		button: {
			fontSize: "0.875rem",
			fontWeight: 600,
		},
	},
});
