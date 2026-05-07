import prisma from "../../src/db.js";

export const createTask = async ({ title, content, userId }) => {
  return await prisma.task.create({
    data: {
      title,
      content,
      userId
    }
  })
}

export const getTask= async({userId})=>{
    return await prisma.task.findUnique({
        where:{userId},
        orderBy:{id:'desc'}
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