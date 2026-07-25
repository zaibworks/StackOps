export declare const addComment: (userId: number, taskId: number, content: string) => Promise<{
    user: {
        id: number;
        name: string | null;
    };
} & {
    id: number;
    content: string;
    taskId: number;
    userId: number;
    createdAt: Date;
}>;
export declare const getComments: (taskId: number) => Promise<({
    user: {
        email: string;
        id: number;
        name: string | null;
    };
} & {
    id: number;
    content: string;
    taskId: number;
    userId: number;
    createdAt: Date;
})[]>;
export declare const deleteComment: (commentId: number, userId: number, workspaceId: number) => Promise<{
    id: number;
    content: string;
    taskId: number;
    userId: number;
    createdAt: Date;
}>;
//# sourceMappingURL=comment.service.d.ts.map