import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../db.js'
import type { SignupInput,LoginInput } from './auth.schema.js'

export const signup = async ({name,email,password}:SignupInput)=>{

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

export const login = async ({email,password}:LoginInput)=>{
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        throw new Error('User not found')
    }

    const userPassword = user.password

    if(typeof userPassword !=="string"){
      throw new Error("Password must contain valid characters")
    }


    const isMatch = await bcrypt.compare(password,userPassword)

      if (!isMatch) {
    throw new Error('Invalid password')
  }

  const secretKey =  process.env.JWT_SECRET
if(!secretKey){
  throw new Error("Secret key is not available")
}

  const token = jwt.sign(
    {userId:user.id},
    secretKey
  )

      return {
    message: "Login successful",
    token
  }
}