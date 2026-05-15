import prisma from "../../src/db"

export const addComment = async(userId,taskId,content)=>{
    return await prisma.comment.create({
        data:{
             content,
             userId,
             taskId
        },
        include:{
            user:{select:{
                id:true,
                name:true
            }
            }
        }
    })
}

export const getComments = async(taskId)=>{
    return await prisma.comment.findMany({
        where:{
            taskId
        }
    })
}

export const deleteComment = async(commentId,userId,workspaceId)=>{
      const comment = await prisma.comment.findUnique({
        where:{
            id:commentId
        }
      })
      const admin = await prisma.membership.findFirst({
        where:{ userId,workspaceId,role:"admin"}
      })
        if(comment.userId !== userId && !admin ){
            throw new Error("Attempt failed: You are not admin or creator of this comment")
        }
            const remove = await prisma.comment.delete({
        where:{id:commentId}
        })

        return remove
    
}