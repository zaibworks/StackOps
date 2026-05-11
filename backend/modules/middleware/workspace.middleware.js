import prisma from "../../src/db.js";

export const workspaceMemberMiddlware = async (req,res,next)=>{
    try{
        const workspaceId = parseInt(req.params.workspaceId)
     const userId = req.user.userId
     const member = await prisma.membership.findFirst({
            where:{
                userId:userId,
                workspaceId:workspaceId
            }
     })
     if(!member){
       return res.status(403).json({ message: "You are not a member of this workspace" })
     }

     next()

    }catch(e){
        res.status(500).json({message:e.message})
    }
}