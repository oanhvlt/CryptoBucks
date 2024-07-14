import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { CryptoContext } from "./CryptoContext";

// create context object
export const StorageContext = createContext({})
// create provider component
export const StorageProvider = ({ children }) => {
	const [allCoins, setAllCoins] = useState([]);
	const [savedData, setSavedData] = useState();
	let { currency, sortBy } = useContext(CryptoContext);

	const saveCoin = (coinId) => {
		let oldCoins = JSON.parse(localStorage.getItem("coins"));
		if (oldCoins.includes(coinId)) {
			return null;
		} else {
			let newCoins = [...oldCoins, coinId];
			localStorage.setItem("coins", JSON.stringify(newCoins));
			setAllCoins(newCoins);
		}
	}
	const removeCoin = (coinId) => {
		let oldCoins = JSON.parse(localStorage.getItem("coins"));
		let newCoins = oldCoins.filter((coin) => coin !== coinId);
		localStorage.setItem("coins", JSON.stringify(newCoins));
		setAllCoins(newCoins);
	}

	const getSavedData = async (totalCoins = allCoins) => {
		try {
			const response = await fetch(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
					","
				)}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
			)
			const data = await response.json();
			console.log("getSavedData", data);
			setSavedData(data);
		} catch (error) {
			console.log(error);
		}
	};

	const resetSavedResult = () => {
		getSavedData();
	}

	useEffect(() => {
		if (allCoins.length > 0) {
			getSavedData(allCoins);
		} else {
			setSavedData();
		}
	}, [allCoins])

	useLayoutEffect(() => {
		let isThere = JSON.parse(localStorage.getItem("coins")) || false;
		if (!isThere) {
			//set the local storage with empty array
			localStorage.setItem("coins", JSON.stringify([]));
		} else {
			//set the state with the current value from the local storage
			let totalCoins = JSON.parse(localStorage.getItem("coins"));
			setAllCoins(totalCoins);

			if (totalCoins.length > 0) {
				getSavedData(totalCoins);
			}
		}

	}, [])

	return (
		<StorageContext.Provider
			value={{
				allCoins,
				savedData,
				saveCoin,
				removeCoin,
				resetSavedResult
			}}
		>
			{children}
		</StorageContext.Provider>
	);

}