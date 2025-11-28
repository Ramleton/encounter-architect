import { useState, type ReactNode } from 'react'
import AuthContext from '../contexts/AuthContext'
import type { User } from '../types/auth'

function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const login = async (email: string, password: string) => {
		const res = await fetch('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})

		if (!res.ok) {
			const err = await res.json() as { error: string }
			throw new Error(err.error || 'Login failed')
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data = await res.json()
		console.log(data)
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	const logout = async () => {
		localStorage.removeItem('user')
		setUser(null)
	}

	const value = { user, loading, login, logout }

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
