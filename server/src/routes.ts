import { Router } from 'express'

import AuthController from './controllers/AuthController'
import ForumController from './controllers/ForumContoller'
import PostController from './controllers/PostController'

import checkUser from './middlewares/checkUser'

const router = Router()

const authController = new AuthController()
const postController = new PostController()
const forumController = new ForumController()

router.post('/login', authController.login)
router.post('/register', authController.create)
router.post('/logout', authController.logout)

router.get('/posts', postController.index)
router.get('/posts/trending', postController.trending)
router.post('/posts/create', checkUser, postController.create)
router.get('/posts/:id', postController.show)
router.delete('/posts/:id', checkUser, postController.destroy)

router.get('/forums', forumController.index)
router.get('/forum/:id', forumController.show)
router.post('/forum/create', checkUser, forumController.create)

export default router
