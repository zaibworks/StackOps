import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/auth.middleware.js'
import { createTaskController,
    getTasksController,
    updateTaskController,
    deleteTaskController 
} from './task.controller.js'

import {workspaceMemberMiddlware} from '../middleware/workspace.middleware.js'
import { validate } from '../middleware/validation.middleware.js'
import { taskSchema } from './task.schema.js'

router.get('/:workspaceId',authMiddleware,workspaceMemberMiddlware,getTasksController)
router.post('/:workspaceId',authMiddleware,validate(taskSchema,"Task creation Failed"),workspaceMemberMiddlware,createTaskController)
router.put('/:workspaceId/:taskId',authMiddleware,validate(taskSchema,'Task updation failed'),workspaceMemberMiddlware,updateTaskController)
router.delete('/:workspaceId/:taskId',authMiddleware,workspaceMemberMiddlware,deleteTaskController)

export default router 