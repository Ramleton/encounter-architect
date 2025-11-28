import { createFileRoute, redirect } from '@tanstack/react-router'
import Signup from '../pages/Signup/Signup'

export const Route = createFileRoute('/signup')({
	beforeLoad: ({ context }) => {
		const auth = context.auth
		if (auth.user) {
			throw redirect({ to: '/' })
		}
	},
	component: Signup
})
