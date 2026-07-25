import { createTask, updateTask, deleteTask, getMyTasks } from "./task.service.js";
import { Status } from "@prisma/client";
export const createTaskController = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized");
        }
        const userId = req.user.userId;
        const workspaceParam = req.params.workspaceId;
        if (typeof workspaceParam !== "string") {
            throw new Error("Workspace Id is invalid");
        }
        const workspaceId = parseInt(workspaceParam);
        const task = await createTask(userId, workspaceId, req.body);
        res.json({ message: "Task created successfully", data: task });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ message: e.message });
        }
    }
};
export const updateTaskController = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized");
        }
        const { taskId } = req.params;
        if (typeof taskId !== "number") {
            throw new Error("TaskID is NAN");
        }
        const userId = req.user.userId;
        const workspaceParam = req.params.workspaceId;
        if (typeof workspaceParam !== "string") {
            throw new Error("Workspace Id is invalid");
        }
        const workspaceId = parseInt(workspaceParam);
        console.log(req.body);
        const result = await updateTask(taskId, userId, req.body, workspaceId);
        res.json({ message: "Task updated successfully", data: result });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ message: e.message });
        }
    }
};
export const deleteTaskController = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized");
        }
        const { taskId } = req.params;
        if (typeof taskId !== "number") {
            throw new Error("TaskID is NAN");
        }
        const userId = req.user.userId;
        const workspaceParam = req.params.workspaceId;
        if (typeof workspaceParam !== "string") {
            throw new Error("Workspace Id is invalid");
        }
        const workspaceId = parseInt(workspaceParam);
        const result = await deleteTask(userId, workspaceId, taskId);
        res.json(result);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ message: e.message });
        }
    }
};
export const getMyTasksController = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized");
        }
        const userId = req.user.userId;
        const filter = typeof req.query.filter === "string"
            ? req.query.filter
            : "all";
        const page = typeof req.query.page === "string"
            ? Number(req.query.page)
            : 1;
        const limit = typeof req.query.limit === "string"
            ? Number(req.query.limit)
            : 10;
        const workspaceId = typeof req.query.workspaceId === "string"
            ? Number(req.query.workspaceId)
            : undefined;
        const status = typeof req.query.status === "string"
            ? req.query.status
            : undefined;
        const params = {
            userId,
            page,
            limit,
            filter,
            ...(status !== undefined && { status }),
            ...(workspaceId !== undefined && { workspaceId })
        };
        const { tasks, total, totalPages } = await getMyTasks(params);
        res.json({ message: "All you tasks", data: tasks, totalPages, currentPage: page });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).json({ message: e.message });
        }
    }
};
//# sourceMappingURL=task.controller.js.map