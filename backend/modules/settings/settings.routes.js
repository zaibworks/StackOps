import express from 'express'
 const router = express.Router()

import { 
    updateProfileNameController,
    updatePasswordController,
    deleteSelectedWorkspaceController,
    deleteSelectedTasksController,
    deleteSelectedCommentsController,
    deleteSelectedActivitiesController,
    deleteUserAccountController
} from "./settings.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.put('/updateName',authMiddleware,updateProfileNameController)
router.put('/updatePassword',authMiddleware,updatePasswordController)
router.delete('/deleteWorkspaces',authMiddleware,deleteSelectedWorkspaceController)
router.delete('/deleteTasks',authMiddleware,deleteSelectedTasksController)
router.delete('/deleteComments',authMiddleware,deleteSelectedCommentsController)
router.delete('/deleteActivities',authMiddleware,deleteSelectedActivitiesController)
router.delete('/deleteUser',authMiddleware,deleteUserAccountController)

export default router