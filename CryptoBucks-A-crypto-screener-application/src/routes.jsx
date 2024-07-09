import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Trending from './pages/Trending';
import Saved from './pages/Saved';
import CryptoDetails from './components/CryptoDetails';

const routes = [
	{
		path: "/",
		element: <Home />,
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
];


export default routes;
