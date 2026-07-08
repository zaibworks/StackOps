import express from 'express'
import prisma from './db.js'
import authRoutes from '../modules/auth/auth.routes.js'
import userRoutes from '../modules/user/user.routes.js'
import taskRoutes from '../modules/task/task.routes.js'
import workspaceRoutes from '../modules/workspace/workspace.routes.js'
import commentRoutes from '../modules/comment/comment.routes.js'
import activityRoutes from '../modules/activity/activity.routes.js'
import settingsRoutes from '../modules/settings/settings.routes.js'
import cors from 'cors'

const app = express()
const PORT = 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://stack-b0jsbrle8-zaib1.vercel.app'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors())

app.use(express.json())


app.use('/auth', authRoutes)
app.use('/user',userRoutes)
app.use('/task',taskRoutes)
app.use('/workspace',workspaceRoutes)
app.use('/comment',commentRoutes)
app.use('/activities',activityRoutes)
app.use('/settings',settingsRoutes)

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
    console.log(`Server is running on port ${PORT}`)
})