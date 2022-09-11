import axios from "axios";
import { useState, createContext, useContext } from "react";

const BalanceContext = createContext();

export function BalanceProvider({ children }) {
	const balance = useBalanceProvider();

	return (
		<BalanceContext.Provider value={balance}>
			{children}
		</BalanceContext.Provider>
	);
}

export const useBalance = () => {
	return useContext(BalanceContext);
};

function useBalanceProvider() {
	const [balance, setBalance] = useState(0);

	const getBalance = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/box/balance",
					{
						headers: {
							"x-access-token": localStorage.getItem("token"),
						},
					}
				);
				setBalance(response.data.balance);
			} catch (error) {
				throw error;
			}
		}
	};

	return { balance, getBalance, setBalance };
}
