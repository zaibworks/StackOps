import { getActivities } from "./activity.service.js";
import type { AuthenticatedReq } from "../../types/auth.types.js";
import type { Response } from "express";



export const getActivitiesController = async(req:AuthenticatedReq,res:Response)=>{
  try {

    const userId = req.user.userId

    const activities = await getActivities(userId)

    res.status(200).json(activities)

  } catch (e) {
    if(e instanceof Error){
      res.status(500).json({ message:e.message})
    }
  }
}
