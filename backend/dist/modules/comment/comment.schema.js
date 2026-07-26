import z from "zod";
export const commentSchema = z.object({
    content: z.string().trim().min(1, "Comment cannot be empty").max(250, "Comment is too long")
});
//# sourceMappingURL=comment.schema.js.map