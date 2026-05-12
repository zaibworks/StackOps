import prisma from '../../src/db.js';

export const createWorkspace = async (name, userId) => {
  return await prisma.workspace.create({
    data: {
      name,

      members: {
        create: [
          {
            userId,
            role: 'admin'
          }
        ]
      }
    },

    include: {
      members: true
    }
  })
}

export const getMyWorkspace = async (userId)=>{
  return await prisma.workspace.findMany({
    where:{
        members:{
            some:{
                userId:userId
            }
        }
    },
    include:{
        members:true
    }
  })
}

export const inviteMember = async(userId, workspaceId, email, role)=>{
  const parsedWorkspaceId = parseInt(workspaceId)

     const  admin = await prisma.membership.findFirst({
      where:{
        userId,
       workspaceId: parsedWorkspaceId,
        role:'admin'
      }
     })
     if (!admin) {
  throw new Error("Cannot invite: User is not admin")
}
     const invitedUser = await prisma.user.findUnique({
       where:{
        email
       }
     })
     if (!invitedUser) {
  throw new Error("User do not exist")
}

const existingMember = await prisma.membership.findUnique({
  where:{
    userId_workspaceId:{
      userId:invitedUser.id,
      workspaceId: parsedWorkspaceId
    }
  }
})
if (existingMember) {
 throw new Error("User is already a member")
}

const newMember = await prisma.membership.create({
  data:{
   userId:invitedUser.id,
   workspaceId:parsedWorkspaceId,
   role
  }
})
return newMember
}

export const getMembers =async ()=>{

}