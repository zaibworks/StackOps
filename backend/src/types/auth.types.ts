import type { Request } from "express";

export interface TokenPayload {
    userId: number;
}

export interface AuthenticatedReq extends Request {
    user: TokenPayload
}