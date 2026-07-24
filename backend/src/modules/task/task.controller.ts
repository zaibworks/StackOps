import { createTask,updateTask,deleteTask,getMyTasks} from "./task.service.js";
import type { AuthenticatedReq } from "../../types/auth.types.js";
import type { Response } from "express";
import { intersection } from "zod";
import { Status, type Priority } from "@prisma/client";
import type { GetMytaskTypes,TaskFilter } from "../../types/task.types.js";

export const createTaskController=async(req:AuthenticatedReq,res:Response)=>{
    try{
        const userId = req.user.userId
        const workspaceParam = req.params.workspaceId
              if(typeof workspaceParam !=="string"){
                throw new Error("Workspace Id is invalid")
              }
        const workspaceId = parseInt(workspaceParam)
        const task = await createTask(userId,workspaceId,req.body)
        res.json({message:"Task created successfully",data:task})

    }catch(e){
      if(e instanceof Error){
        res.status(400).json({message:e.message})
      }
    }
  }
interface getTaskType{
workspaceId:number
 status:Status
 priority:Priority
 assignedToId:number
}

// export const getTasksController= async(req:AuthenticatedReq,res:Response)=>{
//   try{
//     const workspaceParam = req.params.workspaceId
//     if(typeof workspaceParam !=="string"){
//       throw new Error("Workspace ID in invalid")
//     }
//      const workspaceId = parseInt(workspaceParam)
//       const { status, priority, assignedToId, page = 1, limit = 10 } = req.query
     
//        const tasks = await getTasks(workspaceId,{ status, priority, assignedToId: assignedToId ? parseInt(assignedToId) : undefined }})
//          res.json({ message:"Workspace Tasks",data:tasks})
//    }catch(e){
//     res.status(500).json({message:e.message})
//    }
// }

export const updateTaskController= async(req:AuthenticatedReq,res:Response)=>{
  console.log(req.body)
 try{
   const { taskId } = req.params
   if(typeof taskId !=="number"){
    throw new Error("TaskID is NAN")
   }
   const userId = req.user.userId
    const workspaceParam = req.params.workspaceId
              if(typeof workspaceParam !=="string"){
                throw new Error("Workspace Id is invalid")
              }
   const workspaceId = parseInt(workspaceParam)

   console.log(req.body)
   
   const result = await updateTask(taskId,userId,req.body,workspaceId)
   res.json({message:"Task updated successfully",data:result})
 }catch(e){
  if(e instanceof Error){
    res.status(400).json({message:e.message})
  }
}
}


export const deleteTaskController= async(req:AuthenticatedReq,res:Response)=>{
   try{
    const {taskId} = req.params
    if(typeof taskId !=="number"){
    throw new Error("TaskID is NAN")
   }
    const userId = req.user.userId
     const workspaceParam = req.params.workspaceId
              if(typeof workspaceParam !=="string"){
                throw new Error("Workspace Id is invalid")
              }
    const workspaceId = parseInt(workspaceParam)
    const result = await deleteTask(userId,workspaceId,taskId)
    res.json(result)
   }catch(e){
    if(e instanceof Error){
      res.status(400).json({message:e.message})
      }
     }
}

export const getMyTasksController = async(req:AuthenticatedReq,res:Response)=>{
  try {
    const userId = req.user.userId
  const filter =
  typeof req.query.filter === "string"
    ? (req.query.filter as TaskFilter)
    : "all";

const page =
  typeof req.query.page === "string"
    ? Number(req.query.page)
    : 1;


const limit =
  typeof req.query.limit === "string"
    ? Number(req.query.limit)
    : 10;

const workspaceId =
  typeof req.query.workspaceId === "string"
    ? Number(req.query.workspaceId)
    : undefined;

const status =
  typeof req.query.status === "string"
    ? (req.query.status as Status)
    : undefined;

    const params: GetMytaskTypes = {
  userId,
  page,
  limit,
  filter,
  ...(status!== undefined &&{status}),
  ...(workspaceId !== undefined &&{workspaceId})
};

    const {tasks,total,totalPages} = await getMyTasks(params)

    res.json({message:"All you tasks",data:tasks,totalPages,currentPage:page})

  } catch (e) {
    if(e instanceof Error){
      res.status(400).json({message:e.message})
    }
  }
}

