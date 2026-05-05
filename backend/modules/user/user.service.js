import prisma from "../../src/db.js";

const getCurrenUser = async (userId)=>{

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

export default getCurrenUser