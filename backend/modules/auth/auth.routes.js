import express from 'express'
const router = express.Router()
import { signupController, loginController } from './auth.controller.js'

router.post('/signup',signupController)
router.post('/login',loginController)

export default router

