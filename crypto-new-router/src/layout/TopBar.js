import { NavLink, Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";

const TopBar = () => {
	return (
		<div className="w-[100%] px-2 flex align-middle justify-start border-b border-gray-100">
			<Link to="/"
				className=" top-[1px] left-[2px] [text-decoration:none]
text-[15px] text-cyan flex items-center">
				<img src={logoSvg} alt="CryptoBucks" width={30} />
				<span>CryptoBucks</span>
			</Link>
		</div>
	)
}

export default TopBar