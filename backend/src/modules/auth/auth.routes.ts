import express from 'express'
const router = express.Router()
import { signupController, loginController,googleLoginController,googleCallbackController } from './auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validation.middleware.js'
import { signupSchema,loginSchema } from './auth.schema.js'

router.post('/signup',validate(signupSchema),signupController)
router.post('/login',validate(loginSchema),loginController)

router.get('/google', googleLoginController)
router.get('/google/callback', googleCallbackController)


export default router

