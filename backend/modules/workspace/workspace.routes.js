import express from 'express'
import authMiddlware from '../middleware/auth.middleware.js'
import { createWorkspaceController,
    getMyWorkspaceController,
    inviteMemberController,
    getWorkspaceMembersController,
    removeMemberController,
    updateWorkspaceController,
    getWorkspacebyIdController
} from './workspace.controller.js'

import { workspaceMemberMiddlware } from '../middleware/workspace.middleware.js'
import { validate} from '../middleware/validation.middleware.js'
import { createWorkspaceSchema, updateWorkspaceSchema } from './workspace.schema.js'

const router = express.Router()

router.post('/',authMiddlware,validate(createWorkspaceSchema,"Workspace creation failed"),createWorkspaceController)
router.get('/',authMiddlware,getMyWorkspaceController)
router.post('/:workspaceId/invite',authMiddlware,inviteMemberController)
router.get('/:workspaceId/members',authMiddlware,workspaceMemberMiddlware,getWorkspaceMembersController)
router.delete('/:workspaceId/members/:memberId',authMiddlware,workspaceMemberMiddlware,removeMemberController)
router.put('/:workspaceId', authMiddlware,validate(updateWorkspaceSchema,"Workspace updation failed") ,workspaceMemberMiddlware, updateWorkspaceController)
router.get('/:workspaceId',authMiddlware,workspaceMemberMiddlware,getWorkspacebyIdController)


export default router