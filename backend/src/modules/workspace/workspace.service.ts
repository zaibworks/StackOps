import prisma from '../../db.js';
import createActivity from '../../utils/createActivity.js';
import type { CreateWorkspaceInput,UpdateWorksapceInput } from './workspace.schema.js';
import { Role } from '@prisma/client';

export const createWorkspace = async (name:string, userId:number) => {
  const existingWorkspace =await prisma.workspace.findFirst({
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
  const workspace = await prisma.workspace.create({
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

   await createActivity({
    userId,
    workspaceId: workspace.id,
    action: `Created workspace ${workspace.name}`
  })

  return workspace
}

export const getMyWorkspace = async (userId:number) => {
  const memberships = await prisma.membership.findMany({
    where: { userId },
    orderBy: { lastOpenedAt: 'desc' },
    select: {
      role: true,
      workspace: {
        include: {
          _count: {
            select: {
              members: true,
              tasks: true
            }
          },
          tasks: {
            select: {
              assignedToId: true,
              status: true
            }
          }
        }
      }
    }
  });

 return memberships.map((m) => ({
  ...m.workspace,
  members: [{ role: m.role }]}));
  }
   ;


export const inviteMember = async(userId:number, workspaceId:number, email:string, role:Role)=>{

     const  admin = await prisma.membership.findFirst({
      where:{
        userId,
       workspaceId,
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
      workspaceId
    }
  }
})
if (existingMember) {
 throw new Error("User is already a member")
}

const newMember = await prisma.membership.create({
  data:{
   userId:invitedUser.id,
   workspaceId,
   role
  }
})

await createActivity({
  userId,
  workspaceId,
  action: `Invited ${invitedUser.name} as ${role}`
})

return newMember
}

export const getWorkspaceMembers =async (workspaceId:number)=>{
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

export const removeMember = async(adminId:number,workspaceId:number,membershipId:number)=>{
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
    },include:{
      user:true
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

  const workspace = await prisma.workspace.findUnique({
  where:{
    id:workspaceId
  }
})
if(!workspace){
  throw new Error("Worksapce is unidentifiable")
}

  await createActivity({
  userId:adminId, 
  workspaceId:workspaceId,
  action: `Removed ${member.user.name} from ${workspace.name}`
})

  return deleteMember
}

export const updateWorkspace = async(adminId:number,workspaceId:number,name:string)=>{
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
  const workspace = await prisma.workspace.findUnique({
    where:{
      id:workspaceId
    }
  })
  if(!workspace){
    throw new Error("Workspace is unidentifiable")
  }

  const updateName = await prisma.workspace.update({
  where:{
    id:workspaceId
  },data:{
    name:name
  }
  })

   await createActivity({
  userId:adminId, 
  workspaceId:workspaceId,
  action: `Renamed workspace from ${workspace.name} to ${updateName.name}`
})
  

  return updateName
}

export const getWorkspacebyId = async(userId:number,workspaceId:number)=>{
 return await  prisma.workspace.findUnique({
  where:{id:workspaceId},
  include: {
  members: {
    include: {
      user: {select: { id: true, name: true, email: true }}
    }},
    tasks:{ orderBy:{updatedAt:'desc'},
      include:{
        assignedTo:{
          select:{
            id:true,
            name:true,
            email:true
          }
        },user:{
          select:{id:true,name:true,email:true}
        }
      }
    }
}
 })
}

export const leaveWorkspace = async(userId:number,workspaceId:number)=>{
        const membership = await prisma.membership.findFirst({
          where:{
            workspaceId:workspaceId,
            userId:userId
          },include:{
            user:true
          }
        })

         if(!membership){
    throw new Error(
      "You are not a member"
    )
  }

        const isAdmin = membership.role ==='admin'
        const adminCount =
  await prisma.membership.count({
    where:{
      workspaceId:Number(workspaceId),
      role:"admin"
    }
  })
  if(isAdmin && adminCount === 1){
    throw new Error('Transfer ownsership before leaving')
  }

  
  const workspace = await prisma.workspace.findUnique({
    where:{
      id:workspaceId
    }
  })

   if(!workspace){
    throw new Error("Workspace is unidentifiable")
  }

    await createActivity({
  userId, 
  workspaceId:workspaceId,
  action: `Left workspace ${workspace.name}`
})
  
  return await prisma.membership.delete({
    where:{
     id: membership.id
    }
   })
}

export const changeMemberRole = async(memberId:number,adminId:number,workspaceId:number,role:Role)=>{
         const admin = await prisma.membership.findFirst({
          where:{
            userId:adminId,
            workspaceId:workspaceId,
            role:'admin'
          }
         })

         const member = await prisma.membership.findFirst({
  where:{
    userId: memberId,
    workspaceId
  },
  include:{
    user:true
  }
})
 if(!member){
    throw new Error("Member is unidentifiable")
  }
          if(!admin){
    throw new Error('Not allowed: You are not the admin')
  }else if(adminId === memberId){
    throw new Error('You can not chagne your own role')
  }

 const update = await prisma.membership.update({
    where:{
    id:memberId,
    workspaceId:workspaceId
    },data:{
      role
    }
  })

   await createActivity({
  userId:adminId, 
  workspaceId:workspaceId,
  action: `Changed ${member.user.name}  role from ${member.role} to ${role}`
})
return update

}

export const deleteWorkspace = async(workspaceId:number,userId:number)=>{
     const isAdmin = await prisma.membership.findFirst({
      where:{
        userId,
        workspaceId,
        role:"admin"
      },include:{
        user:true,
        workspace:true
      }
     })
     if(!isAdmin){
      throw new Error("Not admin, You cannot delete this workspace")
     }

        await createActivity({
      userId:userId,
      workspaceId:workspaceId,
      action:`${isAdmin.user.name}  deleted workspace ${isAdmin.workspace.name}`
     })
     
     const deletetion = await prisma.workspace.delete({
      where:{
        id:workspaceId
      }
     })

     return deletetion
}

export const lastOpenedUpdated = async(userId:number,workspaceId:number)=>{
const updated = await prisma.membership.update({
  where: {
    userId_workspaceId: {   
      userId: Number(userId),
      workspaceId: Number(workspaceId)
    }
  },
  data: {
    lastOpenedAt: new Date()
  }
});

}