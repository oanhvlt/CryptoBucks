import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useContext } from 'react'
import { CryptoContext } from '../../context/CryptoContext'
import { StorageContext } from '../../context/StorageContext'
import { CiStar } from "react-icons/ci"
import { BsPinAngleFill } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";

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

const Saved = () => {
	let navigate = useNavigate();
	let { cryptoData, error, currency } = useContext(CryptoContext)
	const { savedData, resetSavedResult } = useContext(StorageContext)

	const getCoinDetails = (id) => {
		navigate(`${id}`);
	};

	return (
		<section className="w-[100%] h-full flex flex-col mt-5 mb-24 px-1 relative">
			{savedData ? (
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
							savedData.map((data) => {
								return (
									<tr className="text-[12px] border-gray-100 border-b last:border-b-0 
										hover:bg-gray-200" key={data.id}>
										<td className="py-1 text-center border-r border-gray-100">
											<SaveBtn data={data} />
										</td>
										<td className="text-left pl-2 uppercase border-r border-gray-100">
											<span onClick={() => getCoinDetails(data.id)} className="cursor-pointer">
												{data.symbol}
											</span>
										</td>
										<td className="text-left pl-2 border-r border-gray-100">
											{data.name}
										</td>
										<td className="text-right pr-2 border-r border-gray-100">
											{
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
			) : (
				<h1 className="min-h-[60vh] text-lg text-cyan flex items-center justify-center ">
					There is no data to display!
				</h1>
			)}
			{/* <button className="w-[2rem] mr-4 hover:scale-110 transition-all transition-ease
        absolute right-0 -top-8"
			//onClick={resetTrendingResult}
			>
				<LuRefreshCw color='cyan' size={18} />
			</button> */}
			<Outlet />
		</section>
	)
}

export default Saved