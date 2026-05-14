import { createTask,getTasks,updateTask,deleteTask } from "./task.service.js";

export const createTaskController=async(req,res)=>{
    try{
        const userId = req.user.userId
        const workspaceId = parseInt(req.params.workspaceId)
        const task = await createTask(userId,workspaceId,req.body)
        res.json({message:"Task created successfully",data:task})

    }catch(e){
        res.status(400).json({message:e.message})
    }
}

export const getTasksController= async(req,res)=>{
  try{
     const workspaceId = parseInt(req.params.workspaceId)
        const tasks = await getTasks(workspaceId)
         res.json({ message:"Workspace Tasks",data:tasks})
   }catch(e){
    res.status(500).json({message:e.message})
   }
}

export const updateTaskController= async(req,res)=>{
 try{
   const { id } = req.params
   const result = await updateTask(id,req.user.userId,req,body)
   res.json(result)
 }catch(e){
  res.status(400).json({message:e.message})
 }
}

export const deleteTaskController=(req,res)=>{
   try{
    const {id} = req.params
    const result = deleteTask(id,req.user.userId)
    res.json(result)
   }catch(e){
     res.status(400).json({ message: e.message })

   }
}
