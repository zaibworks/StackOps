import z from "zod";
export declare const commentSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
export type CommentInput = z.infer<typeof commentSchema>;
//# sourceMappingURL=comment.schema.d.ts.map