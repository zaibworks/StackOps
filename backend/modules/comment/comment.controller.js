import { addComment,getComments,deleteComment } from "./comment.service.js";


export const addCommentController = async(req,res)=>{
    try{
          const workspaceId = parseInt(req.params.workspaceId)
  const {taskId,content} = req.body
  const userId = req.user.userId
    const comment = await addComment(userId,taskId,content)
    res.json({message:"Added Comment",data:comment})
    }catch(e){
        res.status(401).json({message:e.message})
    }
}

export const getCommentsController = async( req,res)=>{
    try {
          const workspaceId = parseInt(req.params.workspaceId)
         const taskId = parseInt(req.params.taskId)
         const comments = await getComments(taskId)
         res.json({message:"Task comments",data:comments})
    } catch (e) {
        res.status(401).json({message:e.message})
    }
}

export const deleteCommentController = async(req,res)=>{
    try {
        const workspaceId = parseInt(req.params.workspaceId)
        const commentId = parseInt(req.params.commentId)
        const userId = req.user.userId
        const comment = await deleteComment(commentId,userId,workspaceId)
        res.json({message:"Comment removed",data:comment})
    } catch (e) {
        res.status(400).json({message:e.message})
    }
}