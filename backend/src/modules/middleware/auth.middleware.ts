import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { TokenPayload } from "../../types/auth.types.js";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // Prefer the existing Bearer token; otherwise use the Google auth cookie.
    const token =
      authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = decoded as TokenPayload;

    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;