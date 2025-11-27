import { Outlet } from '@tanstack/react-router'
import Navbar from '../../components/Navbar/Navbar'
import classes from './AppLayout.module.css'

export default function MainLayout() {
	return (
		<div className={classes.appLayoutContainer}>
			<Navbar />
			<div className={classes.appLayoutContent}>
				<Outlet />
			</div>
		</div>
	)
}
