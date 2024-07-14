import { NavLink, Link } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import Logo from "./Logo";
import { useState } from "react";

const activeStyle = ({ isActive }) => {
	return `${isActive ? "text-cyan" : ""}`
}

const NavLinks = () => {
	return (
		<>
			<NavLink to="/" className={activeStyle}>Home</NavLink>
			<NavLink to="/About" className={activeStyle}>About</NavLink>
			<NavLink to="/Services" className={activeStyle}>Services</NavLink>
			<NavLink to="/Contact" className={activeStyle}>Contact</NavLink>
			<NavLink to="/Account" className={activeStyle}>Account</NavLink>
		</>
	)
}

const TopBar = ({ showNavbar, setShowNavbar }) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = () => setIsOpen(!isOpen)

	return (
		// <div className="w-[100%] px-2 flex align-middle justify-start border-b border-gray-100">
		<div className="bg-gray-200 sticky top-0 z-[20] mx-auto flex flex-wrap w-full 
		items-center justify-between pr-2">
			<Logo />
			<nav className="flex justify-end">
				<div className="hidden md:flex justify-between gap-7">
					<NavLinks />
				</div>
				<div className="md:hidden">
					<button onClick={toggleMenu}>
						{isOpen ? <IoCloseOutline size={25} /> : <LuMenu size={25} />}
					</button>
				</div>
			</nav>
			{isOpen && (
				<div className="flex basis-full flex-col items-center">
					<NavLinks />
				</div>
			)}
		</div>
	)
}

export default TopBar