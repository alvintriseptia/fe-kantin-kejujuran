import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BalanceProvider } from "./contexts/BalanceContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import { customTheme } from "./shared/customTheme";
import { ThemeProvider } from "@mui/system";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<ThemeProvider theme={customTheme}>
				<SnackbarProvider>
					<BalanceProvider>
						<App />
					</BalanceProvider>
				</SnackbarProvider>
			</ThemeProvider>
		</AuthProvider>
	</React.StrictMode>
);
