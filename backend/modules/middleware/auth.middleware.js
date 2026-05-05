import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next) =>{
try{
    const authHeader = req.headers.authorization

    if(!authHeader){
        res.status(401).json({message:'No token provided'})
    }
    const token = authHeader.split(" ")[1];
    
     console.log(token);

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = decoded
    next()
}catch (error) {
  console.log("VERIFY ERROR:", error.message)
  res.status(401).json({ message: error.message })
}
}

export default authMiddleware
