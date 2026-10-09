import type { Membership } from "./membership.types";
import type { Task } from "./task.types";
import type { Activity } from "./activity.types";

export interface Workspace {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceWithMembers extends Workspace {
  members: Membership[];
}

export interface WorkspaceWithTasks extends Workspace {
  tasks: Task[];
}

export interface WorkspaceWithMembersAndTasks extends Workspace {
  members: Membership[];
  tasks: Task[];
}

export interface WorkspaceWithActivities extends Workspace {
  activities: Activity[];
}

export interface WorkspaceCount {
  members: number;
  tasks: number;
}