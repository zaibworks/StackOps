import express from 'express'
import authMiddlware from '../middleware/auth.middleware.js'
import { createWorkspaceController,getMyWorkspaceController,inviteMemberController,getWorkspaceMembersController } from './workspace.controller.js'
import { workspaceMemberMiddlware } from '../middleware/workspace.middleware.js'

const router = express.Router()

router.post('/',authMiddlware,createWorkspaceController)
router.get('/',authMiddlware,getMyWorkspaceController)
router.post('/:workspaceId/invite',authMiddlware,inviteMemberController)
router.get('/:workspaceId/members',authMiddlware,workspaceMemberMiddlware,getWorkspaceMembersController)


export default router