import prisma from '../../src/db.js';

export const createWorkspace = async (name, userId) => {
  const existingWorkspace =
  await prisma.workspace.findFirst({
    where: {
      name,
      members:{
        some:{
          userId
        }
      }
    }
  })

if (existingWorkspace) {
  throw new Error(
    'Workspace already exists'
  )
}
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
      some:{ userId }
    }
  },
  include:{
    _count:{
      select:{
        members:true
      }
    },
    members:{
      where:{
        userId
      },
      select:{
        role:true
      }
    }
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

export const getWorkspaceMembers =async (workspaceId)=>{
const allUsers = await prisma.membership.findMany({
  where:{workspaceId},
  include:{
    user:{
      select:{
        id:true,
        name:true,
        email:true
      }
    }
  }
})

return allUsers
}

export const removeMember = async(adminId,workspaceId,membershipId)=>{
  const admin = await prisma.membership.findFirst({
    where:{
      userId:adminId,
      workspaceId:workspaceId,
      role:'admin'
    }
  })
  if(!admin){
    throw new Error('Not allowed: You are not the admin')
  }
  const member = await prisma.membership.findUnique({
    where:{
      id: membershipId
    }
  })
  if(!member){
    throw new Error('Member do not exist')
  }
  
  if(member.userId ===adminId){
    throw new Error ('Can not remove yourself')
  }
  const deleteMember = await prisma.membership.delete({
    where:{
      id:membershipId
    }
  })

  return deleteMember
}

export const updateWorkspace = async(adminId,workspaceId,name)=>{
      const admin = await prisma.membership.findFirst({
    where:{
      userId:adminId,
      workspaceId:workspaceId,
      role:'admin'
    }
  })

  if(!admin){
    throw new Error('Not allowed: You are not the admin')
  }

  const updateName = await prisma.workspace.update({
  where:{
    id:workspaceId
  },data:{
    name:name
  }
  })

  return updateName
}

export const getWorkspacebyId = async(userId,workspaceId)=>{
 return await  prisma.workspace.findUnique({
  where:{id:workspaceId},
  include: {
  members: {
    include: {
      user: {select: { id: true, name: true, email: true }}
    }},
  tasks: {select: { id: true, title: true, status: true }}
}
 })
}

export const leaveWorkspace = async(userId,workspaceId)=>{
  
}