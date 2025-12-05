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
		tooltipBg: string
		tooltipText: string
	}
}

export const lightTheme: Theme = {
	mode: 'light',
	colors: {
		primary: [
			'#eef6ff',
			'#d9eaff',
			'#b3d4ff',
			'#8dbdff',
			'#66a6ff',
			'#408fff',
			'#1a78ff',
			'#005fde',
			'#0046a6',
			'#002f6f'
		],
		secondary: [
			'#fff8ea',
			'#ffebc7',
			'#ffd48a',
			'#ffbe4d',
			'#ffa616',
			'#ff8c00',
			'#db6f00',
			'#b35300',
			'#8c4000',
			'#662e00'
		],
		accent: [
			'#e9fefa',
			'#ccfbf1',
			'#99f5de',
			'#66eec8',
			'#33e6b3',
			'#00dd9e',
			'#00b981',
			'#009466',
			'#006e4b',
			'#004830'
		],
		gray: [
			'#fafafa',
			'#f4f4f5',
			'#e5e7eb',
			'#d4d4d8',
			'#a1a1aa',
			'#71717a',
			'#52525b',
			'#3f3f46',
			'#27272a',
			'#18181b'
		],
		background: '#ffffff',
		text: '#111111',
		tooltipBg: '#18181b',
		tooltipText: '#fafafa'
	}
}

export const darkTheme: Theme = {
	mode: 'dark',
	colors: {
		primary: [
			'#002f6f',
			'#0046a6',
			'#005fde',
			'#1a78ff',
			'#408fff',
			'#66a6ff',
			'#8dbdff',
			'#b3d4ff',
			'#d9eaff',
			'#eef6ff'
		],
		secondary: [
			'#662e00',
			'#8c4000',
			'#b35300',
			'#db6f00',
			'#ff8c00',
			'#ffa616',
			'#ffbe4d',
			'#ffd48a',
			'#ffebc7',
			'#fff8ea'
		],
		accent: [
			'#004830',
			'#006e4b',
			'#009466',
			'#00b981',
			'#00dd9e',
			'#33e6b3',
			'#66eec8',
			'#99f5de',
			'#ccfbf1',
			'#e9fefa'
		],
		gray: [
			'#18181b',
			'#27272a',
			'#3f3f46',
			'#52525b',
			'#71717a',
			'#a1a1aa',
			'#d4d4d8',
			'#e5e7eb',
			'#f4f4f5',
			'#fafafa'
		],
		background: '#0d0d0f',
		text: '#f5f5f5',
		tooltipBg: '#fafafa',
		tooltipText: '#18181b'
	}
}
