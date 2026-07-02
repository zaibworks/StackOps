import { updateProfileName } from "./settings.service.js";

export const updateProfileNameController = async (req,res)=>{
 try {
    const userId = req.user.userId
    const {name} = req.body
    const user = await updateProfileName(userId,name)
     res.status(200).json({message:"Name changed successfully",data:user})
 } catch (e) {
    res.status(400).json({message:e.message})
 }
}