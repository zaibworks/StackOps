import prisma from "../../src/db.js";
import { createWorkspace,getMyWorkspace,inviteMember,getWorkspaceMembers,removeMember } from "./workspace.service.js";

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