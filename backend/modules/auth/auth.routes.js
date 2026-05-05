import express from 'express'
const router = express.Router()
import { signupController, loginController } from './auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

router.post('/signup',signupController)
router.post('/login',loginController)

router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: "Middleware working",
    user: req.user
  })
})

export default router

