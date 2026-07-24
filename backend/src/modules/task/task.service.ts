import type { Priority, Status } from "@prisma/client";
import prisma from "../../db.js";
import createActivity from "../../utils/createActivity.js";
import type { CreateTaskInput,UpdateTaskInput } from "./task.schema.js";
import type { GetMytaskTypes } from "../../types/task.types.js";

export const createTask = async (userId:number,workspaceId:number,taskData:CreateTaskInput) => {

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
      userId,
      priority,
      status,
      workspaceId,
      ...(content !== undefined && { content }),
      ...(assignedToId !== undefined &&{assignedToId}),
      ...(dueDate !== undefined &&{dueDate})
    }
  })

    await createActivity({
    userId,
    workspaceId,
    action :`Created task ${create.title}`
  })
 return create
}

interface FilterType{
    status:Status
    priority:Priority
    assignedToId:number
}

// export const getTasks = async (workspaceId:number, filters:FilterType) => {
//   const { status, priority, assignedToId } = filters

//   const tasks = await prisma.task.findMany({
//     where: {
//       workspaceId,
//       status,
//       priority,
//       assignedToId
//     },
//     orderBy: { updatedAt : 'desc' },
//     include: {
//       user: {
//         select: { id: true, name: true, email: true }
//       },
//       assignedTo: {
//         select: { id: true, name: true, email: true }
//       }
//     }
//   })

//   const total = await prisma.task.count({
//     where: { workspaceId, status, priority }
//   })

//   return {
//     tasks,
//     total
//   }
// }

export const updateTask= async(taskId:number,userId:number,taskData:UpdateTaskInput,workspaceId:number)=>{

  const {title,content,priority,status,dueDate,assignedToId} = taskData

   const isAdmin = await prisma.membership.findFirst({
      where:{
        workspaceId,
        userId,
        role:"admin"
      }
    })

       const oldTask = await prisma.task.findUnique({
      where:{
        id:Number(taskId)
      }
    })

  if (
  !oldTask ||
  oldTask.workspaceId !== workspaceId ||
  (oldTask.userId !== userId && !isAdmin)
) {
  throw new Error("Task not found or unauthorized");
}

    const updatedTask = await prisma.task.update({
        where:{ id: Number(taskId)},
      data: {
        userId,
        workspaceId,
     ...( title !== undefined && {title}),
     ...( priority !== undefined && {priority}),
      ...(status !== undefined && {status}),
      ...(content !== undefined && { content }),
      ...(assignedToId !== undefined &&{assignedToId}),
      ...(dueDate !== undefined &&{dueDate})
    }
    })
    

      const assigneeChanged = oldTask.assignedToId !== updatedTask.assignedToId
      const statusChanged = oldTask.status !== updatedTask.status
      const priorityChanged = oldTask.priority !== updatedTask.priority
     const dueDateChanged = oldTask.dueDate?.getTime() !== updatedTask.dueDate?.getTime()
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

if (!oldTask.assignedToId && updatedTask.assignedToId) {
  actions.push(
    `Assigned ${updatedTask.title}`
  )
}else if ( oldTask.assignedToId &&!updatedTask.assignedToId) {
  actions.push(
    `Unassigned ${updatedTask.title}`
  )
}else if ( assigneeChanged) {
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

if (!oldTask.content && updatedTask.content) {
  actions.push(`Added description to ${updatedTask.title}`)
}
else if (oldTask.content && !updatedTask.content) {
  actions.push(`Removed description from ${updatedTask.title}`)
}
else if (contentChanged) {
  actions.push(`Updated description of ${updatedTask.title}`)
}
// ----------

   for (const action of actions) {
  await createActivity({
    userId,
    workspaceId,
    action
  })
}

  return updatedTask
}

export const deleteTask = async (userId:number,workspaceId:number,taskId:number) => {

   const task = await prisma.task.findUnique({
      where:{
        id:Number(taskId)
      }
    })

    const isAdmin = await prisma.membership.findFirst({
      where:{
        workspaceId,
        userId,
        role:"admin"
      }
    })

     if (!task || task.workspaceId !== workspaceId || (task.userId !== userId && !isAdmin)) {
    throw new Error("Task not found or unauthorized")
}
  
  const result = await prisma.task.delete({
    where: { id: Number(taskId)}
  })
      await createActivity({
    userId,
    workspaceId,
    action :`Deleted task ${task.title}`
  })

  return result
}

export const getMyTasks = async ({userId,page,limit,filter,status,workspaceId}:GetMytaskTypes)=>{
  const skip = (page - 1) * limit

   let filterCondition = {}

    if (filter === 'all') {
    filterCondition = { OR: [{ assignedToId: userId }, { userId }] }
  } else if (filter === 'assignedToMe') {
    filterCondition = { assignedToId: userId }
  } else if (filter === 'createdByMe') {
    filterCondition = { userId }
  }


    const where = {
    ...filterCondition, // spreading filter condition
    workspace: {
      members: { some: { userId } }
    },
    ...(status !== undefined && {
      status
   }),
   ...(workspaceId !== undefined && {
      workspaceId
   })
  }

    const tasks = await prisma.task.findMany({
    where,  // dynamic where
    include: { workspace: { select: { id: true, name: true } } },
    orderBy: { updatedAt: 'desc' },
    skip,
    take: limit
  })

    const total = await prisma.task.count({where})

    return {
      tasks,
      total,
      totalPages:Math.ceil(total/limit)
  }
}