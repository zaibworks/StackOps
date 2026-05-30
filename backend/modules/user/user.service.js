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

