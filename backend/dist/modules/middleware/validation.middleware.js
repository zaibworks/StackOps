export const validate = (schema, errorMessage = "Validation failed") => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: errorMessage,
                error: result.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message
                }))
            });
        }
        req.body = result.data;
        next();
    };
};
//# sourceMappingURL=validation.middleware.js.map