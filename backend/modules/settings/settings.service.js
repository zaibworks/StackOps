import prisma from "../../src/db.js"
import  createActivity from "../../utils/createActivity.js"
import bcrypt from 'bcrypt'

export const updateProfileName = async (userId, name) => {
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

export const updatePassword = async(currentPassword,userId,newPassword)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:Number(userId)
        }
    })

    const isMatch = await bcrypt.compare(currentPassword,user.password)

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

export const deleteSelectedWorkspaces =  async(userId,workspaceIds)=>{
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

export const deleteSelectedTasks = async(userId,taskIds)=>{
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

export const deleteSelectedComments = async(userId,commentIds)=>{
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

export const deleteSelectedActivities = async(userId,activityIds)=>{
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

export const deleteUserAccount = async(userId,currentPassword)=>{
  
  if (!currentPassword.trim()) {
    throw new Error("Password is required");
}

  const user = await prisma.user.findUnique({
    where:{
      id:Number(userId)
    }
  })
   const passMatch = await bcrypt.compare(currentPassword,user.password)
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