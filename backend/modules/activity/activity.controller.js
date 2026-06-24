import { getActivities } from "./activity.service.js";


export const getActivitiesController = async(req,res)=>{
  try {

    const userId = req.user.userId

    const activities = await getActivities(userId)

    res.status(200).json(activities)

  } catch (e) {
    res.status(500).json({
      message:e.message
    })
  }
}