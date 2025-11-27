import { createContext } from 'react'
import { lightTheme, type Theme, type ThemeMode } from '../types/theme'

interface ThemeContextType {
	themeMode: ThemeMode
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
	themeMode: 'light',
	theme: lightTheme,
	toggleTheme: () => {}
})

export default ThemeContext
