import type { Request } from "express";
export interface TokenPayload {
    userId: number;
}
export interface AuthenticatedReq extends Request {
    user: TokenPayload;
}
export type GoogleUserInput = {
    googleId: string;
    email: string;
    name: string | null;
};
//# sourceMappingURL=auth.types.d.ts.map