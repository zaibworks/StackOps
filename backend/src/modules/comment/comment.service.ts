import prisma from "../../db.js"
import createActivity from "../../utils/createActivity.js"

export const addComment = async(userId:number,taskId:number,content:string)=>{

    const task = await prisma.task.findUnique({
  where:{
    id: taskId
  },
  select:{
    title:true,
    workspaceId:true
  }
})
if(!task){
    throw new Error("Task not found")
}

    const comment = await prisma.comment.create({
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
   await createActivity({
        userId,
        workspaceId:task.workspaceId,
        action:`Commented on ${task.title}`
    })

    return comment
}

export const getComments = async(taskId:number)=>{
    return await prisma.comment.findMany({
        where:{
            taskId
        },include:{
            user:{
                select:{id:true,name:true,email:true}
            }
        }
    })
}

export const deleteComment = async(commentId:number,userId:number,workspaceId:number)=>{
      const comment = await prisma.comment.findUnique({
        where:{
            id:commentId
        },include:{
            task:{
                select:{title:true}
            }
        }
      })
      if(!comment){
  throw new Error("Comment not found")
}
      const admin = await prisma.membership.findFirst({
        where:{ userId,workspaceId,role:"admin"}
      })
        if(comment.userId !== userId && !admin ){
            throw new Error("Attempt failed: You are not admin or creator of this comment")
        }
            const remove = await prisma.comment.delete({
        where:{id:commentId}
        })

        await createActivity({
  userId,
  workspaceId,
  action: `Deleted a comment on ${comment.task.title}`
})

        return remove
    
}