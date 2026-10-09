import type { User } from "./user.types";

export type Role = "admin" | "member";

export interface Membership {
  id: number;
  userId: number;
  workspaceId: number;
  role: Role;
  createdAt: string;
  lastOpenedAt: string | null;
}

export interface MembershipWithUser extends Membership {
  user: User;
}