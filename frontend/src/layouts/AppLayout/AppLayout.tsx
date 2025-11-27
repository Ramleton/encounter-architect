import { Outlet } from '@tanstack/react-router'
import Navbar from '../../components/Navbar/Navbar'
import './AppLayout.module.css'

export default function MainLayout() {
	return (
		<div className='app-layout-container'>
			<Navbar />
			<Outlet />
		</div>
	)
}
