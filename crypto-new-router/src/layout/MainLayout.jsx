import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";
import TopBar from "../components/TopBar";

const MainLayout = () => {
	return (
		<>
			<CryptoProvider>
				<main className=" w-full h-full flex flex-col first-letter:content-center 
				items-center relative text-white">
					<div className="w-screen h-screen bg-gray-300 fixed -z-10" />
					<TopBar />
					<Navigation />
					<Outlet />
				</main>
			</CryptoProvider>
		</>
	)
}

export default MainLayout