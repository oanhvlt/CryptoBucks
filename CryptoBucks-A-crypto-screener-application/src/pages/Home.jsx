import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";
import TopBar from "../components/TopBar";

const Home = () => {
	return (
		<>
			<CryptoProvider>
				<main className=" w-full h-full flex flex-col first-letter:
    content-center items-center relative text-white font-Inter">
					<div className="w-screen h-screen bg-gray-300 fixed -z-10" />
					{/* <Logo /> */}
					<TopBar />
					<Navigation />
					<Outlet />
				</main>
			</CryptoProvider>
		</>
	)
}

export default Home