import express from 'express'
import authMiddlware from '../middleware/auth.middleware.js'
import { createWorkspaceController } from './workspace.controller.js'

const router = express.Router()

router.post('/',authMiddlware,createWorkspaceController)


export default router