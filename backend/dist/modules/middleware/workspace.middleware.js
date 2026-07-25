import prisma from "../../db.js";
export const workspaceMemberMiddlware = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized");
        }
        const workspaceParams = req.params.workspaceId;
        if (typeof workspaceParams !== "string") {
            return res.status(400).json({
                message: "Invalid workspaceId"
            });
        }
        const workspaceId = parseInt(workspaceParams);
        const userId = req.user.userId;
        const member = await prisma.membership.findFirst({
            where: {
                userId: userId,
                workspaceId: workspaceId
            }
        });
        if (!member) {
            return res.status(403).json({ message: "You are not a member of this workspace" });
        }
        next();
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ message: e.message });
        }
    }
};
//# sourceMappingURL=workspace.middleware.js.map