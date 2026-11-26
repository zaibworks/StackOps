import type { User } from "./user.types";

export interface Comment {
  id: number;
  content: string;
  taskId: number;
  userId: number;
  createdAt: string;
}

export interface CommentWithUser extends Comment {
  user: User;
}