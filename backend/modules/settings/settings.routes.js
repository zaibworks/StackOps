import express from 'express'
 const router = express.Router()

import { updateProfileNameController } from "./settings.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.put('/updateName',authMiddleware,updateProfileNameController)

export default router