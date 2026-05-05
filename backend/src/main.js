import express from 'express'
import authRoutes from '../modules/auth/auth.routes.js'
import userRoutes from '../modules/user/user.routes.js'

const app = express()
const PORT = 3000;

app.use(express.json())

app.use('/auth', authRoutes)
app.use('user',userRoutes)

app.get('/',(req,res)=>{
  res.send('Hey bro app is running')
})

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})