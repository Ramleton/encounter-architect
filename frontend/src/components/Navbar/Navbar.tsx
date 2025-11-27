import { Link, useRouterState } from '@tanstack/react-router'
import { FaHome, FaMoon, FaSun } from 'react-icons/fa'
import { FaArrowRightArrowLeft, FaGear, FaPerson } from 'react-icons/fa6'
import { GiDiceTwentyFacesTwenty, GiFangsCircle } from 'react-icons/gi'
import useTheme from '../../hooks/useTheme'
import classes from './Navbar.module.css'

interface NavbarButtonProps {
	label: string
	icon: React.ReactNode
	to: string
}

function NavbarButton({ label, icon, to }: NavbarButtonProps) {
	const { themeMode, theme } = useTheme()
	const route = useRouterState()

	const isActive = route.location.pathname === to

	return (
		<div className={classes.navbarButtonWrapper}>
			<Link
				className={classes.navbarButton}
				role='button'
				tabIndex={0}
				to={to}
				style={{
					'--border': isActive ? `2px solid ${theme.colors.primary[6]}` : '2px solid transparent',
					'--bg-color': isActive ? theme.colors.gray[4] : theme.colors.gray[3],
					'--bg-color-hover': theme.colors.gray[4],

					'--icon-color': isActive
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
			</Link>

			<span className={classes.tooltip}>{label}</span>
		</div>
	)
}

const navButtons = [
	{
		label: 'Home',
		icon: <FaHome size={40} />,
		to: '/'
	},
	{
		label: 'Encounters',
		icon: <GiDiceTwentyFacesTwenty size={40} />,
		to: '/encounters'
	},
	{
		label: 'Creatures',
		icon: <GiFangsCircle size={40} />,
		to: '/creatures'
	},
	{
		label: 'Account',
		icon: <FaPerson size={40} />,
		to: '/account'
	},
	{
		label: 'Settings',
		icon: <FaGear size={40} />,
		to: '/settings'
	}
]

export default function Navbar() {
	const { themeMode, theme, toggleTheme } = useTheme()

	return (
		<div
			className={classes.navbar}
			style={{
				'--bg-color': theme.colors.gray[1]
			} as React.CSSProperties}
		>
			<div className={classes.navbarMain}>
				{/* Main navigation items go here */}
				{navButtons.map(button => (
					<NavbarButton
						key={button.label}
						label={button.label}
						icon={button.icon}
						to={button.to}
					/>
				))}
			</div>
			<div className={classes.navbarBottom}>
				{/* Non-navigation buttons go here */}
				<div className={classes.navbarBottom}>
					{/* Toggle Theme – not a route */}
					<div className={classes.navbarButtonWrapper}>
						<div
							className={classes.navbarButton}
							onClick={toggleTheme}
							onKeyDown={toggleTheme}
							role='button'
							tabIndex={0}
							style={{
								'--border': '2px solid transparent',
								'--bg-color': theme.colors.gray[3],
								'--bg-color-hover': theme.colors.gray[4],

								'--icon-color': themeMode === 'light'
									? theme.colors.primary[7]
									: theme.colors.primary[5],

								'--icon-color-hover': themeMode === 'light'
									? theme.colors.primary[7]
									: theme.colors.primary[5]
							} as React.CSSProperties}
						>
							{themeMode === 'light'
								? <FaSun size={40} />
								: <FaMoon size={40} />}
						</div>
						<span className={classes.tooltip}>Toggle Theme</span>
					</div>

					<div className={classes.navbarButtonWrapper}>
						<div
							className={classes.navbarButton}
							style={{
								'--border': '2px solid transparent',
								'--bg-color': theme.colors.gray[3],
								'--bg-color-hover': theme.colors.gray[4],

								'--icon-color': themeMode === 'light'
									? theme.colors.primary[7]
									: theme.colors.primary[5],

								'--icon-color-hover': themeMode === 'light'
									? theme.colors.primary[7]
									: theme.colors.primary[5]
							} as React.CSSProperties}
						>
							<FaArrowRightArrowLeft size={40} />
						</div>
						<span className={classes.tooltip}>Switch Account</span>
					</div>
				</div>
			</div>
		</div>
	)
}
