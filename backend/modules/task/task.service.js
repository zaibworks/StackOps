import prisma from "../../src/db.js";
import createActivity from "../../utils/createActivity.js";

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
 


  const create = await prisma.task.create({
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

    await createActivity({
    userId,
    workspaceId,
    action :`Created task ${create.title}`
  })
 return create
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
    orderBy: { updatedAt : 'desc' },
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
       const oldTask = await prisma.task.findUnique({
      where:{
        id:taskId
      }
    })

    const updatedTask = await prisma.task.update({
        where:{ id: Number(taskId), userId, workspaceId:workspaceId },
        data:taskData
    })

      const assigneeChanged = oldTask.assignedToId !== updatedTask.assignedToId
      const statusChanged = oldTask.status !== updatedTask.status
      const priorityChanged = oldTask.priority !== updatedTask.priority
     const dueDateChanged = oldTask.dueDate !== updatedTask.dueDate
     const titleChanged = oldTask.title !== updatedTask.title
     const contentChanged = oldTask.content !== updatedTask.content

     const actions = []

if (titleChanged) {
  actions.push(
    `Renamed task from ${oldTask.title} to ${updatedTask.title}`
  )
}

if (statusChanged) {
  actions.push(
    `Changed ${updatedTask.title} status from ${oldTask.status} to ${updatedTask.status}`
  )
}

if (priorityChanged) {
  actions.push(
    `Changed ${updatedTask.title} priority from ${oldTask.priority} to ${updatedTask.priority}`
  )
}

// assigning task  

if (
  !oldTask.assignedToId &&
  updatedTask.assignedToId
) {
  actions.push(
    `Assigned ${updatedTask.title}`
  )
}

if (
  oldTask.assignedToId &&
  !updatedTask.assignedToId
) {
  actions.push(
    `Unassigned ${updatedTask.title}`
  )
}

if (
  oldTask.assignedToId &&
  updatedTask.assignedToId &&
  assigneeChanged
) {
  actions.push(
    `Reassigned ${updatedTask.title}`
  )
}
// ------------

if (dueDateChanged) {
  actions.push(
    `Updated due date for ${updatedTask.title}`
  )
}

// changin content 

if (contentChanged) {
  actions.push(
    `Changed ${updatedTask.title} task content`
  )
}

if (
  oldTask.content &&
  !updatedTask.content
) {
  actions.push(
    `Removed description from ${updatedTask.title}`
  )
}
if (
  !oldTask.content &&
  updatedTask.content
) {
  actions.push(
    `Added description to ${updatedTask.title}`
  )
}
if (
  oldTask.content &&
  updatedTask.content &&
 contentChanged
) {
  actions.push(
    `Updated description of ${updatedTask.title}`
  )
}
// ----------

   for (const action of actions) {
  await createActivity({
    userId,
    workspaceId,
    action
  })
}

  return updateTask
}

export const deleteTask = async (userId,workspaceId,taskId) => {

   const task = await prisma.task.findUnique({
      where:{
        id:taskId
      }
    })

  const result = await prisma.task.deleteMany({
    where: { id: Number(taskId), userId,workspaceId:workspaceId }
  })

  if (result.count === 0) throw new Error('Task not found or not yours')

     await createActivity({
    userId,
    workspaceId,
    action :`Deleted task ${task.title}`
  })

  return result
}