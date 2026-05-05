import getCurrenUser from "./user.service.js";

const getMe = async(req,res)=>{
    try{
        const userId = req.user.userId;

        const user = await getCurrentUser(userId)
         res.json(user)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

export default getMe