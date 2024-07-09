import { lazy } from "react";
const Home = lazy(() => import('../../pages/Home'))
const Crypto = lazy(() => import('../../pages/Crypto'))
const Trending = lazy(() => import('../../pages/Trending'))
const Saved = lazy(() => import('../../pages/Saved'))
const CryptoDetails = lazy(() => import('../../components/CryptoDetails'))

export const adminRoutes = [
	{
		path: '/',
		element: <Home />,
		ability: ['trader', 'admin'],
		children: [
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
				element: <Trending />,
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
				children: [
					{
						path: ":coinId",
						element: <CryptoDetails />
					}
				]
			},
		]

	},


]