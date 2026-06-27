import { createTask,getTasks,updateTask,deleteTask,getMyTasks} from "./task.service.js";

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
      const { status, priority, assignedToId, page = 1, limit = 10 } = req.query
       const tasks = await getTasks(workspaceId,
        { status, priority, assignedToId: assignedToId ? parseInt(assignedToId) : undefined },
  { page: parseInt(page), limit: parseInt(limit) }
)
         res.json({ message:"Workspace Tasks",data:tasks})
   }catch(e){
    res.status(500).json({message:e.message})
   }
}

export const updateTaskController= async(req,res)=>{
 try{
   const { taskId } = req.params
   const userId = req.user.userId
   const workspaceId = parseInt(req.params.workspaceId)

   console.log(req.body)
   
   const result = await updateTask(taskId,userId,req.body,workspaceId)
   res.json({message:"Task updated successfully",data:result})
 }catch(e){
  res.status(400).json({message:e.message})
 }
}

export const deleteTaskController= async(req,res)=>{
   try{
    const {taskId} = req.params
    const userId = req.user.userId
    const workspaceId = parseInt(req.params.workspaceId)
    const result = await deleteTask(userId,workspaceId,taskId)
    res.json(result)
   }catch(e){
  res.status(400).json({
    message:e.message
  })

   }
}

export const getMyTasksController = async(req,res)=>{
  try {
     console.log("GET MY TASKS HIT")
    const userId = req.user.userId
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const {tasks,total,totalPages} = await getMyTasks(userId,page,limit)
    res.json({message:"All you tasks",data:tasks,totalPages,currentPage:page})
  } catch (e) {
       res.status(400).json({
    message:e.message
  })
  }
}
