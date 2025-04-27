import { Router } from 'express'
import todoRouter from './route.todo'

const router = Router({ mergeParams: true })

router.use('/todo', todoRouter)

export default router
