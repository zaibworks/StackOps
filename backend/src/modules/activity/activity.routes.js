import express from 'express'
const router = express.Router()
import { getActivitiesController } from "./activity.controller.js";
import authMiddleware from '../middleware/auth.middleware.js';

router.get('/',authMiddleware,getActivitiesController)

export default router