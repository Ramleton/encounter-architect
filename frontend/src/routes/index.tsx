import { createFileRoute, redirect } from '@tanstack/react-router'
import Home from '../pages/Home/Home'

export const Route = createFileRoute('/')({
	beforeLoad: ({ context }) => {
		if (!context.auth.user) {
			throw redirect({ to: '/login' })
		}
	},
	component: Home
})
