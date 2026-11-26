export type Priority = "low" | "medium" | "high";

export type Status = "todo" | "inprogress" | "done";

export interface Task {
  id: number;
  title: string;
  content: string | null;
  completed: boolean;
  dueDate: string | null;
  priority: Priority;
  status: Status;
  userId: number;
  assignedToId: number | null;
  workspaceId: number;
  createdAt: string;
  updatedAt: string;
}