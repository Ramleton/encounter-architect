import { createFileRoute, redirect } from '@tanstack/react-router'
import Creatures from '../pages/Creatures/Creatures'

export const Route = createFileRoute('/creatures')({
	beforeLoad: ({ context }) => {
		if (!context.auth.user) {
			throw redirect({ to: '/login' })
		}
	},
	component: Creatures
})
