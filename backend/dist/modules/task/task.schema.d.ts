import z from "zod";
export declare const taskSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    completed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    dueDate: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    priority: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
    }>>>;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        done: "done";
        inprogress: "inprogress";
        todo: "todo";
    }>>>;
    assignedToId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    completed: z.ZodOptional<z.ZodBoolean>;
    dueDate: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    priority: z.ZodOptional<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        done: "done";
        inprogress: "inprogress";
        todo: "todo";
    }>>;
    assignedToId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export type CreateTaskInput = z.infer<typeof taskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
//# sourceMappingURL=task.schema.d.ts.map