import prisma from "../../db.js";
import createActivity from "../../utils/createActivity.js";
import bcrypt from 'bcrypt'

export const updateProfileName = async (userId:number, name:string) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: Number(userId)
    }
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  if (!name.trim()) {
    throw new Error("Name is required");
  }

  if (name.trim() === currentUser.name) {
    throw new Error("New name must be different");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(userId)
    },
    data: {
      name: name.trim()
    }
  });

  return updatedUser;
};

export const updatePassword = async(currentPassword:string,userId:number,newPassword:string)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:Number(userId)
        }
    })
    const userPassword = user?.password
    if(!userPassword){
      throw new Error("Cannot compare password")
    }

    const isMatch = await bcrypt.compare(currentPassword,userPassword)

    if(!isMatch){
      throw new Error("Incorrect password")
    }
    if(currentPassword===newPassword){
        throw new Error("New password should be different from old password")
    }
   if (!currentPassword.trim() || !newPassword.trim()) {
  throw new Error("All fields are required");
}

     const hashedPassword = await bcrypt.hash(newPassword,10)

    const updatedPass = await prisma.user.update({
        where:{
            id:userId
        },data:{
            password:hashedPassword
        }
    })

    return updatedPass
}

export const deleteSelectedWorkspaces =  async(userId:number,workspaceIds:number[])=>{
  if(!workspaceIds || workspaceIds.length === 0){
    throw new Error("Select atleast one workspace")
   }

  const myWorkspaces = await prisma.membership.findMany({
    where:{
      userId,
      workspaceId:{
        in:workspaceIds
      },
      role:'admin'
    }
  })
  
  const myWorkspaceIds = myWorkspaces.map((m)=>m.workspaceId)

  if (myWorkspaceIds.length !== workspaceIds.length) {
    throw new Error("Some selected workspaces cannot be deleted");
}
if (myWorkspaceIds.length === 0) {
  throw new Error("No workspaces found");
}

 const deleted = await prisma.workspace.deleteMany({
           where:{
           id: {
  in: myWorkspaceIds
}
           }
 })
 return {
    deletedCount: deleted.count
}
}

export const deleteSelectedTasks = async(userId:number,taskIds:number[])=>{
  if(!taskIds || taskIds.length === 0){
    throw new Error("Select atleast one task")
  }
  const myTasks = await prisma.task.findMany({
    where:{
      id:{
        in:taskIds
      },
      userId
    }
  })
  const myTasksIds = myTasks.map(t=>t.id)

  if (myTasksIds.length === 0) {
  throw new Error("No tasks found");
}

if (myTasksIds.length !== taskIds.length) {
  throw new Error("Some selected tasks cannot be deleted");
}

  const deleted = await prisma.task.deleteMany({
    where:{
      id:{
        in:myTasksIds
      }
    }
  })

  return{
    deletedCount:deleted.count
  }
}

export const deleteSelectedComments = async(userId:number,commentIds:number[])=>{
    if(!commentIds || commentIds.length === 0){
    throw new Error("Select atleast one comment")
  }
  const myComments = await prisma.comment.findMany({
    where:{
      id:{
        in:commentIds
      },
      userId
    }
  })
  const myCommentIds = myComments.map(c=>c.id)

  if (myCommentIds.length === 0) {
  throw new Error("No comment found");
}

if (myCommentIds.length !== commentIds.length) {
  throw new Error("Some selected comments cannot be deleted");
}

  const deleted = await prisma.comment.deleteMany({
    where:{
      id:{
        in:myCommentIds
      }
    }
  })

  return{
    deletedCount:deleted.count
  }
}

export const deleteSelectedActivities = async(userId:number,activityIds:number[])=>{
  if(!activityIds || activityIds.length === 0){
    throw new Error("Select atleast one activity")
  }
  const myActivity = await prisma.activity.findMany({
    where:{
      id:{
        in:activityIds
      },
      userId
    }
  })
  const myActivityIds = myActivity.map(a=>a.id)

  if (myActivityIds.length === 0) {
  throw new Error("No activity found");
}

if (myActivityIds.length !== activityIds.length) {
  throw new Error("Some selected activities cannot be deleted");
}

  const deleted = await prisma.activity.deleteMany({
    where:{
      id:{
        in:myActivityIds
      }
    }
  })

  return{
    deletedCount:deleted.count
  }
}

export const deleteUserAccount = async(userId:number,currentPassword:string)=>{
  
  if (!currentPassword) {
    throw new Error("Password is required");
}

  const user = await prisma.user.findUnique({
    where:{
      id:Number(userId)
    }
  })
  const userPassword = user?.password
  if(!userPassword){
    throw new Error("User password is not updated correctly")
  }
   const passMatch = await bcrypt.compare(currentPassword,userPassword)
   if(!passMatch){
    throw new Error("Type correct password")
   }

   const deleted = await prisma.user.delete({
    where:{
      id:Number(userId)
    }
   })

   return deleted
}

export const getOwnedWorkspaces = async (userId:number) => {
  const workspaces = await prisma.membership.findMany({
    where: {
      userId: Number(userId),
      role: "admin",
    },
    select: {
      workspace: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return workspaces.map((m) => m.workspace);
};

export const getMyTasks = async (userId:number) => {
  return await prisma.task.findMany({
    where: {
      userId: Number(userId),
    },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getMyComments = async (userId:number) => {
  return await prisma.comment.findMany({
    where: {
      userId: Number(userId),
    },
    select: {
      id: true,
      content: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getMyActivities = async (userId:number) => {
  return await prisma.activity.findMany({
    where: {
      userId: Number(userId),
    },
    select: {
      id: true,
      action: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};