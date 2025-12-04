import { Outlet, useLocation } from '@tanstack/react-router'
import Navbar from '../../components/Navbar/Navbar'
import classes from './AppLayout.module.css'

export default function AppLayout() {
	const location = useLocation()
	const noLayoutRoutes = [
		'/login',
		'/signup',
		'/forgotPassword'
	]

	if (noLayoutRoutes.includes(location.pathname)) {
		return (
			<div className={classes.appLayoutContent}>
				<Outlet />
			</div>
		)
	}

	return (
		<div className={classes.appLayoutContainer}>
			<Navbar />
			<div className={classes.appLayoutContent}>
				<Outlet />
			</div>
		</div>
	)
}
