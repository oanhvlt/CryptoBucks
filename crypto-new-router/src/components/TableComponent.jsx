import React, { useContext } from 'react'
import { CryptoContext } from '../context/CryptoContext'
import { CiStar } from "react-icons/ci"
import { BsPinAngleFill } from "react-icons/bs";
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import { StorageContext } from '../context/StorageContext';

const SaveBtn = ({ data }) => {
	const { saveCoin, allCoins, removeCoin } = useContext(StorageContext)
	const handleClick = (e) => {
		e.preventDefault()
		if (allCoins.includes(data.id)) {
			removeCoin(data.id)
		} else {
			saveCoin(data.id)
		}
	}
	return (
		<button className="outline-0 border-0 bg-none cursor-pointer"
			onClick={(e) => handleClick(e)}>
			<CiStar size={18} color='gray' className={` hover:fill-cyan
				${allCoins.includes(data.id) ? "fill-cyan" : "fill-gray"}
				`} />
		</button>
	)
}

const TableComponent = () => {
	let { cryptoData, error, currency } = useContext(CryptoContext)

	return (
		<>
			{cryptoData ? (
				<table className="border border-gray-100  w-full table-auto">
					<thead className="capitalize text-[12px] text-[#aaa] border-b border-gray-100 bg-gray-200">
						<tr>
							<th className="py-1 border-r border-gray-100"></th>
							<th className="py-1 text-left pl-2 border-r border-gray-100">asset</th>
							<th className="py-1 text-left pl-2 border-r border-gray-100">name</th>
							<th className="py-1 text-right pr-2 border-r border-gray-100">price</th>
							<th className="py-1 text-right pr-2 border-r border-gray-100">total volume</th>
							<th className="py-1 text-right pr-2 border-r border-gray-100">market cap change</th>
							<th className="py-1 text-right pr-2 border-r border-gray-100">1H</th>
							<th className="py-1 text-right pr-2 border-r border-gray-100">24H</th>
							<th className="py-1 text-right pr-2">7D</th>
						</tr>
					</thead>
					<tbody>
						{
							cryptoData.map((data) => {
								return (
									<tr className="text-[12px] border-gray-100 border-b last:border-b-0 
										hover:bg-gray-200" key={data.id}>
										<td className="py-1 text-center border-r border-gray-100">
											<SaveBtn data={data} />
										</td>
										<td className="text-left pl-2 uppercase border-r border-gray-100">
											<Link to={`/${data.id}`} className="cursor-pointer">
												{data.symbol}
											</Link>
										</td>
										<td className="text-left pl-2 border-r border-gray-100">
											{data.name}
										</td>
										<td className="text-right pr-2 border-r border-gray-100">
											{/* {Number(data.current_price).toLocaleString()} */}
											{
												// new Intl.NumberFormat("en-US", {
												// 	style: "currency",
												// 	currency: "USD",
												// 	currencyDisplay: "code",
												// 	maximumFractionDigits: 0
												// }).format(data.current_price).replace("USD", "")
												new Intl.NumberFormat("en-IN", {
													style: "currency",
													currency: currency,
												}).format(data.current_price)
											}
										</td>
										<td className="text-right pr-2 border-r border-gray-100">
											{
												new Intl.NumberFormat("en-IN", {
													style: "currency",
													currency: "USD",
													currencyDisplay: "code",
													maximumFractionDigits: 0
												}).format(data.total_volume).replace("USD", "")
											}
										</td>
										<td className="text-right pr-2 border-r border-gray-100">
											{Number(data.market_cap_change_percentage_24h).toFixed(2)} %
										</td>
										<td className={`text-right pr-2 border-r border-gray-100 
											${data.price_change_percentage_1h_in_currency > 0 ? "text-green" : "text-red"}`}
										>
											{Number(data.price_change_percentage_1h_in_currency).toFixed(2)}
										</td>
										<td className={`text-right pr-2 border-r border-gray-100 
											${data.price_change_percentage_24h_in_currency > 0 ? "text-green" : "text-red"}`}
										>
											{Number(data.price_change_percentage_24h_in_currency).toFixed(2)}
										</td>
										<td className={`text-right pr-2 
											${data.price_change_percentage_7d_in_currency > 0 ? "text-green" : "text-red"}`}
										>
											{Number(data.price_change_percentage_7d_in_currency).toFixed(2)}
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			) : (!error.data && !error.search) ? (
				<div className="w-full min-h-[50vh] flex justify-center items-center">
					<div className="w-8 h-8 border-4 border-solid border-cyan rounded-full border-b-gray-200 animate-spin"
						role="status" />
					<span className="text-base ml-2">please wait...</span>
				</div>
			) : error.data || error.search ? (
				<h1 className="min-h-[60vh] text-lg text-red flex items-center justify-center ">
					There is no data to display!
				</h1>
			) : null
			}
			<div className="flex items-center justify-between mt-4 capitalize h-[25px] text-[13px]">
				<span>
					Data provided by{" "}
					<a
						className="text-cyan"
						href="http://www.coingecko.com"
						rel="noreferrer"
						target={"_blank"}
					>
						CoinGecko
					</a>
				</span>
				<Pagination />
			</div>
		</>
	)
}

export default TableComponent