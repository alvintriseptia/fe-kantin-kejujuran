import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar({ message, code }) {
	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar
				open={true}
				autoHideDuration={6000}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					severity={`${code === 0 ? "error" : "success"}`}
					sx={{ width: "100%" }}
				>
					{message}
				</Alert>
			</Snackbar>
		</Stack>
	);
}
