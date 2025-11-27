import { useState, type ReactNode } from 'react'
import AuthContext from '../contexts/AuthContext'
import type { User } from '../types/auth'

function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	// eslint-disable-next-line @typescript-eslint/require-await
	const login = async (email: string, password: string) => {
		const fakeUser = { id: '1', email: email, username: 'testuser' }
		localStorage.setItem('user', JSON.stringify(fakeUser))
		setUser(fakeUser)
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
