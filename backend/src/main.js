import express from 'express'
import authRoutes from '../modules/auth/auth.routes.js'
import userRoutes from '../modules/user/user.routes.js'
import taskRoutes from '../modules/task/task.routes.js'
import workspaceRoutes from '../modules/workspace/workspace.routes.js'
import prisma from './db.js'

const app = express()
const PORT = 3000;

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user',userRoutes)
app.use('/task',taskRoutes)
app.use('/workspace',workspaceRoutes)

app.get('/', async(req,res)=>{
 const allUsers = await prisma.user.findMany({
  select:{
    name:true,
    email:true
  }
 })
 res.json(allUsers)
})

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})