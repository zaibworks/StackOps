import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/auth.middleware.js'
import { createTaskController,
    updateTaskController,
    deleteTaskController,
    getMyTasksController
} from './task.controller.js'

import {workspaceMemberMiddlware} from '../middleware/workspace.middleware.js'
import { validate } from '../middleware/validation.middleware.js'
import { taskSchema, updateTaskSchema } from './task.schema.js'

router.get('/getMy',authMiddleware,getMyTasksController)
router.post('/:workspaceId',authMiddleware,validate(taskSchema,"Task creation Failed"),workspaceMemberMiddlware,createTaskController)
router.put('/:workspaceId/:taskId',authMiddleware,validate(updateTaskSchema,'Task updation failed'),workspaceMemberMiddlware,updateTaskController)
router.delete('/:workspaceId/:taskId',authMiddleware,workspaceMemberMiddlware,deleteTaskController)

export default router 