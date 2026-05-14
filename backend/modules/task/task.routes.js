import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/auth.middleware.js'
import { createTaskController,
    getTasksController,
    updateTaskController,
    deleteTaskController 
} from './task.controller.js'

import {workspaceMemberMiddlware} from '../middleware/workspace.middleware.js'

router.get('/:workspaceId',authMiddleware,workspaceMemberMiddlware,getTasksController)
router.post('/:workspaceId',authMiddleware,workspaceMemberMiddlware,createTaskController)
router.put('/:id',authMiddleware,updateTaskController)
router.delete('/:id',authMiddleware,deleteTaskController)

export default router 