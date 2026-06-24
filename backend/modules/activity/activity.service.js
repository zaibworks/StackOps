import prisma from "../../src/db.js";

export const getActivities = async(userId)=>{
    const memberships = await prisma.membership.findMany({
      where:{
        userId
      },select:{
        workspace:true
      }
    })
 const workspaceIds =
memberships.map(m=>m.workspace.id)

return await prisma.activity.findMany({
  where:{
    workspaceId:{
      in: workspaceIds
    }
  },include:{
    user:{
        select:{
            id:true,
            name:true,
            email:true
        }
    },
    workspace:{
        select:{
            id:true,
            name:true
        }
    }
  },
  orderBy:{
    createdAt:"desc"
  },
  take:20
})
}