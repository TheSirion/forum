import { Router } from 'express'

import AuthController from './controllers/AuthController'

const router = Router()

const authController = new AuthController()

router.post('/register', authController.create)

export default router
