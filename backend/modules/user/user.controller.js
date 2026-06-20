import {getCurrentUser,getUserOverview} from "./user.service.js";

export const getMe = async(req,res)=>{
    try{
        const userId = req.user.userId;

        const user = await getCurrentUser(userId)
         res.json(user)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

export const getUserOverviewController =async(req,res)=>{
try{
    const userId = req.user.userId
    const details = await getUserOverview(userId)
    console.log(details)
    res.json({message:"User details",data:details})
}catch(e){
    res.status(500).json({message:e.message})
}
}
