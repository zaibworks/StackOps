import prisma from '../db.js'

interface activityType{
    userId:number;
    workspaceId:number;
    action:string;
}

const createActivity = async ({userId,workspaceId,action}:activityType):Promise<void>=>{
    await prisma.activity.create({
        data:{
            userId,
            workspaceId,
            action
        }
    })
}

export default createActivity