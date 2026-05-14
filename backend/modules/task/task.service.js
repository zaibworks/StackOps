import prisma from "../../src/db.js";

export const createTask = async (userId,workspaceId,taskData) => {

  const {title,content,priority,status,dueDate,assignedToId} = taskData

  if(assignedToId){
 const isMember = await prisma.membership.findFirst({
where:{
  userId:assignedToId,
  workspaceId:workspaceId
}
  })

  if (!isMember) {
  throw new Error("Member do not exist")
}
  }
 

  return await prisma.task.create({
    data: {
      title,
      content,
      userId,
      priority,
      status,
      assignedToId,
      dueDate,
      workspaceId
    }
  })
}

export const getTask = async(userId,workspaceId,taskId)=>{
    return await prisma.task.findUnique({
      
    })
}

export const updateTask= async(taskId,userId,data)=>{
    const result = await prisma.task.updateMany({
        where:{ id: Number(taskId), userId },data
    })

    if (result.count === 0) throw new Error('Task not found or not yours')
  return result
}

export const deleteTask = async (taskId, userId) => {
  const result = await prisma.task.deleteMany({
    where: { id: Number(taskId), userId }
  })
  if (result.count === 0) throw new Error('Task not found or not yours')
  return result
}