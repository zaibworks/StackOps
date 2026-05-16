import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/auth.middleware.js'
import { createTaskController,
    getTasksController,
    updateTaskController,
    deleteTaskController 
} from './task.controller.js'

import {workspaceMemberMiddlware} from '../middleware/workspace.middleware.js'
import { taskCheck } from '../middleware/validation.middleware.js'
import { taskSchema } from './task.schema.js'

router.get('/:workspaceId',authMiddleware,taskCheck(taskSchema),workspaceMemberMiddlware,getTasksController)
router.post('/:workspaceId',authMiddleware,taskCheck(taskSchema),workspaceMemberMiddlware,createTaskController)
router.put('/:workspaceId/:taskId',authMiddleware,workspaceMemberMiddlware,updateTaskController)
router.delete('/:workspaceId/:taskId',authMiddleware,workspaceMemberMiddlware,deleteTaskController)

export default router 