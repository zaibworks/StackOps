import { createTask,getTask,updateTask,deleteTask } from "./task.service.js";

export const createTaskController=async(req,res)=>{
    try{
        const userId = req.user.userId
        const task = createTask({...req.body,userId})
        res.status(201).json(task)

    }catch(e){
        res.status(400).json({message:e.message})
    }
}

export const getTaskController=(req,res)=>{
   try{
        const tasks = await getTask(req.user.userId)
         res.json(tasks)
   }catch(e){
    res.status(500).json({message:e.message})
   }
}

export const updateTaskController=(req,res)=>{
 try{
   const { id } = req.params

 }catch(e){

 }
}
