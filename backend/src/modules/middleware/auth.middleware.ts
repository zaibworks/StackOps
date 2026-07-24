import type { NextFunction,Request,Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface TokenPayload {
    userId: number;
}

interface CustomRequest extends Request {
    user: TokenPayload
}


const authMiddleware = (req:CustomRequest, res:Response, next:NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
 
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid authorization header" });
    }

    const token = parts[1];
    
    if(!token){
      throw new Error("Token is not present")
    }

    const jwtSecret = process.env.JWT_SECRET;

    if(!jwtSecret){
      throw new Error("JWT Secret is not available")
    }

    const decoded = jwt.verify(token, jwtSecret)

    if (typeof decoded === "string") {
    throw new Error("Decoded is not string bro")
      }
    
   req.user = decoded as TokenPayload;

    return next();

  } catch (error) {
    if(error instanceof Error){
      return res.status(401).json({ message: error.message });
    }
  }
};

export default authMiddleware;
