import prisma from "../../src/db.js";

export const createTask = async ({ title, content, userId }) => {
  return await prisma.task.create({
    data: {
      title,
      content,
      userId
    }
  })
}

export const getTask=({userId})=>{
    return await prisma.task.findUnique({
        where:{
            userId:userId
        }
    })
}
