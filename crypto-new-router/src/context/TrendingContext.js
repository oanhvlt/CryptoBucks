import { createContext, useLayoutEffect, useState } from "react";

// create context object
export const TrendingContext = createContext({})
// create provider component
export const TrendingProvider = ({ children }) => {
	const [trendData, setTrendData] = useState()

	const getTrendData = async () => {
		try {
			const response = await fetch(
				`https://api.coingecko.com/api/v3/search/trending`
			)
			const data = await response.json()
			console.log("Trending Data: ", data);
			setTrendData(data)
		} catch (error) {
			console.log(error)
		}
	}

	const resetTrendingResult = () => {
		setTrendData()
	}

	useLayoutEffect(() => {
		getTrendData()
	}, [])

	return (
		<TrendingContext.Provider
			value={{
				trendData,
				resetTrendingResult,
			}}
		>
			{children}
		</TrendingContext.Provider>
	);

}