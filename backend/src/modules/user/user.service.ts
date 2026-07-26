import prisma from "../../db.js"

export const getCurrentUser = async (userId:number)=>{

    const user = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            id:true,
            email:true,
            name:true
        }
    })
      return user
}

export const getUserOverview =async(userId:number)=>{
return await prisma.workspace.findMany({
  where:{
      members:{
        some:{userId}
      }
  },include:{
    tasks:{
      select:{
        userId:true,
        assignedToId:true,
        status:true
      }
    }
  }
})
}
export const getMyStats = async (userId:number) => {
  const [totalWorkspaces, ownedWorkspaces, assignedTasks, totalActivities] = await Promise.all([
    prisma.membership.count({
      where: { userId: Number(userId) }
    }),
    prisma.membership.count({
      where: { userId: Number(userId), role: 'admin' }
    }),
    prisma.task.count({
      where: { assignedToId: Number(userId) }
    }),
    prisma.activity.count({
      where: { userId: Number(userId) }
    })
  ]);

  return {
    totalWorkspaces,
    ownedWorkspaces,
    assignedTasks,
    totalActivities
  };
};