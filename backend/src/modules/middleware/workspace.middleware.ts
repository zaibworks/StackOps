import prisma from "../../db.js";
import type { Request,Response,NextFunction } from "express";

interface TokenPayload {
    userId: number;
}

interface CustomRequest extends Request {
    user: TokenPayload
}

export const workspaceMemberMiddlware = async (req:CustomRequest,res:Response,next:NextFunction)=>{
    try{
        const workspaceParams= req.params.workspaceId
        if(typeof workspaceParams !=="string"){
            return res.status(400).json({
        message: "Invalid workspaceId"
    });
        }
        const workspaceId = parseInt(workspaceParams)
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
        if(e instanceof Error){
            res.status(500).json({message:e.message})
        }
    }
}
