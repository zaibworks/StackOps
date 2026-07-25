import express from "express";
const router = express.Router();
import { addCommentController, getCommentsController, deleteCommentController } from "./comment.controller.js";
import { workspaceMemberMiddlware } from "../middleware/workspace.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import { commentSchema } from "./comment.schema.js";
router.post('/:workspaceId/:taskId', authMiddleware, validate(commentSchema, "Cannot Comment"), workspaceMemberMiddlware, addCommentController);
router.get('/:workspaceId/:taskId', authMiddleware, workspaceMemberMiddlware, getCommentsController);
router.delete('/:workspaceId/:commentId', authMiddleware, workspaceMemberMiddlware, deleteCommentController);
export default router;
//# sourceMappingURL=comment.routes.js.map