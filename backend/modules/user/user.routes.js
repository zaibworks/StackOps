import express from 'express'
const router = express.Router();
import authMiddleware from '../middleware/auth.middleware.js';
import {getMe,getUserOverviewController} from './user.controller.js';

router.get('/me', authMiddleware, getMe)
router.get('/overview',authMiddleware,getUserOverviewController)

export default router 