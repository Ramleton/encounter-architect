import { Router, type Request, type Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
	res.json('Hello, World!')
})

export default router
