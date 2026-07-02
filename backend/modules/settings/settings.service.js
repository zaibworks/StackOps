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