import { Router } from 'express'
import supabase from '../utils/supabase'

const router = Router()

router.post('/login', async (req, res) => {
	const { email, password } = req.body

	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		})

		if (error) return res.status(400).json({ error: error.message })

		res.json({ user: data.user, session: data.session })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Internal server error' })
	}
})

router.post('/signup', async (req, res) => {
	const { email, password, username } = req.body
	try {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					display_name: username
				}
			}
		})

		if (error) return res.status(400).json({ error: error.message })

		if (data?.user?.user_metadata?.email_verified === undefined)
			return res.status(409).json({ error: 'Email already in use' })
		
		return res.status(201).json({ message: "Signup successful" })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Internal server error' })
	}
})

export default router
