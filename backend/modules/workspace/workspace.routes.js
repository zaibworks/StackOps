import express from 'express'
import authMiddlware from '../middleware/auth.middleware.js'
import { createWorkspaceController,getMyWorkspaceController,inviteMemberController } from './workspace.controller.js'

const router = express.Router()

router.post('/',authMiddlware,createWorkspaceController)
router.get('/',authMiddlware,getMyWorkspaceController)
router.post('/:workspaceId/invite',authMiddlware,inviteMemberController)


export default router