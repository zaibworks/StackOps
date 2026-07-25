import prisma from "../../db.js";
import { createWorkspace,
    getMyWorkspace,
    inviteMember,
    getWorkspaceMembers,
    removeMember,
    updateWorkspace,
    getWorkspacebyId,
    leaveWorkspace,
    changeMemberRole,
    deleteWorkspace,
    lastOpenedUpdated
    
 } from "./workspace.service.js";
 import type { AuthenticatedReq } from "../../types/auth.types.js";
 import type { Response,Request } from "express";

export const createWorkspaceController= async(req:AuthenticatedReq,res:Response)=>{
    try{
         const userId = req.user.userId
        const {name} = req.body

         if (!name) {
      return res.status(400).json({ message: "Name required" })
    }
     const workspace = await createWorkspace(name,userId)
     res.status(201).json(workspace)
    }catch(e){
        if(e instanceof Error){
            res.status(500).json({message:e.message})
        }
    }
}


export const getMyWorkspaceController = async(req:AuthenticatedReq,res:Response)=>{
try{
    const userId = req.user.userId
    console.log(userId)
    const workspaces = await getMyWorkspace(userId)
    res.json(workspaces)
}catch(e){
    if(e instanceof Error){
        res.status(500).json({message:e.message})
    }
}
}


export const inviteMemberController= async(req:AuthenticatedReq,res:Response)=>{
    try{
        const {role,email} = req.body
        const workspaceParams = req.params.workspaceId
        if(typeof workspaceParams !=="string"){
            throw new Error("WorkspaceID is invalid")
        }
        const workspaceId = parseInt(workspaceParams)
        const adminId = req.user.userId
        const invite = await inviteMember(adminId,workspaceId,email,role)
       res.status(201).json({message:"Invitation sent successfully ",data:invite})
    }catch(e){
        if(e instanceof Error){
            res.status(500).json({message:e.message})
        }
    }
}



export const getWorkspaceMembersController= async (req:Request,res:Response)=>{
    try{

          const workspaceParams = req.params.workspaceId
        if(typeof workspaceParams !=="string"){
            throw new Error("WorkspaceID is invalid")
        }
        const workspaceId = parseInt(workspaceParams)

        const members = await getWorkspaceMembers(workspaceId)
        res.json(members)

    }catch(e){
        if(e instanceof Error){
            res.status(500).json({message:e.message})
        }
    }
}


export const removeMemberController = async (req:AuthenticatedReq,res:Response)=>{
    try {
         const workspaceParams = req.params.workspaceId
         const memberParams = req.params.memberId
        if(typeof workspaceParams !=="string" || typeof memberParams !=="string"){
            throw new Error("Params IDs are invalid")
        }
        const workspaceId = parseInt(workspaceParams)
        const memberId =  parseInt(memberParams)
        const adminId = req.user.userId
         const deleteMember = await removeMember(adminId,workspaceId,memberId)
         res.json({ message: 'Member removed successfully' })
    } catch (e) {
        if(e instanceof Error){
            res.status(500).json({message:e.message})
        }
    }
}


export const updateWorkspaceController = async (req:AuthenticatedReq,res:Response)=>{
    try{
         const workspaceParams = req.params.workspaceId
        if(typeof workspaceParams !=="string"){
            throw new Error("WorkspaceID is invalid")
        }
        const workspaceId = parseInt(workspaceParams)
          const adminId = req.user.userId
         const {name} = req.body
     const updated = await updateWorkspace(adminId,workspaceId,name)

        res.json({message:'Workspace name changed successfully',data:updated})
    }catch(e){
        if(e instanceof Error){
            res.status(500).json({message:e.message})
        }
    }
}


export const getWorkspacebyIdController =async(req:AuthenticatedReq,res:Response)=>{
    try{
   const workspaceParams = req.params.workspaceId
        if(typeof workspaceParams !=="string"){
            throw new Error("WorkspaceID is invalid")
        }
        const workspaceId = parseInt(workspaceParams)
    const userId = req.user.userId
    const workspace = await getWorkspacebyId(userId,workspaceId)
    res.json({message:"Workspace fetched successfully",data:workspace})
    }catch(e){
        if(e instanceof Error){
            res.status(500).json({message:e.message})
        }
    }
}


export const leaveWorkspaceController=async(req:AuthenticatedReq,res:Response)=>{
       try {
      const workspaceParams = req.params.workspaceId
        if(typeof workspaceParams !=="string"){
            throw new Error("WorkspaceID is invalid")
        }
        const workspaceId = parseInt(workspaceParams)
        const userId = req.user.userId
        const leave = await leaveWorkspace(userId,workspaceId)
        res.json({message:"You left workspace"})
       } catch (e) {
        if(e instanceof Error){
            res.status(500).json({message:e.message})
        }
    }
}


export const changeMemberRoleController = async(req:AuthenticatedReq,res:Response)=>{
    try {
        const workspaceParams = req.params.workspaceId
         const memberParams = req.params.memberId
        if(typeof workspaceParams !=="string" || typeof memberParams !=="string"){
            throw new Error("Params IDs are invalid")
        }
        const workspaceId = parseInt(workspaceParams)
        const memberId =  parseInt(memberParams)
        const adminId = req.user.userId
        const {role} = req.body
        const member = await changeMemberRole(memberId,adminId,workspaceId,role)
         res.json({message:"Role changed successfully",data:member})
    } catch (e) {
        if(e instanceof Error){
            res.status(500).json({message:e.message})
        }
    }
}


export const deleteWorkspaceController = async (req:AuthenticatedReq,res:Response)=>{
    try {
        const workspaceParams = req.params.workspaceId
        if(typeof workspaceParams!=="string"){
            throw new Error("WorkspaceID is invalid")
        }
        const userId = req.user.userId
        const workspaceId = parseInt(workspaceParams)
        const workspace = await deleteWorkspace(workspaceId,userId)
        res.json({message:"Workspace deleted successfully",data:workspace.name})
    } catch (e) {
        if(e instanceof Error){
            res.status(403).json({message:e.message})
        }
    }
}


export const lastOpenedUpdatedController = async(req:AuthenticatedReq,res:Response)=>{
 try {
    const userId = req.user.userId;
    const { workspaceId } = req.params; 
    if(typeof workspaceId !=="number"){
        throw new Error("WorkspaceID is invalid")
    }  
    await lastOpenedUpdated(userId, workspaceId);

    res.status(200).json({ message: "Workspace marked as opened" });
  } catch (e) {
    if(e instanceof Error){
        res.status(400).json({ message: e.message });
    }
}
}
