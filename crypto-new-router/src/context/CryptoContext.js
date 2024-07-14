import { createContext, useState, useLayoutEffect } from "react"

//create context object
export const CryptoContext = createContext({})
//create provider component
export const CryptoProvider = ({ children }) => {
	const [cryptoData, setCryptoData] = useState()
	const [searchData, setSearchData] = useState();
	const [coinSearch, setCoinSearch] = useState("");

	const [currency, setCurrency] = useState("usd");
	const [sortBy, setSortBy] = useState("market_cap_desc");
	const [page, setPage] = useState(1);
	const [totalItems, setTotalItems] = useState(250);
	const [perPage, setPerPage] = useState(10);
	const [coinData, setCoinData] = useState();
	const [error, setError] = useState({ data: "", coinData: "", search: "" });

	const getCoinData = async (coinid) => {
		//setCoinData();
		try {
			const response = await fetch(
				`https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
			)
			// .then((res) => res.json())
			// .then((json) => json);
			const data = await response.json()
			//console.log("CoinData", data);
			setCoinData(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getCryptoData = async () => {
		//setCryptoData();
		setTotalItems(250)
		try {
			const response = await fetch(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
			)
			const data = await response.json()
			//console.log("getCryptoData: ", data);
			setCryptoData(data)

		} catch (error) {
			console.log(error)
		}
	}

	const getSearchResult = async (query) => {
		try {
			const response = await fetch(
				`https://api.coingecko.com/api/v3/search?query=${query}`
			)
			const data = await response.json()
			//console.log("search: ", data);
			setSearchData(data.coins);
		} catch (error) {
			console.log(error)
		}
	}

	const resetFunction = () => {
		setPage(1);
		setCoinSearch("");
	};

	useLayoutEffect(() => {
		getCryptoData();
	}, [coinSearch, sortBy, currency, page, perPage, sortBy]);

	return (
		<CryptoContext.Provider
			value={{
				cryptoData, error, searchData, setSearchData, getSearchResult, setCoinSearch,
				currency, setCurrency, setSortBy, page, setPage, totalItems, setTotalItems,
				resetFunction,
				perPage, setPerPage,
				coinData, getCoinData
			}}
		>
			{children}
		</CryptoContext.Provider>
	)
}