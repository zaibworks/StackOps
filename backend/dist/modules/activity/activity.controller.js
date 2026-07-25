import { getActivities } from "./activity.service.js";
export const getActivitiesController = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized");
        }
        const userId = req.user.userId;
        const activities = await getActivities(userId);
        res.status(200).json(activities);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ message: e.message });
        }
    }
};
//# sourceMappingURL=activity.controller.js.map