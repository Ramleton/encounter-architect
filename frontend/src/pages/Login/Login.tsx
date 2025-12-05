import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import classes from './Login.module.css'

export default function Login() {
	const { login } = useAuth()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<string[]>([])

	const navigate = useNavigate()

	const isValidInput = (): boolean => {
		const validationErrors: string[] = []
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			validationErrors.push('Please enter a valid email address.')
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
				try {
					await login(email, password)
					await navigate({ to: '/' })
				} catch (err) {
					setErrors([`Login failed: ${(err as Error).message}`])
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
			className={classes.loginContainer}
		>
			<div
				className={classes.loginBox}
			>
				<h1
					className={classes.loginTitle}
				>
					Welcome Back
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

					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>

					<label
						htmlFor='password'
					>Password
					</label>
					<input
						id='password'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>

					<div className={classes.remember}>
						<input
							type='checkbox'
							id='remember'
						/>
						<label htmlFor='remember'>Remember me</label>
					</div>

					<button
						type='submit'
						disabled={loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>

				<div className={classes.links}>
					<Link
						to='/signup'
					>Register
					</Link>
					<Link
						to='/forgotPassword'
					>Forgot password?
					</Link>
				</div>
			</div>
		</div>
	)
}
