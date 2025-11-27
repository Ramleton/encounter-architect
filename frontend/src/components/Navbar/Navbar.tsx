import { useState } from 'react'
import { FaHome, FaMoon, FaSun } from 'react-icons/fa'
import { FaArrowRightArrowLeft, FaGear, FaPerson } from 'react-icons/fa6'
import { GiDiceTwentyFacesTwenty, GiFangsCircle } from 'react-icons/gi'
import useTheme from '../../hooks/useTheme'
import classes from './Navbar.module.css'

interface NavbarButtonProps {
	label: string
	icon: React.ReactNode
	active: boolean
	onClick: () => void
}

function NavbarButton({ label, icon, active, onClick }: NavbarButtonProps) {
	const { themeMode, theme } = useTheme()

	const handleClick = (event: React.KeyboardEvent | React.MouseEvent) => {
		if ((event as React.KeyboardEvent).type === 'keydown' && (event as React.KeyboardEvent).key !== 'Enter') {
			return
		}
		onClick()
	}

	return (
		<div className={classes.navbarButtonWrapper}>
			<div
				className={classes.navbarButton}
				onClick={handleClick}
				onKeyDown={handleClick}
				role='button'
				tabIndex={0}
				style={{
					'--border': active ? `2px solid ${theme.colors.primary[6]}` : '2px solid transparent',
					'--bg-color': active ? theme.colors.gray[4] : theme.colors.gray[3],
					'--bg-color-hover': theme.colors.gray[4],

					'--icon-color': active
						? themeMode === 'light'
							? theme.colors.primary[7]
							: theme.colors.primary[4]
						: themeMode === 'light'
							? theme.colors.primary[6]
							: theme.colors.primary[5],

					'--icon-color-hover': themeMode === 'light'
						? theme.colors.primary[7]
						: theme.colors.primary[5]
				} as React.CSSProperties}
			>
				{icon}
			</div>

			<span className={classes.tooltip}>{label}</span>
		</div>
	)
}

const navButtons = [
	{
		label: 'Home',
		icon: <FaHome size={40} />
	},
	{
		label: 'Encounters',
		icon: <GiDiceTwentyFacesTwenty size={40} />
	},
	{
		label: 'Creatures',
		icon: <GiFangsCircle size={40} />
	},
	{
		label: 'Account',
		icon: <FaPerson size={40} />
	},
	{
		label: 'Settings',
		icon: <FaGear size={40} />
	}
]

export default function Navbar() {
	const { themeMode, theme, toggleTheme } = useTheme()
	const [active, setActive] = useState<number>(0)

	return (
		<div
			className={classes.navbar}
			style={{
				'--bg-color': theme.colors.gray[1]
			} as React.CSSProperties}
		>
			<div className={classes.navbarMain}>
				{/* Main navigation items go here */}
				{navButtons.map((button, index) => (
					<NavbarButton
						key={button.label}
						label={button.label}
						icon={button.icon}
						active={active === index}
						onClick={() => setActive(index)}
					/>
				))}
			</div>
			<div className={classes.navbarBottom}>
				{/* Non-navigation buttons go here */}
				<NavbarButton
					label='Toggle Theme'
					icon={themeMode === 'light' ? <FaSun size={40} /> : <FaMoon size={40} />}
					active={false}
					onClick={toggleTheme}
				/>
				<NavbarButton
					label='Switch Account'
					icon={<FaArrowRightArrowLeft size={40} />}
					active={false}
					onClick={() => {}}
				/>
			</div>
		</div>
	)
}
