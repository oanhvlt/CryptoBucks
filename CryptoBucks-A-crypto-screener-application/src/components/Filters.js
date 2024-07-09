import Search from './Search'
import { IoLogOutOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import selectIcon from "../assets/select-icon.svg";
import { useContext, useRef } from 'react';
import { CryptoContext } from '../context/CryptoContext';

const Filters = () => {

	let { setCurrency, setSortBy } = useContext(CryptoContext)
	const currencyRef = useRef(null);

	const handleCurrencySubmit = (e) => {
		e.preventDefault();
		let val = currencyRef.current.value;
		setCurrency(val);
		currencyRef.current.value = "";
	}

	const handleSort = (e) => {
		e.preventDefault();
		let val = e.target.value;
		setSortBy(val);
	}

	return (
		<div className="w-full h-10 border-2 border-gray-100 rounded-lg
    flex items-center justify-between relative text-[13px]">
			<Search />
			<div className="flex mr-7">
				<form onSubmit={handleCurrencySubmit}
					className="relative flex items-center mr-12">
					<label htmlFor="currency"
						className="relative flex justify-center items-center mr-2 font-bold ">
						currency:{" "}
					</label>
					<input type="text" name="currency" placeholder="usd"
						ref={currencyRef}
						className="w-16 pl-2 rounded bg-gray-200 placeholder:text-gray-100 text-[13px] 
						required outline-0 border border-transparent focus:border-cyan"/>
					<button type="submit" className="ml-1 cursor-pointer">
						<IoLogOutOutline size={18} />
					</button>
				</form>

				<label className="relative flex justify-center items-center">
					<span className="font-bold mr-2">sort by: </span>
					<select name="sortby" className="rounded bg-gray-200 pl-2 pr-10 py-0.5 
					capitalize focus:outline-0 text-[13px] "
					// onClick={handleSort}
					>
						<option value="market_cap_desc">market cap desc</option>
						<option value="market_cap_asc">market cap asc</option>
						<option value="volume_desc">volume desc</option>
						<option value="volume_asc">volume asc</option>
						<option value="id_desc">id desc</option>
						<option value="id_asc">id asc</option>
						<option value="gecko_desc">gecko desc</option>
						<option value="gecko_asc">gecko asc</option>
					</select>
					{/* <img
						src={selectIcon}
						alt="submit"
						className="w-[12px] h-auto absolute right-1 top-2 pointer-events-none"
					/> */}
				</label>

				<button
					//onClick={resetFunction}
					className="w-[2rem] ml-4 hover:scale-110 transition-all transition-ease relative">
					<LuRefreshCw />
				</button>
			</div>
		</div>
	)
}

export default Filters