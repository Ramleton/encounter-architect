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
					username
				}
			}
		})

		if (error) return res.status(400).json({ error: error.message })
		
		return res.json({ user: data.user })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Internal server error' })
	}
})

export default router
