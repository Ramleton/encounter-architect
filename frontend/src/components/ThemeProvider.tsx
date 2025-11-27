import { useState, type ReactNode } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import { darkTheme, lightTheme, type ThemeMode } from '../types/theme'

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const toggleTheme = () => {
		setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'))
	}

	const theme = themeMode === 'light' ? lightTheme : darkTheme

	return (
		<ThemeContext.Provider value={{ themeMode, theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
