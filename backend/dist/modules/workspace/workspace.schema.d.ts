import { z } from 'zod';
export declare const createWorkspaceSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export declare const updateWorkspaceSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorksapceInput = z.infer<typeof updateWorkspaceSchema>;
//# sourceMappingURL=workspace.schema.d.ts.map