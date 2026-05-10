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

export const inviteMember = async(inviterUserId, workspaceId, email, role)=>{
     
}