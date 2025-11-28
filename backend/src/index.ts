import cors from 'cors'
import 'dotenv/config'
import express from 'express'

import authRouter from './routes/auth'

const app = express()
app.use(express.json())
app.use(cors({
	origin: 'http://localhost:5173'
}))

// Routes
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
