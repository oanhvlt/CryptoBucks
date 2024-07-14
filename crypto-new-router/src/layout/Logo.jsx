import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";

const Logo = ({ showNavbar, setShowNavbar }) => {
	return (
		// 		<Link to="/"
		// 			className=" top-[1px] left-[2px] [text-decoration:none]
		// text-[15px] text-cyan flex items-center">
		<Link to="/" className="h-10 flex items-center text-[16px] text-cyan">
			<img src={logoSvg} alt="CryptoBucks" width={30} />
			<span>CryptoBucks</span>
		</Link>
	)
}

export default Logo