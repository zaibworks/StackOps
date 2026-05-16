import express from 'express'
import authMiddlware from '../middleware/auth.middleware.js'
import { createWorkspaceController,
    getMyWorkspaceController,
    inviteMemberController,
    getWorkspaceMembersController,
    removeMemberController,
    updateWorkspaceController
} from './workspace.controller.js'

import { workspaceMemberMiddlware } from '../middleware/workspace.middleware.js'
import { naming } from '../middleware/validation.middleware.js'
import { createWorkspaceSchema, updateWorkspaceSchema } from './workspace.schema.js'

const router = express.Router()

router.post('/',authMiddlware,naming(createWorkspaceSchema),createWorkspaceController)
router.get('/',authMiddlware,naming(updateWorkspaceSchema) ,getMyWorkspaceController)
router.post('/:workspaceId/invite',authMiddlware,inviteMemberController)
router.get('/:workspaceId/members',authMiddlware,workspaceMemberMiddlware,getWorkspaceMembersController)
router.delete('/:workspaceId/members/:memberId',authMiddlware,workspaceMemberMiddlware,removeMemberController)
router.put('/:workspaceId', authMiddlware, workspaceMemberMiddlware, updateWorkspaceController)


export default router