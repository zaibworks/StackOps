import prisma from '../../src/db.js'

export const createWorkspace=(name,userId)=>{
return await prisma.workspace.create({
    name,
    members:{
        create:[{
            userId,
            role:'admin'

        }
        ]
    },
    includes:{
        members:true
    }
})
}