import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import classes from './Signup.module.css'

export default function Signup() {
	const { register } = useAuth()
	const [email, setEmail] = useState<string>('')
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<string[]>([])
	const navigate = useNavigate()

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
				try {
					await register(email, password, username)
					await navigate({ to: '/login' })
				} catch (err) {
					setErrors([`Signup failed: ${(err as Error).message}`])
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
			className={classes.signupContainer}
		>
			<div
				className={classes.signupBox}
			>
				<h1
					className={classes.signupTitle}
				>
					Sign Up
				</h1>

				<form
					onSubmit={e => {
						e.preventDefault()
						void handleSubmit()
					}}
					className={classes.signupForm}
				>
					<div className={classes.errorContainer}>
						{errors.length > 0 && (errors.map((error, index) => (
							<p key={index} className={classes.error}>{error}</p>
						)))}
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

					<label
						htmlFor='username'
					>Username
					</label>
					<input
						id='username'
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
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

					<button
						type='submit'
						disabled={loading}
					>
						{loading ? 'Signing up...' : 'Sign Up'}
					</button>
				</form>

				<div className={classes.links}>
					<Link
						to='/login'
					>Login
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
