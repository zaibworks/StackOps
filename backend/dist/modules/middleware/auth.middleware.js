import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    console.log("Incoming cookies:", req.cookies);
    const token = req.cookies?.token;
    console.log("JWT status:", token ? "TOKEN FOUND" : "TOKEN MISSING");
    if (!token) {
        return res.status(401).json({
            message: "Token missing",
        });
    }
    try {
        const authHeader = req.headers.authorization;
        // use the Google auth cookie not anything else.
        const token = req.cookies?.token;
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
        req.user = decoded;
        return next();
    }
    catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map