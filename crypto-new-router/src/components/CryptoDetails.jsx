import ReactDOM from 'react-dom';
import { CryptoContext } from '../context/CryptoContext';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Chart from './Chart';

const HighLowIndicator = ({ currentPrice, high, low }) => {
	const [green, setGreen] = useState();

	useEffect(() => {
		let total = high - low;
		let greenZone = ((high - currentPrice) * 100) / total;
		setGreen(Math.ceil(greenZone));
	}, [currentPrice, high, low]);

	return (
		<>
			<span className="bg-red h-1.5 rounded-l-lg w-[50%]"
				style={{ width: `${100 - green}%` }}>
				&nbsp;
			</span>
			<span className="bg-green h-1.5 rounded-r-lg w-[50%]"
				style={{ width: `${green}%` }}>
				&nbsp;
			</span>
		</>
	);
};

const CryptoDetails = () => {
	let { coinId } = useParams(); //use params in route traderRoutes.js : element: <CryptoDetails />
	let navigate = useNavigate();
	let { getCoinData, coinData: data, currency } = useContext(CryptoContext);

	console.log("coinData: ", data);

	const close = () => {
		navigate("..")
	}

	useLayoutEffect(() => {
		getCoinData(coinId)
	}, [coinId])

	return ReactDOM.createPortal(
		<div className='fixed top-0 w-full h-full bg-gray-200 bg-opacity-80 
		 flex items-center justify-center '
			onClick={close}
		>
			<div className="w-[75%] h-[75%] bg-gray-300 rounded-lg text-white relative"
				onClick={(e) => e.stopPropagation()}
			>
				{data ? (
					<div className="flex items-center justify-between h-full w-full p-4">
						{/* Left */}
						<div className="flex flex-col w-[45%] h-full pl-2 pr-2 pt-2 bg-gray-200">
							<div className="flex w-full items-center">
								<img className="w-[32px] h-[32px] mr-2" src={data.image.large} alt={data.id} />
								<span className="text-[22px] capitalize font-medium">
									{data.name}
								</span>
								<span className="text-sm py-0.5 px-2.5 ml-2 bg-cyan text-cyan bg-opacity-25 rounded uppercase">
									{data.symbol}
								</span>
							</div>
							<div className="flex w-full mt-6">
								<div className="flex flex-col w-full">
									<div className="flex justify-between">
										<span className="text-sm text-gray-100">
											Price change % (24h)
										</span>
										<div className={`text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25
												${data.market_data.price_change_percentage_24h > 0
												? "bg-green text-green"
												: "bg-red text-red"
											}
											`}>
											<span>
												{Number(
													data.market_data.price_change_percentage_24h
												).toFixed(2)}%
											</span>
											<svg
												width="14"
												height="14"
												viewBox="0 0 14 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className={`
                        w-[1rem] ml-0.5
                        ${data.market_data.price_change_percentage_24h > 0
														? "fill-green rotate-180"
														: "fill-red"
													}
                        `}
											>
												<path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
											</svg>
										</div>
									</div>
									<h2 className="text-[22px] font-bold">
										{
											new Intl.NumberFormat("en-IN", {
												style: "currency",
												currency: currency,
												maximumSignificantDigits: 5,
											}).format(data.market_data.current_price[currency])
										}
									</h2>
								</div>
							</div>
							<div className="flex w-full mt-4 justify-between">
								<div className="flex flex-col">
									<span className="text-sm capitalize text-gray-100">
										Market Cap
									</span>
									<h2 className="text-base font-bold">
										{new Intl.NumberFormat("en-IN", {
											style: "currency",
											currency: currency,
											minimumFractionDigits: 0,
										}).format(data.market_data.market_cap[currency])}
									</h2>
								</div>
								<div className="flex flex-col">
									<span className="text-sm capitalize text-gray-100">
										fully diluted valuation
									</span>
									<h2 className="text-base font-bold">
										{new Intl.NumberFormat("en-IN", {
											style: "currency",
											currency: currency,
											notation: "compact",
										}).format(
											data.market_data.fully_diluted_valuation[currency]
										)}
									</h2>
								</div>
							</div>
							<div className="flex flex-col w-full mt-4 justify-between">
								<span className="text-sm capitalize text-gray-100">
									total volume
								</span>
								<h2 className="text-base font-bold">
									{new Intl.NumberFormat("en-IN", {
										style: "currency",
										currency: currency,
										minimumFractionDigits: 0,
									}).format(data.market_data.total_volume[currency])}
								</h2>
							</div>
							<div className="flex w-full mt-4 justify-between">
								<HighLowIndicator
									currentPrice={data.market_data.current_price[currency]}
									high={data.market_data.high_24h[currency]}
									low={data.market_data.low_24h[currency]}
								/>
							</div>
							<div className="flex w-full mt-4 justify-between">
								<div className="flex flex-col">
									<span className="text-sm capitalize text-gray-100">
										Low 24H
									</span>
									<h2 className="text-base font-bold">
										{new Intl.NumberFormat("en-IN", {
											style: "currency",
											currency: currency,
											minimumFractionDigits: 5,
										}).format(data.market_data.low_24h[currency])}
									</h2>
								</div>
								<div className="flex flex-col">
									<span className="text-sm capitalize text-gray-100">
										high 24H
									</span>
									<h2 className="text-base font-bold">
										{new Intl.NumberFormat("en-IN", {
											style: "currency",
											currency: currency,
											minimumFractionDigits: 5,
										}).format(data.market_data.high_24h[currency])}
									</h2>
								</div>
							</div>
							<div className="flex w-full mt-4 justify-between">
								<div className="flex flex-col">
									<span className="text-sm capitalize text-gray-100">
										max supply
									</span>
									<h2 className="text-base font-bold">
										{new Intl.NumberFormat("en-IN", {
											style: "currency",
											currency: currency,
											minimumFractionDigits: 0,
										}).format(data.market_data.max_supply)}
									</h2>
								</div>
								<div className="flex flex-col">
									<span className="text-sm capitalize text-gray-100">
										circulating supply
									</span>
									<h2 className="text-base font-bold">
										{new Intl.NumberFormat("en-IN", {
											style: "currency",
											currency: currency,
											minimumFractionDigits: 0,
										}).format(data.market_data.circulating_supply)}
									</h2>
								</div>
							</div>
							<div className="flex w-full mt-4 justify-between">
								<div className="flex flex-col">
									<a target={"_blank"} rel="noreferrer"
										className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
										href={data?.links?.homepage[0]}
									>
										{data?.links?.homepage[0].substring(0, 30)}
										{/* {data?.links?.homepage[0]} */}
									</a>
									<a target={"_blank"} rel="noreferrer"
										className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
										href={data?.links?.blockchain_site[0]}
									>
										{data?.links?.blockchain_site[0].substring(0, 30)}
										{/* {data?.links?.blockchain_site[0]} */}
									</a>
									{data?.links?.official_forum_url[0] && (
										<a
											target={"_blank"} rel="noreferrer"
											className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
											href={data?.links?.official_forum_url[0]}
										>
											{data?.links?.official_forum_url[0].substring(0, 30)}
											{/* {data?.links?.official_forum_url[0]} */}
										</a>
									)}
								</div>
								<div className="flex flex-col content-start">
									<span className="text-sm capitalize text-gray-100">
										sentiment
									</span>
									<div className="flex justify-between">
										<div className={`text-sm px-1 my-1 font-medium flex items-center
          						rounded uppercase bg-opacity-25 bg-green text-green`}>
											<span>
												{Number(data.sentiment_votes_up_percentage).toFixed(2)}%
											</span>
											<svg
												width="14"
												height="14"
												viewBox="0 0 14 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className={`
                        w-[1rem] ml-0.5
                        fill-green rotate-180
                        `}
											>
												<path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
											</svg>
										</div>
									</div>
									<div className="flex justify-between">
										<div className={`text-sm px-1 my-1 font-medium flex items-center
          							rounded uppercase bg-opacity-25 bg-red text-red`}>
											<span>
												{Number(data.sentiment_votes_down_percentage).toFixed(2)}%
											</span>
											<svg
												width="14"
												height="14"
												viewBox="0 0 14 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className={`
                        w-[1rem] ml-0.5
                        fill-red
                        `}
											>
												<path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Right */}
						<div className="flex flex-col w-[55%] h-full pl-3 bg-gray-300">
							<Chart id={data.id} />

							<div className="flex flex-col mt-4">
								<h3 className="text-white py-1">
									<span className="text-gray-100 capitalize mr-1">
										market cap rank:{" "}
									</span>{" "}
									{data.market_cap_rank}{" "}
								</h3>
								<h3 className="text-white py-1">
									<span className="text-gray-100 capitalize mr-1">
										coinGecko rank:{" "}
									</span>{" "}
									{data.coingecko_rank}{" "}
								</h3>
								<h3 className="text-white py-1">
									<span className="text-gray-100 capitalize mr-1">
										coinGecko score:{" "}
									</span>{" "}
									{data.coingecko_score}{" "}
								</h3>
							</div>
						</div>
						{/*  */}
						<div className="absolute bottom-8 right-8 flex items-center">
							{data.links.repos_url.github[0] && (
								<a className="text-lg px-1" target={"_blank"} rel="noreferrer"
									href={data.links.repos_url.github[0]}
								>
									<svg width={25} height={25}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 496 512">
										<path className="fill-cyan"
											d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
									</svg>
								</a>
							)}
							{data.links.twitter_screen_name && (
								<a
									className="text-lg px-1"
									target={"_blank"}
									rel="noreferrer"
									href={`https://twitter.com/${data.links.twitter_screen_name}`}
								>
									<svg width={25} height={25}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 1024 1024"
									>
										<path className="fill-cyan"
											d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z"
										/>
									</svg>
								</a>
							)}
							{data.links.facebook_username && (
								<a
									className="text-lg px-1"
									target={"_blank"}
									rel="noreferrer"
									href={`https://facebook.com/${data.links.facebook_username}`}
								>
									<svg width={25} height={25}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
									>
										<path className="fill-cyan"
											d="M0 12.067C0 18.033 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067Z"
										/>
									</svg>
								</a>
							)}
						</div>
					</div>
				) : (
					<div className="w-full min-h-[60vh] h-full flex justify-center items-center ">
						<div className="w-8 h-8 border-4 border-cyan rounded-full"
							role="status" />
						<span className="ml-2">please wait...</span>
					</div>
				)}
			</div>
		</div>,
		document.getElementById('model')
	)
}

export default CryptoDetails