import type { NextFunction, Request, Response } from "express";
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map