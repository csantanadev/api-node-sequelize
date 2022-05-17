import { Router } from 'express'
import FotoController from '../controllers/FotoController'
import authMiddleware from '../middlewares/authMiddleware'

const router = new Router()

router.post('/',  authMiddleware, FotoController.store)

export default router