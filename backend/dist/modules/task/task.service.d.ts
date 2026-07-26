import type { CreateTaskInput, UpdateTaskInput } from "./task.schema.js";
import type { GetMytaskTypes } from "../../types/task.types.js";
export declare const createTask: (userId: number, workspaceId: number, taskData: CreateTaskInput) => Promise<{
    id: number;
    title: string;
    content: string | null;
    completed: boolean;
    dueDate: Date | null;
    priority: import("@prisma/client").$Enums.Priority;
    status: import("@prisma/client").$Enums.Status;
    userId: number;
    assignedToId: number | null;
    workspaceId: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateTask: (taskId: number, userId: number, taskData: UpdateTaskInput, workspaceId: number) => Promise<{
    id: number;
    title: string;
    content: string | null;
    completed: boolean;
    dueDate: Date | null;
    priority: import("@prisma/client").$Enums.Priority;
    status: import("@prisma/client").$Enums.Status;
    userId: number;
    assignedToId: number | null;
    workspaceId: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteTask: (userId: number, workspaceId: number, taskId: number) => Promise<{
    id: number;
    title: string;
    content: string | null;
    completed: boolean;
    dueDate: Date | null;
    priority: import("@prisma/client").$Enums.Priority;
    status: import("@prisma/client").$Enums.Status;
    userId: number;
    assignedToId: number | null;
    workspaceId: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getMyTasks: ({ userId, page, limit, filter, status, workspaceId }: GetMytaskTypes) => Promise<{
    tasks: ({
        workspace: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        title: string;
        content: string | null;
        completed: boolean;
        dueDate: Date | null;
        priority: import("@prisma/client").$Enums.Priority;
        status: import("@prisma/client").$Enums.Status;
        userId: number;
        assignedToId: number | null;
        workspaceId: number;
        createdAt: Date;
        updatedAt: Date;
    })[];
    total: number;
    totalPages: number;
}>;
//# sourceMappingURL=task.service.d.ts.map