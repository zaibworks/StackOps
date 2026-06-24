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
memberships.map(m=>m.workspaceId)

return await prisma.activity.findMany({
  where:{
    workspaceId:{
      in: workspaceIds
    }
  },
  orderBy:{
    createdAt:"desc"
  },
  take:20
})
}