import { lazy } from "react";
import MainLayout from "../../layout/MainLayout";
const Crypto = lazy(() => import('../../views/pages/Crypto'))
const Trending = lazy(() => import('../../views/pages/Trending'))
const Saved = lazy(() => import('../../views/pages/Saved'))
const CryptoDetails = lazy(() => import('../../components/CryptoDetails'))

export const sellerRoutes = [
	{
		path: "/",
		element: <Crypto />,
		children: [
			{
				path: ":coinId",
				element: <CryptoDetails />
			}
		]
	},
	{
		path: "/trending",
		element: <Trending />
	},
	{
		path: "/saved",
		element: <Saved />
	}
]