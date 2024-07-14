import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
	return (
		<div className="w-[100%] px-2 flex align-middle justify-start">
			<NavLink to="/"
				className={({ isActive }) => {
					return `w-fit px-3 py-1 text-[12px] font-bold text-center mt-2 mb-2 border-0 capitalize cursor-pointer 
					${isActive
							? "bg-cyan text-gray-300"
							: "bg-gray-200 text-[#c1c1c1] hover:text-cyan active:bg-cyan active:text-gray-300"
						}`;
				}}>
				Crypto
			</NavLink>
			<NavLink to="/trending"
				className={({ isActive }) => {
					return `w-fit px-3 py-1 text-[12px] font-bold text-center mt-2 mb-2 border-0 capitalize cursor-pointer 
					${isActive
							? "bg-cyan text-gray-300"
							: "bg-gray-200 text-[#c1c1c1] hover:text-cyan active:bg-cyan active:text-gray-300"
						}`;
				}}>
				Trending
			</NavLink>
			<NavLink to="/saved"
				className={({ isActive }) => {
					return `w-fit px-3 py-1 text-[12px] font-bold text-center mt-2 mb-2 border-0 capitalize cursor-pointer 
					${isActive
							? "bg-cyan text-gray-300"
							: "bg-gray-200 text-[#c1c1c1] hover:text-cyan active:bg-cyan active:text-gray-300"
						}`;
				}}>
				saved
			</NavLink>

		</div>
	)
}

export default Navigation