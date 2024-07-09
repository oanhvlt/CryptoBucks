import { adminRoutes } from "./adminRoutes";
import { traderRoutes } from './traderRoutes';

export const privateRoutes = [
	...adminRoutes,
	...traderRoutes
]
