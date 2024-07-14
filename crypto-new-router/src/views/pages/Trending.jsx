import React, { useContext } from 'react'
import { TrendingContext } from '../../context/TrendingContext';
import { Outlet } from 'react-router-dom';
import TrendingCoin from '../../components/TrendingCoin';
import { LuRefreshCw } from "react-icons/lu";

const Trending = () => {
	const { trendData, resetTrendingResult } = useContext(TrendingContext);
	console.log("trendData props: ", trendData);
	return (
		<section className="w-[90%] h-full mx-auto flex flex-col mt-5 mb-24 relative">
			<div className="py-7 px-6 grid lg:grid-cols-3 md:grid-cols-2 gap-7
			border border-gray-100 rounded">
				{
					trendData && trendData.coins.map(coin => (
						<TrendingCoin key={coin.item.coin_id} data={coin.item} />
					))
				}

				<button className="w-[32px] hover:scale-110 transition-all transition-ease
        absolute -right-3 -top-8"
					onClick={resetTrendingResult}
				>
					<LuRefreshCw color='cyan' size={18} />
				</button>

			</div>
			<Outlet />
		</section>
	)
}

export default Trending