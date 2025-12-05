import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import type React from 'react'
import { FaHome, FaMoon, FaSun } from 'react-icons/fa'
import { FaArrowRightArrowLeft, FaGear, FaPerson } from 'react-icons/fa6'
import { GiDiceTwentyFacesTwenty, GiFangsCircle } from 'react-icons/gi'
import useAuth from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'
import classes from './Navbar.module.css'

interface NavbarButtonProps {
	label: string
	icon: React.ReactNode
	to: string
}

function NavbarButton({ label, icon, to }: NavbarButtonProps) {
	const route = useRouterState()

	const isActive = route.location.pathname === to

	const btnClass = `${classes.navbarButton} ${isActive ? classes.active : ''}`

	return (
		<div className={classes.navbarButtonWrapper}>
			<Link
				className={btnClass}
				role='button'
				tabIndex={0}
				to={to}
			>
				{icon}
			</Link>

			<span
				className={classes.tooltip}
			>{label}
			</span>
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
	const { themeMode, toggleTheme } = useTheme()
	const { logout } = useAuth()
	const navigate = useNavigate()

	const handleSwitchAccounts = async () => {
		await logout()
		await navigate({ to: '/login' })
	}

	return (
		<div className={classes.navbar}>
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
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ')
									toggleTheme()
							}}
							role='button'
							tabIndex={0}
						>
							{themeMode === 'light'
								? <FaSun size={40} />
								: <FaMoon size={40} />}
						</div>
						<span
							className={classes.tooltip}
						>Toggle Theme
						</span>
					</div>

					<div
						className={classes.navbarButtonWrapper}
						onClick={() => void handleSwitchAccounts()}
						onKeyDown={e => {
							if (e.key === 'Enter' || e.key === ' ')
								void handleSwitchAccounts()
						}}
						role='button'
						tabIndex={0}
					>
						<div className={classes.navbarButton}>
							<FaArrowRightArrowLeft size={40} />
						</div>
						<span className={classes.tooltip}>Switch Account</span>
					</div>
				</div>
			</div>
		</div>
	)
}
