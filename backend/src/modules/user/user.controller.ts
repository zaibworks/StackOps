import {getCurrentUser,getUserOverview,getMyStats} from "./user.service.js";
import type { AuthenticatedReq } from "../../types/auth.types.js";
import type {Response ,Request} from "express";

export const getMe = async(req:Request,res:Response)=>{
    try{
      if (!req.user) {
    throw new Error("Unauthorized");
}
      
        const userId = req.user.userId;

        const user = await getCurrentUser(userId)

        if (!user) {
  throw new Error("User not found");
}
         res.json(user)
    }catch(error){
      if(error instanceof Error){
        res.status(500).json({ message: error.message })
      }
    }
  }
        

export const getUserOverviewController =async(req:Request,res:Response)=>{
try{
    if (!req.user) {
    throw new Error("Unauthorized");
}
    const userId = req.user.userId
    const details = await getUserOverview(userId)
    console.log(details)
    res.json({message:"User details",data:details})
}catch(e){
  if(e instanceof Error){
    res.status(500).json({message:e.message})
  }
}
}
  

export const getMyStatsController = async (req:Request, res:Response) => {
  try {   
    if (!req.user) {
    throw new Error("Unauthorized");
}
    const userId = req.user.userId;
    const stats = await getMyStats(userId);
    res.status(200).json({ message: "Stats fetched", data: stats });
  } catch (e) {
    if(e instanceof Error){
      res.status(400).json({ message: e.message });
    }
  }
};

