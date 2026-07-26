import { signup, login } from './auth.service.js';
import type { Request,Response } from 'express';

const signupController =async(req:Request,res:Response)=>{
    try{
      const result = await signup(req.body)
       res.json(result)
    }catch(error){
      if(error instanceof Error){
        res.status(400).json({ message: error.message })
      }
    }
  }


const loginController = async (req:Request, res:Response) => {
  try {
   const result = await login(req.body)
   res.json(result)

  } catch (error) {
    if(error instanceof Error){
      res.status(400).json({ message: error.message })
    }
  }
}


export {signupController,loginController}
