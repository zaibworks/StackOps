import { signup, login } from './auth.service.js';
const signupController = async (req, res) => {
    try {
        const result = await signup(req.body);
        res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
const loginController = async (req, res) => {
    try {
        const result = await login(req.body);
        res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
export { signupController, loginController };
//# sourceMappingURL=auth.controller.js.map