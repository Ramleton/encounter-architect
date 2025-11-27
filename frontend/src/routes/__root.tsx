import { createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthContextProps } from '../contexts/AuthContext'
import AppLayout from '../layouts/AppLayout/AppLayout'

export interface RouterContext {
	auth: AuthContextProps
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<AppLayout />
			<TanStackRouterDevtools position='bottom-right' initialIsOpen={false} />
		</>
	)
})
