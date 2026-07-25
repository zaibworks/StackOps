import type { Response, Request } from "express";
export declare const createWorkspaceController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyWorkspaceController: (req: Request, res: Response) => Promise<void>;
export declare const inviteMemberController: (req: Request, res: Response) => Promise<void>;
export declare const getWorkspaceMembersController: (req: Request, res: Response) => Promise<void>;
export declare const removeMemberController: (req: Request, res: Response) => Promise<void>;
export declare const updateWorkspaceController: (req: Request, res: Response) => Promise<void>;
export declare const getWorkspacebyIdController: (req: Request, res: Response) => Promise<void>;
export declare const leaveWorkspaceController: (req: Request, res: Response) => Promise<void>;
export declare const changeMemberRoleController: (req: Request, res: Response) => Promise<void>;
export declare const deleteWorkspaceController: (req: Request, res: Response) => Promise<void>;
export declare const lastOpenedUpdatedController: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=workspace.controller.d.ts.map