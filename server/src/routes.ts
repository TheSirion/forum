import { Router } from 'express'

import AuthController from './controllers/AuthController'
import PostController from './controllers/PostController'

import checkUser from './middlewares/checkUser'

const router = Router()

const authController = new AuthController()
const postController = new PostController()

router.post('/login', authController.login)
router.post('/register', authController.create)
router.post('/logout', authController.logout)

router.get('/posts', postController.index)
router.get('/posts/:id', postController.show)
router.post('/posts/create', checkUser, postController.create)
router.delete('/posts/:id', checkUser, postController.destroy)

export default router
