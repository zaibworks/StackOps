interface activityType {
    userId: number;
    workspaceId: number;
    action: string;
}
declare const createActivity: ({ userId, workspaceId, action }: activityType) => Promise<void>;
export default createActivity;
//# sourceMappingURL=createActivity.d.ts.map