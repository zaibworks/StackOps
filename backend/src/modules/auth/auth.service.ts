import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../db.js'
import type { SignupInput,LoginInput } from './auth.schema.js'
import type { GoogleUserInput } from '../../types/auth.types.js'


const generateAuthToken = (userId: number) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("Secret key is not available");
  }

  return jwt.sign(
    { userId },
    secretKey
  );
};

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

const token = generateAuthToken(user.id)

      return {
    message: "Login successful",
    token
  }
}


export const continueWithGoogle = async({googleId,email,name}:GoogleUserInput)=>{

    const userByGoogleId = await prisma.user.findUnique({
      where:{googleId}
    })

     if (userByGoogleId) {
  const token = generateAuthToken(userByGoogleId.id);

  return {
    user: userByGoogleId,
    token,
  };
}

  const existingUser = await prisma.user.findUnique({
          where:{email}
  })

   if (existingUser) {

  if (
    existingUser.googleId &&
    existingUser.googleId !== googleId
  ) {
    throw new Error(
      "This email is already linked to another Google account"
    );
  }

  const user = await prisma.user.update({
    where: { id: existingUser.id },
    data: { googleId },
  });

  const token = generateAuthToken(user.id);

  return {
    user,
    token,
  };
}

   const newUser = await prisma.user.create({
    data: {
      email,
      name,
      googleId,
      password: null,
    },
  });

  const token = generateAuthToken(newUser.id)

  return {
    user:newUser,
    token

  };

}