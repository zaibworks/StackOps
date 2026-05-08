import { createWorkspace,getMyWorkspace } from "./workspace.service.js";

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