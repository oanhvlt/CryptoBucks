import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { CryptoProvider } from "../context/CryptoContext";
import TopBar from "./TopBar";
import Navbar from "./Navbar";

const MainLayout = () => {
	return (
		<>
			<CryptoProvider>
				<main className=" w-full h-full flex flex-col relative text-white">
					<div className="w-screen h-screen bg-gray-300 fixed -z-10" />
					<TopBar />
					{/* <Navigation /> */}
					<Navbar />
					<Outlet />
				</main>
			</CryptoProvider>
		</>
	)
}

export default MainLayout