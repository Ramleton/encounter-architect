import { useState, type ReactNode } from 'react'
import AuthContext from '../contexts/AuthContext'
import type { LoginResponse, User } from '../types/auth'
import { BASE_URL } from '../utils/api'

function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const register = async (
		email: string,
		password: string,
		username: string
	) => {
		const res = await fetch(`${BASE_URL}/auth/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password, username })
		})

		if (!res.ok) {
			const err = await res.json() as { error: string }
			throw new Error(err.error || 'Signup failed')
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data = await res.json()
		console.log(data)
	}

	const login = async (email: string, password: string) => {
		const res = await fetch(`${BASE_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})

		if (!res.ok) {
			const err = await res.json() as { error: string }
			throw new Error(err.error || 'Login failed')
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data: LoginResponse = await res.json()
		setUser({
			id: data.user.id,
			username: data.user.user_metadata.display_name,
			email: data.user.email
		})
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	const logout = async () => {
		localStorage.removeItem('user')
		setUser(null)
	}

	const value = { user, loading, login, register, logout }

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
