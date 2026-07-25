export declare const updateProfileName: (userId: number, name: string) => Promise<{
    id: number;
    email: string;
    name: string | null;
    password: string | null;
}>;
export declare const updatePassword: (currentPassword: string, userId: number, newPassword: string) => Promise<{
    id: number;
    email: string;
    name: string | null;
    password: string | null;
}>;
export declare const deleteSelectedWorkspaces: (userId: number, workspaceIds: number[]) => Promise<{
    deletedCount: number;
}>;
export declare const deleteSelectedTasks: (userId: number, taskIds: number[]) => Promise<{
    deletedCount: number;
}>;
export declare const deleteSelectedComments: (userId: number, commentIds: number[]) => Promise<{
    deletedCount: number;
}>;
export declare const deleteSelectedActivities: (userId: number, activityIds: number[]) => Promise<{
    deletedCount: number;
}>;
export declare const deleteUserAccount: (userId: number, currentPassword: string) => Promise<{
    id: number;
    email: string;
    name: string | null;
    password: string | null;
}>;
export declare const getOwnedWorkspaces: (userId: number) => Promise<{
    id: number;
    name: string;
}[]>;
export declare const getMyTasks: (userId: number) => Promise<{
    id: number;
    title: string;
}[]>;
export declare const getMyComments: (userId: number) => Promise<{
    content: string;
    id: number;
}[]>;
export declare const getMyActivities: (userId: number) => Promise<{
    action: string;
    createdAt: Date;
    id: number;
}[]>;
//# sourceMappingURL=settings.service.d.ts.map