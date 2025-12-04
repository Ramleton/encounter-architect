import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'
import classes from './ForgotPassword.module.css'

export default function ForgotPassword() {
	const { resetPassword } = useAuth()
	const [email, setEmail] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<string[]>([])
	const [message, setMessage] = useState<string>('')

	const { theme } = useTheme()

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
		setErrors(validationErrors)
		return validationErrors.length === 0
	}

	const handleSubmit = async () => {
		setLoading(true)
		try {
			if (isValidInput()) {
				try {
					await resetPassword(email)
					setMessage('Password reset email sent')
				} catch (err) {
					setErrors([`Reset password failed: ${(err as Error).message}`])
				}
			}
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			className={classes.forgotContainer}
			style={{
				backgroundColor: bgColor
			}}
		>
			<div
				className={classes.forgotBox}
				style={{
					backgroundColor: boxColor
				}}
			>
				<h1
					className={classes.forgotTitle}
					style={{ color: textColor }}
				>
					Forgot Password?
				</h1>

				<form
					onSubmit={e => {
						e.preventDefault()
						void handleSubmit()
					}}
					className={classes.forgotForm}
				>
					<div className={classes.errorContainer}>
						{errors.length > 0 && (errors.map((error, index) => (
							<p key={index} className={classes.error}>{error}</p>
						)))}
					</div>

					<div className={classes.message}>
						{message && <p>{message}</p>}
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

					<button
						type='submit'
						disabled={loading}
						style={{
							'--bg-color': buttonBg,
							'--text-color': theme.colors.gray[1],
							'--hover-bg': buttonHover
						} as React.CSSProperties}
					>
						{loading ? 'Sending email...' : 'Submit'}
					</button>
				</form>

				<div className={classes.links}>
					<Link
						to='/signup'
						style={{ color: textColor }}
					>Register
					</Link>
					<Link
						to='/login'
						style={{ color: textColor }}
					>Login
					</Link>
				</div>
			</div>
		</div>
	)
}
