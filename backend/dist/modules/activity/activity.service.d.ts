export declare const getActivities: (userId: number) => Promise<({
    user: {
        email: string;
        id: number;
        name: string | null;
    };
    workspace: {
        id: number;
        name: string;
    };
} & {
    id: number;
    action: string;
    userId: number;
    workspaceId: number;
    createdAt: Date;
})[]>;
//# sourceMappingURL=activity.service.d.ts.map