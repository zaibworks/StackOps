import type { Request, Response } from 'express';
declare const signupController: (req: Request, res: Response) => Promise<void>;
declare const loginController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const googleLoginController: (req: Request, res: Response) => void;
declare const googleCallbackController: (req: Request, res: Response) => Promise<Response>;
export { signupController, loginController, googleLoginController, googleCallbackController };
//# sourceMappingURL=auth.controller.d.ts.map