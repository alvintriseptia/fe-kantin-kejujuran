import { useState, createContext, useContext, useEffect } from "react";

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
	const message = useSnackbarProvider();

	return (
		<SnackbarContext.Provider value={message}>
			{children}
		</SnackbarContext.Provider>
	);
}

export const useSnackbar = () => {
	return useContext(SnackbarContext);
};

function useSnackbarProvider() {
	const [message, setMessage] = useState("");
	const [code, setCode] = useState(0);

	useEffect(() => {
		if (message !== "") {
			setTimeout(() => {
				setMessage("");
			}, 3000);
		}
	}, [message]);

	const setSnackbar = (message, code) => {
		setMessage(message);
		setCode(code);
	};

	return { message, setSnackbar, code };
}
