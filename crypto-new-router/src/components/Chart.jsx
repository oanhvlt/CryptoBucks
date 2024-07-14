//https://recharts.org/en-US/guide/getting-started
import React, { useContext, useLayoutEffect, useState } from 'react'
import { CryptoContext } from '../context/CryptoContext';
import {
	LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
	ResponsiveContainer
} from 'recharts';

function CustomTooltip({ payload, label, active, currency = "usd" }) {
	if (active && payload && payload.length) {
		return (
			<div className="px-2 py-1 bg-gray-200">
				{/* <p className='text-sm text-cyan'>{`${label}: ${new Intl.NumberFormat("en-IN", {
					style: "currency",
					currency: currency,
					minimumFractionDigits: 5,
				}).format(payload[0].value)}`}</p> */}
				<p className='text-sm text-cyan'>
					{new Intl.NumberFormat("en-IN", {
						style: "currency",
						currency: currency,
						minimumFractionDigits: 5,
					}).format(payload[0].value)}
				</p>
				<p className='text-sm text-[#ccc]'>{`${label}`}</p>
			</div>
		);
	}

	return null;
}

const ChartComponent = ({ chartData, currency, type }) => {
	return (
		<ResponsiveContainer height="80%">
			<LineChart width={400} height={400} data={chartData}>
				<Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={"1px"} />
				<CartesianGrid stroke="#323232"
				//strokeDasharray="2 2" 
				/>
				<XAxis dataKey="date" hide />
				<YAxis dataKey={type} hide domain={["auto", "auto"]} />
				<Tooltip content={<CustomTooltip />} currency={currency}
					cursor={false} //remove vertical line from tooltip when hover
					wrapperStyle={{ outline: "none" }}
				/>
				<Legend />
			</LineChart>
		</ResponsiveContainer>
	)
}

const Chart = ({ id }) => {
	const [chartData, setChartData] = useState();
	let { currency } = useContext(CryptoContext);
	const [type, setType] = useState("prices");
	const [days, setDays] = useState(7);

	useLayoutEffect(() => {
		const getChartData = async (id) => {
			try {
				const response = await fetch(
					`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
				)
				const data = await response.json()
				//console.log("chart data", data);
				let convertedData = data[type].map((item) => {
					return {
						date: new Date(item[0]).toLocaleDateString(),
						[type]: item[1] // [type] = prices ||	market_caps || total_volumes
					}
				})
				//console.log("convertedData", convertedData);
				setChartData(convertedData)
			} catch (error) {
				console.log(error);
			}
		}
		getChartData(id);
	}, [id, type, days])

	return (
		<div className='w-full h-[60%] '>
			<ChartComponent chartData={chartData} currency={currency} type={type} />
			<div className="flex justify-between text-sm">
				<div className="flex">
					{/* select type */}
					<button className={`bg-cyan opacity-60 px-1.5 py-0.5 bg-opacity-25 capitalize hover:text-cyan
				 ${type === "prices" ? "bg-cyan opacity-100 text-cyan" : "bg-gray-100 text-gray-50"}`}
						onClick={() => setType("prices")}>
						Price
					</button>
					<button className={`bg-cyan opacity-60 px-1.5 py-0.5 bg-opacity-25 capitalize hover:text-cyan
				 ${type === "market_caps" ? "bg-cyan opacity-100 text-cyan" : "bg-gray-100 text-gray-50"}`}
						onClick={() => setType("market_caps")}>
						Market caps
					</button>
					<button className={`bg-cyan opacity-60 px-1.5 py-0.5 bg-opacity-25 capitalize hover:text-cyan
				 ${type === "total_volumes" ? "bg-cyan opacity-100 text-cyan" : "bg-gray-100 text-gray-50"}`}
						onClick={() => setType("total_volumes")}>
						Total volumes
					</button>
				</div>
				<div className="flex">
					{/* select days */}
					<button className={`bg-cyan opacity-60 px-1.5 py-0.5 bg-opacity-25 capitalize hover:text-cyan
				 ${days === 7 ? "bg-cyan opacity-100 text-cyan" : "bg-gray-100 text-gray-50"}`}
						onClick={() => setDays(7)}>
						7d
					</button>
					<button className={`bg-cyan opacity-60 px-1.5 py-0.5 bg-opacity-25 capitalize hover:text-cyan
				 ${days === 14 ? "bg-cyan opacity-100 text-cyan" : "bg-gray-100 text-gray-50"}`}
						onClick={() => setDays(14)}>
						14d
					</button>
					<button className={`bg-cyan opacity-60 px-1.5 py-0.5 bg-opacity-25 capitalize hover:text-cyan
				 ${days === 30 ? "bg-cyan opacity-100 text-cyan" : "bg-gray-100 text-gray-50"}`}
						onClick={() => setDays(30)}>
						30d
					</button>
				</div>
			</div>
		</div>
	)
}

export default Chart