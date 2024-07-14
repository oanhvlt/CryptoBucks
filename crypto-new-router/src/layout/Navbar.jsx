import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from '../navigation/index'
import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";

const Navbar = ({ showNavbar, setShowNavbar }) => {
	const { pathname } = useLocation()

	const [allNav, setAllNav] = useState([])
	useEffect(() => {
		const navs = getNav('trader')
		setAllNav(navs)
	}, [])
	console.log(allNav)

	return (
		<>
			<div className="w-[100%] px-2 flex align-middle justify-start">
				{
					allNav.map(n =>
						<Link key={n.id} to={n.path} className={`w-fit px-3 py-1 text-[12px] font-bold 
							text-center mt-2 mb-2 border-0 capitalize cursor-pointer 
						${pathname === n.path ?
								'bg-cyan text-gray-300'
								: 'bg-gray-200 text-[#c1c1c1] hover:text-cyan active:bg-cyan active:text-gray-300'} 
											 `}>
							{n.title}
						</Link>
					)
				}
			</div>
		</>
	)
}

export default Navbar