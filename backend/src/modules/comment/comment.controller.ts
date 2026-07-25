import { addComment,getComments,deleteComment } from "./comment.service.js";
import type { AuthenticatedReq } from "../../types/auth.types.js";
import { response, type Response } from "express";


export const addCommentController = async(req:AuthenticatedReq,res:Response)=>{
    try{
        const taskParams = req.params.taskId
        const userParams = req.user.userId
        if(typeof taskParams!=="number" || typeof userParams!=="string"){
            throw new Error("")
        }
  const {content} = req.body
  const taskId = parseInt(taskParams)
  const userId = parseInt(userParams)
    const comment = await addComment(userId,taskId,content)
    res.json({message:"Added Comment",data:comment})
    }catch(e){
        if(e instanceof Error){
            res.status(401).json({message:e.message})
        }
    }
}


export const getCommentsController = async(req:AuthenticatedReq,res:Response)=>{
    try {
        const taskParams = req.params.taskId
        if(typeof taskParams !=="string"){
            throw new Error("TaskID is invalid")
        }
         const taskId = parseInt(taskParams)
         const comments = await getComments(taskId)
         res.json({message:"Task comments",data:comments})
    } catch (e) {
        if(e instanceof Error){
            res.status(401).json({message:e.message})
        }
    }
}


export const deleteCommentController = async(req:AuthenticatedReq,res:Response)=>{
    try {
        const workspaceParams = req.params.workspaceId
        const commentParams = req.params.commentId
        if(typeof workspaceParams!=='string' || typeof commentParams !=='string'){
            throw new Error("Ids given in params are invalid")
        }
        const workspaceId = parseInt(workspaceParams)
        const commentId = parseInt(commentParams)
        const userId = req.user.userId
        const comment = await deleteComment(commentId,userId,workspaceId)
        res.json({message:"Comment removed",data:comment})
    } catch (e) {
        if(e instanceof Error){
            res.status(400).json({message:e.message})
        }
    }
}
