import prisma from "../../src/db.js";

export const getCurrentUser = async (userId)=>{

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

export const getUserOverview =async(userId)=>{
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