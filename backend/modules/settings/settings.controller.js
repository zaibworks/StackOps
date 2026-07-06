import { 
    updateProfileName, 
    updatePassword,
    deleteSelectedWorkspaces,
    deleteSelectedTasks,
    deleteSelectedComments,
    deleteSelectedActivities,
    deleteUserAccount,
    getOwnedWorkspaces,
    getMyTasks,
    getMyComments,
    getMyActivities

} from "./settings.service.js";

export const updateProfileNameController = async (req,res)=>{
 try {
    const userId = req.user.userId
    const {name} = req.body
    const user = await updateProfileName(userId,name)
     res.status(200).json({message:"Name changed successfully",data:user})
 } catch (e) {
    res.status(400).json({message:e.message})
 }
}

export const updatePasswordController = async(req,res)=>{
    try {
        const userId = req.user.userId
        const {currentPassword,newPassword} = req.body
        const user = await updatePassword(currentPassword,userId,newPassword)
         res.status(200).json({message:"Password reset successfully",data:user})
    } catch (e) {
        res.status(400).json({message:e.message})
    }
}

export const deleteSelectedWorkspaceController =async(req,res)=>{
    try {
        const userId = req.user.userId
        const {workspaceIds} = req.body
        const workspace = await deleteSelectedWorkspaces(userId,workspaceIds)
          res.status(200).json({message:"Workspaces deleted successfully"})
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}

export const deleteSelectedTasksController = async(req,res)=>{
    try {
         const userId = req.user.userId
          const {taskIds} = req.body
          const tasks = await deleteSelectedTasks(userId,taskIds)
         res.status(200).json({message:"Tasks deleted successfully"})
    } catch (e) {
         res.status(500).json({message:e.message})
    }
}

export const deleteSelectedCommentsController = async(req,res)=>{
    try {
         const userId = req.user.userId
          const {commentIds} = req.body
          const comment = await deleteSelectedComments(userId,commentIds)
         res.status(200).json({message:"Comments deleted successfully"})
    } catch (e) {
         res.status(500).json({message:e.message})
    }
}

export const deleteSelectedActivitiesController = async(req,res)=>{
    try {
         const userId = req.user.userId
          const {activityIds} = req.body
          const activities = await deleteSelectedActivities(userId,activityIds)
         res.status(200).json({message:"Activities deleted successfully"})
    } catch (e) {
         res.status(500).json({message:e.message})
    }
}

export const deleteUserAccountController = async(req,res)=>{
  try {
    const userId = req.user.userId
    const {currentPassword} = req.body
    const removed = await deleteUserAccount(userId,currentPassword)
     res.status(200).json({message:"Account permanently deleted"})
  } catch (e) {
    res.status(402).json({message:e.message})
  }
}


export const getOwnedWorkspacesController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const workspaces = await getOwnedWorkspaces(userId);

    res.status(200).json({
      message: "Owned workspaces fetched successfully",
      data: workspaces,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

export const getMyTasksController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tasks = await getMyTasks(userId);

    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

export const getMyCommentsController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const comments = await getMyComments(userId);

    res.status(200).json({
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};


export const getMyActivitiesController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const activities = await getMyActivities(userId);

    res.status(200).json({
      message: "Activities fetched successfully",
      data: activities,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};
