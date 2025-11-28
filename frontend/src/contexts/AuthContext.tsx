import { createContext } from 'react'
import type { User } from '../types/auth'

export interface AuthContextProps {
	user: User | null
	loading: boolean
	login: (email: string, password: string) => Promise<void>
	register: (email: string, password: string, username: string) => Promise<void>
	logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>({
	user: null,
	loading: false,
	login: async () => {},
	register: async () => {},
	logout: async () => {}
})

export default AuthContext
