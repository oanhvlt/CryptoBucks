//import { lazy } from "react";
// const Crypto = lazy(() => import('../../views/pages/Crypto'))
// const Trending = lazy(() => import('../../views/pages/Trending'))
// const Saved = lazy(() => import('../../views/pages/Saved'))
// const CryptoDetails = lazy(() => import('../../components/CryptoDetails'))
import Crypto from "../../views/pages/Crypto";
import Trending from "../../views/pages/Trending";
import Saved from "../../views/pages/Saved";
import CryptoDetails from "../../components/CryptoDetails";


export const traderRoutes = [
	{
		path: "/",
		element: <Crypto />,
		ability: ['admin', 'trader'],
		children: [
			{
				path: ":coinId",
				element: <CryptoDetails />
			}
		]
	},
	{
		path: "/trending",
		element: <Trending />,
		ability: ['admin', 'trader'],
		children: [
			{
				path: ":coinId",
				element: <CryptoDetails />
			}
		]
	},
	{
		path: "/saved",
		element: <Saved />,
		ability: ['admin', 'trader'],
		children: [
			{
				path: ":coinId",
				element: <CryptoDetails />
			}
		]
	}
]