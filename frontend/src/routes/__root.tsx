import { createRootRouteWithContext } from '@tanstack/react-router'
import MainLayout from '../layouts/AppLayout/AppLayout'

export const Route = createRootRouteWithContext()({
	component: () => (
		<MainLayout />
	)
})
