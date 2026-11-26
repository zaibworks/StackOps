import express from 'express'
const router = express.Router();
import authMiddleware from '../middleware/auth.middleware.js';
import {getMe,getUserOverviewController,getMyStatsController,userLogoutController} from './user.controller.js';

router.get('/me', authMiddleware, getMe)
router.get('/overview',authMiddleware,getUserOverviewController)
router.get('/stats', authMiddleware, getMyStatsController);
router.post("/logout", userLogoutController);

export default router 