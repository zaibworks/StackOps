import express from 'express'
const router = express.Router();
import authMiddleware from '../middleware/auth.middleware.js';
import {getMe} from './user.controller.js';

router.get('/me', authMiddleware, getMe)

export default router 