import type { User } from "./user.types";

export interface Activity {
  id: number;
  action: string;
  userId: number;
  workspaceId: number;
  createdAt: string;
}

export interface ActivityWithUser extends Activity {
  user: User;
}