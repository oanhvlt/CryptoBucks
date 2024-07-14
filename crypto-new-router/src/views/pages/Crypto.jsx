import { Outlet } from "react-router-dom";
import Filters from "../../components/Filters";
import TableComponent from "../../components/TableComponent";

const Crypto = () => {
	return (
		<section className="w-[100%] h-full flex flex-col mt-5 mb-24 px-1 relative">
			<Filters />
			<TableComponent />
			<Outlet />
		</section>
	)
}

export default Crypto