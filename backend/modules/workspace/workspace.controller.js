import prisma from "../../src/db.js";
import { createWorkspace,
    getMyWorkspace,
    inviteMember,
    getWorkspaceMembers,
    removeMember,
    updateWorkspace,
    getWorkspacebyId,
    leaveWorkspace,
    changeMemberRole
 } from "./workspace.service.js";

export const createWorkspaceController= async(req,res)=>{
    try{
         const userId = req.user.userId
        const {name} = req.body

         if (!name) {
      return res.status(400).json({ message: "Name required" })
    }
     const workspace = await createWorkspace(name,userId)
     res.status(201).json(workspace)
    }catch(e){
        res.status(500).json({message:e.message})
    }
}

export const getMyWorkspaceController = async(req,res)=>{
try{
    const userId = req.user.userId
    console.log(userId)
    const workspaces = await getMyWorkspace(userId)
    res.json(workspaces)
}catch(e){
    res.status(500).json({message:e.message})
}
}

export const inviteMemberController= async(req,res)=>{
    try{
        const {role,email} = req.body
        const {workspaceId} = req.params
        const adminId = req.user.userId
        const invite = await inviteMember(adminId,workspaceId,email,role)
       res.status(201).json({message:"Invitation sent successfully ",data:invite})
    }catch(e){
         res.status(500).json({message:e.message})
    }

}

export const getWorkspaceMembersController= async (req,res)=>{
    try{
        const workspaceId =  parseInt(req.params.workspaceId)
        const members = await getWorkspaceMembers(workspaceId)
        res.json(members)

    }catch(e){
        res.status(500).json({message:e.message})
    }
}

export const removeMemberController = async (req,res)=>{
    try {
        const workspaceId = parseInt(req.params.workspaceId)
        const memberId =  parseInt(req.params.memberId)
        const adminId = req.user.userId
         const deleteMember = await removeMember(adminId,workspaceId,memberId)
         res.json({ message: 'Member removed successfully' })
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}

export const updateWorkspaceController = async (req,res)=>{
    try{
          const workspaceId = parseInt(req.params.workspaceId)
          const adminId = req.user.userId
         const {name} = req.body
     const updated = await updateWorkspace(adminId,workspaceId,name)

        res.json({message:'Workspace name changed successfully',data:updated})
    }catch(e){
        res.status(500).json({message:e.message})
    }
}

export const getWorkspacebyIdController =async(req,res)=>{
    try{
    const workspaceId = parseInt(req.params.workspaceId)
    const userId = req.user.userId
    const workspace = await getWorkspacebyId(userId,workspaceId)
    res.json({message:"Workspace fetched successfully",data:workspace})
    }catch(e){
        res.status(500).json({message:e.message})
    }
}

export const leaveWorkspaceController=async(req,res)=>{
       try {
        const workspaceId =parseInt(req.params.workspaceId)
        const userId = req.user.userId
        const leave = await leaveWorkspace(userId,workspaceId)
        res.json({message:e.message})
       } catch (e) {
         res.status(500).json({message:e.message})
       }
}

export const changeMemberRoleController = async(req,res)=>{
    try {
        const memberId = parseInt(req.params.memberId)
        const adminId = req.user.userId
        const workspaceId = parseInt(req.params.workspaceId)
        const {role} = req.body
        const member = changeMemberRole(memberId,adminId,workspaceId,role)
         res.json({message:"Role changed successfully",data:member})
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}