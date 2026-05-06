import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/auth.middleware.js'
import { createTaskController,
    getTaskController,
    updateTaskController,
    deleteTaskController 
} from './taks.controller'

router.get('./',authMiddleware,getTaskController)
router.post('/',authMiddleware,createTaskController)
router.put('/:id',authMiddleware,updateTaskController)
router.deletet('/:id',authMiddleware,deleteTaskController)

export default router 