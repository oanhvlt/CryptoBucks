import { Outlet } from "react-router-dom";
import { useState } from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import { CryptoProvider } from "../context/CryptoContext";
import { TrendingProvider } from "../context/TrendingContext";
import { StorageProvider } from "../context/StorageContext";

const MainLayout = () => {
	const [showNavbar, setShowNavbar] = useState(false)

	return (
		<CryptoProvider>
			<TrendingProvider>
				<StorageProvider>
					<main className="h-screen bg-gray-300 flex flex-col relative text-white">
						{/* <div className="w-screen h-screen bg-gray-300 fixed -z-10" /> */}
						<div className="">
							<TopBar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
							<Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
						</div>
						<Outlet />
					</main>
				</StorageProvider>
			</TrendingProvider>
		</CryptoProvider>
	)
}

export default MainLayout