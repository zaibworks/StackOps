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

export const getTasks = async (workspaceId, filters, pagination) => {
  const { status, priority, assignedToId } = filters
  const { page, limit } = pagination
  const skip = (page - 1) * limit

  const tasks = await prisma.task.findMany({
    where: {
      workspaceId,
      status,
      priority,
      assignedToId
    },
    orderBy: { id: 'desc' },
    skip,
    take: limit,
    include: {
      user: {
        select: { id: true, name: true, email: true }
      },
      assignedTo: {
        select: { id: true, name: true, email: true }
      }
    }
  })

  const total = await prisma.task.count({
    where: { workspaceId, status, priority }
  })

  return {
    tasks,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  }
}

export const updateTask= async(taskId,userId,taskData,workspaceId)=>{
    const result = await prisma.task.updateMany({
        where:{ id: Number(taskId), userId, workspaceId:workspaceId },
        data:taskData
    })

    if (result.count === 0) throw new Error('Task not found or not yours')
  return result
}

export const deleteTask = async (userId,workspaceId,taskId) => {
  const result = await prisma.task.deleteMany({
    where: { id: Number(taskId), userId,workspaceId:workspaceId }
  })
  if (result.count === 0) throw new Error('Task not found or not yours')
  return result
}