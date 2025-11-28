import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './components/AuthProvider'
import { ThemeProvider } from './components/ThemeProvider'
import useAuth from './hooks/useAuth'
import './index.css'
import { routeTree } from './routeTree.gen'

const router = createRouter({
	routeTree,
	context: {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		auth: undefined!
	}
})

const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

function RouterProviderWithAuth() {
	const auth = useAuth()
	return <RouterProvider router={router} context={{ auth }} />
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProviderWithAuth />
					<ReactQueryDevtools initialIsOpen={false} position='bottom' />
				</QueryClientProvider>
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>
)
