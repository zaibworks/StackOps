import prisma from '../db.js'

const createActivity=async({userId,workspaceId,action})=>{
    await prisma.activity.create({
        data:{
            userId,
            workspaceId,
            action
        }
    })
}

export default createActivity