import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import classes from './ForgotPassword.module.css'

export default function ForgotPassword() {
	const { resetPassword } = useAuth()
	const [email, setEmail] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<string[]>([])
	const [message, setMessage] = useState<string>('')

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
		>
			<div
				className={classes.forgotBox}
			>
				<h1
					className={classes.forgotTitle}
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
					>Email
					</label>
					<input
						id='email'
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>

					<button
						type='submit'
						disabled={loading}
					>
						{loading ? 'Sending email...' : 'Submit'}
					</button>
				</form>

				<div className={classes.links}>
					<Link
						to='/signup'
					>Register
					</Link>
					<Link
						to='/login'
					>Login
					</Link>
				</div>
			</div>
		</div>
	)
}
