import type { CreateWorkspaceInput, UpdateWorksapceInput } from './workspace.schema.js';
import { Role } from '@prisma/client';
export declare const createWorkspace: ({ name }: CreateWorkspaceInput, userId: number) => Promise<{
    members: {
        id: number;
        userId: number;
        workspaceId: number;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        lastOpenedAt: Date | null;
    }[];
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getMyWorkspace: (userId: number) => Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    members: {
        role: import("@prisma/client").$Enums.Role;
    }[];
    _count: {
        members: number;
        tasks: number;
    };
    tasks: {
        assignedToId: number | null;
        status: import("@prisma/client").$Enums.Status;
    }[];
}[]>;
export declare const inviteMember: (userId: number, workspaceId: number, email: string, role: Role) => Promise<{
    id: number;
    userId: number;
    workspaceId: number;
    role: import("@prisma/client").$Enums.Role;
    createdAt: Date;
    lastOpenedAt: Date | null;
}>;
export declare const getWorkspaceMembers: (workspaceId: number) => Promise<({
    user: {
        email: string;
        id: number;
        name: string | null;
    };
} & {
    id: number;
    userId: number;
    workspaceId: number;
    role: import("@prisma/client").$Enums.Role;
    createdAt: Date;
    lastOpenedAt: Date | null;
})[]>;
export declare const removeMember: (adminId: number, workspaceId: number, membershipId: number) => Promise<{
    id: number;
    userId: number;
    workspaceId: number;
    role: import("@prisma/client").$Enums.Role;
    createdAt: Date;
    lastOpenedAt: Date | null;
}>;
export declare const updateWorkspace: (adminId: number, workspaceId: number, { name }: UpdateWorksapceInput) => Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getWorkspacebyId: (userId: number, workspaceId: number) => Promise<({
    members: ({
        user: {
            email: string;
            id: number;
            name: string | null;
        };
    } & {
        id: number;
        userId: number;
        workspaceId: number;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        lastOpenedAt: Date | null;
    })[];
    tasks: ({
        assignedTo: {
            email: string;
            id: number;
            name: string | null;
        } | null;
        user: {
            email: string;
            id: number;
            name: string | null;
        };
    } & {
        id: number;
        title: string;
        content: string | null;
        completed: boolean;
        dueDate: Date | null;
        priority: import("@prisma/client").$Enums.Priority;
        status: import("@prisma/client").$Enums.Status;
        userId: number;
        assignedToId: number | null;
        workspaceId: number;
        createdAt: Date;
        updatedAt: Date;
    })[];
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare const leaveWorkspace: (userId: number, workspaceId: number) => Promise<{
    id: number;
    userId: number;
    workspaceId: number;
    role: import("@prisma/client").$Enums.Role;
    createdAt: Date;
    lastOpenedAt: Date | null;
}>;
export declare const changeMemberRole: (memberId: number, adminId: number, workspaceId: number, role: Role) => Promise<{
    id: number;
    userId: number;
    workspaceId: number;
    role: import("@prisma/client").$Enums.Role;
    createdAt: Date;
    lastOpenedAt: Date | null;
}>;
export declare const deleteWorkspace: (workspaceId: number, userId: number) => Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const lastOpenedUpdated: (userId: number, workspaceId: number) => Promise<void>;
//# sourceMappingURL=workspace.service.d.ts.map