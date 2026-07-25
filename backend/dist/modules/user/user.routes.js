import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.middleware.js';
import { getMe, getUserOverviewController, getMyStatsController } from './user.controller.js';
router.get('/me', authMiddleware, getMe);
router.get('/overview', authMiddleware, getUserOverviewController);
router.get('/stats', authMiddleware, getMyStatsController);
export default router;
//# sourceMappingURL=user.routes.js.map