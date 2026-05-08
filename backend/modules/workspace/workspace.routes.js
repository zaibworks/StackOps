import express from 'express'
import authMiddlware from '../middleware/auth.middleware.js'
import { createWorkspaceController,getMyWorkspaceController } from './workspace.controller.js'

const router = express.Router()

router.post('/',authMiddlware,createWorkspaceController)
router.get('/',authMiddlware,getMyWorkspaceController)


export default router