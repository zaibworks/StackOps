import express from "express";
const router = express.Router()
import { addCommentController,getCommentsController,deleteCommentController } from "./comment.controller.js";
import { workspaceMemberMiddlware } from "../middleware/workspace.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.post('/:taskId',authMiddleware,workspaceMemberMiddlware,addCommentController)
router.get('/:taskId',authMiddleware,workspaceMemberMiddlware,getCommentsController)
router.delete('/:workspaceId/:commentId',authMiddleware,workspaceMemberMiddlware,deleteCommentController)

export default router