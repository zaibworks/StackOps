import express from 'express'
 const router = express.Router()

import { updateProfileNameController,updatePasswordController } from "./settings.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { workspaceMemberMiddlware } from '../middleware/workspace.middleware.js';

router.put('/updateName',authMiddleware,updateProfileNameController)
router.put('/updatePassword',authMiddleware,updatePasswordController)

export default router