import express from 'express'

const app = express()
const PORT = 3000;

app.use(express.json())

app.get('/',(req,res)=>{
  res.send('Hey bro app is running')
})

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})