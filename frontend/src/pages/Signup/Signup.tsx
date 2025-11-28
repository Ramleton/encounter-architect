import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'
import classes from './Signup.module.css'

export default function Signup() {
	const { register } = useAuth()
	const [email, setEmail] = useState<string>('')
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<string[]>([])

	const { theme } = useTheme()
	const navigate = useNavigate()

	const bgColor = theme.colors.gray[3]
	const boxColor = theme.colors.gray[1]
	const textColor = theme.colors.text
	const inputBg = theme.colors.gray[2]
	const inputBorder = theme.colors.gray[4]
	const buttonBg = theme.colors.accent[5]
	const buttonHover = theme.colors.accent[4]

	const isValidInput = (): boolean => {
		const validationErrors: string[] = []
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			validationErrors.push('Please enter a valid email address.')
		}
		if (username.length < 3) {
			validationErrors.push('Username must be at least 3 characters long.')
		}
		if (password.length < 8) {
			validationErrors.push('Password must be at least 8 characters long.')
		}
		setErrors(validationErrors)
		return validationErrors.length === 0
	}

	const handleSubmit = async () => {
		setLoading(true)
		try {
			if (isValidInput()) {
				await register(email, password, username)
				await navigate({ to: '/login' })
			}
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			className={classes.loginContainer}
			style={{
				backgroundColor: bgColor
			}}
		>
			<div
				className={classes.loginBox}
				style={{
					backgroundColor: boxColor
				}}
			>
				<h1
					className={classes.loginTitle}
					style={{ color: textColor }}
				>
					Sign Up
				</h1>

				<form
					onSubmit={e => {
						e.preventDefault()
						void handleSubmit()
					}}
					className={classes.loginForm}
				>
					<div className={classes.errorContainer}>
						{errors.length > 0 && (errors.map((error, index) => (
							<p key={index} className={classes.error}>{error}</p>
						)))}
					</div>

					<label
						htmlFor='email'
						style={{ color: textColor }}
					>Email
					</label>
					<input
						id='email'
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						style={{
							'--bg-color': inputBg,
							'--border-color': inputBorder,
							'--text-color': textColor,
							'--border-accent': buttonHover
						} as React.CSSProperties}
					/>

					<label
						htmlFor='username'
						style={{ color: textColor }}
					>Username
					</label>
					<input
						id='username'
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
						style={{
							'--bg-color': inputBg,
							'--border-color': inputBorder,
							'--text-color': textColor,
							'--border-accent': buttonHover
						} as React.CSSProperties}
					/>

					<label
						htmlFor='password'
						style={{ color: textColor }}
					>Password
					</label>
					<input
						id='password'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						style={{
							'--bg-color': inputBg,
							'--border-color': inputBorder,
							'--text-color': textColor,
							'--border-accent': buttonHover
						} as React.CSSProperties}
					/>

					<button
						type='submit'
						disabled={loading}
						style={{
							'--bg-color': buttonBg,
							'--text-color': theme.colors.gray[1],
							'--hover-bg': buttonHover
						} as React.CSSProperties}
					>
						{loading ? 'Signing up...' : 'Sign Up'}
					</button>
				</form>

				<div className={classes.links}>
					<Link
						to='/login'
						style={{ color: textColor }}
					>Login
					</Link>
					<Link
						to='/login' // TODO: implement forgot password
						style={{ color: textColor }}
					>Forgot password?
					</Link>
				</div>
			</div>
		</div>
	)
}
