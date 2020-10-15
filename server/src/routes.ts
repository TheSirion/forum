import { Router } from 'express'

import AuthController from './controllers/AuthController'

const router = Router()

const authController = new AuthController()

router.get('/login', authController.login)
router.post('/register', authController.create)
router.post('/logout', authController.logout)

export default router
