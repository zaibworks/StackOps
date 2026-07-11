import z from "zod";

export const taskSchema = z.object({
    title: z.string().trim().min(1,"Title is required").max(100,"Title cannot exceed 100 characters"),
    content: z.string().trim().max(1000,"Content is too long").optional().nullable(),
    completed: z.boolean().optional().default(false),
    dueDate : z.string().datetime().optional().nullable(),
    priority : z.enum(["low","medium","high"]).optional().default("medium"),
    status: z.enum(["todo", "inprogress", "done"]).optional().default("todo"),
    assignedToId: z.number().int().positive().optional().nullable(),
})

export const updateTaskSchema = z.object({
    title: z.string().trim().min(1,"Title is required").max(100,"Title cannot exceed 100 characters").optional(),
    content: z.string().trim().max(1000,"Content is too long").optional().nullable(),
    completed: z.boolean().optional(),
    dueDate: z.string().datetime().optional().nullable(),
    priority: z.enum(["low","medium","high"]).optional(),
    status: z.enum(["todo", "inprogress", "done"]).optional(),
    assignedToId: z.number().int().positive().optional().nullable(),
})