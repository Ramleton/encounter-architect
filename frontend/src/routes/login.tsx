import { createFileRoute, redirect } from '@tanstack/react-router'
import Login from '../pages/Login/Login'

export const Route = createFileRoute('/login')({
	beforeLoad: ({ context }) => {
		const auth = context.auth
		if (auth.user) {
			throw redirect({ to: '/' })
		}
	},
	component: Login
})
