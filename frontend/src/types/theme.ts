export type ThemeMode = 'light' | 'dark'

export type Theme = {
	mode: ThemeMode
	colors: {
		primary: string[]
		secondary: string[]
		accent: string[]
		gray: string[]
		background: string
		text: string
	}
}

export const lightTheme: Theme = {
	mode: 'light',
	colors: {
		primary: [
			'#e6f0ff',
			'#cce0ff',
			'#99c2ff',
			'#66a3ff',
			'#3385ff',
			'#0066ff',
			'#0052cc',
			'#003d99',
			'#002966',
			'#001433'
		],
		secondary: [
			'#fff0e6',
			'#ffe0cc',
			'#ffc299',
			'#ffa366',
			'#ff8533',
			'#ff6600',
			'#cc5200',
			'#993d00',
			'#662900',
			'#331400'
		],
		accent: [
			'#e6ffe6',
			'#ccffcc',
			'#99ff99',
			'#66ff66',
			'#33ff33',
			'#00ff00',
			'#00cc00',
			'#009900',
			'#006600',
			'#003300'
		],
		gray: [
			'#f9f9f9',
			'#f2f2f2',
			'#e6e6e6',
			'#d9d9d9',
			'#bfbfbf',
			'#a6a6a6',
			'#8c8c8c',
			'#737373',
			'#595959',
			'#404040'
		],
		background: '#ffffff',
		text: '#111111'
	}
}

export const darkTheme: Theme = {
	mode: 'dark',
	colors: {
		primary: lightTheme.colors.primary.slice().reverse(),
		secondary: lightTheme.colors.secondary.slice().reverse(),
		accent: lightTheme.colors.accent.slice().reverse(),
		gray: lightTheme.colors.gray.slice().reverse(),
		background: '#111111',
		text: '#ffffff'
	}
}
