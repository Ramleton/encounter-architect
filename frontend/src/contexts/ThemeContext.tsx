import { createContext } from 'react'
import { type ThemeMode } from '../types/theme'

interface ThemeContextType {
	themeMode: ThemeMode
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
	themeMode: 'light',
	toggleTheme: () => {}
})

export default ThemeContext
