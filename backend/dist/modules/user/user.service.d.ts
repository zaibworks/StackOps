export declare const getCurrentUser: (userId: number) => Promise<{
    email: string;
    id: number;
    name: string | null;
} | null>;
export declare const getUserOverview: (userId: number) => Promise<({
    tasks: {
        assignedToId: number | null;
        status: import("@prisma/client").$Enums.Status;
        userId: number;
    }[];
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const getMyStats: (userId: number) => Promise<{
    totalWorkspaces: number;
    ownedWorkspaces: number;
    assignedTasks: number;
    totalActivities: number;
}>;
//# sourceMappingURL=user.service.d.ts.map