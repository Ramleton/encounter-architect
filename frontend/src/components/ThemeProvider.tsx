import { useEffect, useState, type ReactNode } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import { type ThemeMode } from '../types/theme'

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const toggleTheme = () => {
		setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'))
	}

	// Apply a small, consistent token set to :root so CSS modules can consume them
	useEffect(() => {
		document.documentElement.dataset.theme = themeMode
	}, [themeMode])

	return (
		<ThemeContext.Provider value={{ themeMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
