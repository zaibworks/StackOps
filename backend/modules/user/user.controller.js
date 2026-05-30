import {getCurrentUser} from "./user.service.js";

export const getMe = async(req,res)=>{
    try{
        const userId = req.user.userId;

        const user = await getCurrentUser(userId)
         res.json(user)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

