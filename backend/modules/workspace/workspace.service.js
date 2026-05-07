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