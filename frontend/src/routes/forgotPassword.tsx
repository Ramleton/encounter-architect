import { createFileRoute, redirect } from '@tanstack/react-router'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'

export const Route = createFileRoute('/forgotPassword')({
	beforeLoad: ({ context }) => {
		const auth = context.auth
		if (auth.user) {
			throw redirect({ to: '/' })
		}
	},
	component: ForgotPassword
})
