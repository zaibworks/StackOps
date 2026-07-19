import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../db.js'

export const signup = async ({name,email,password})=>{

    const existingUser = await prisma.user.findUnique({
        where:{
            email
        }
    })

     if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await bcrypt.hash(password,10)

  const user = await prisma.user.create({
    data:{
        name,
        email,
        password:hashedPassword
    }
  })

   return {
    message: "User created successfully",
    user
  }
}

export const login = async ({name,email,password})=>{
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password,user.password)

      if (!isMatch) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign(
    {userId:user.id},
    process.env.JWT_SECRET
  )

      return {
    message: "Login successful",
    token
  }
}