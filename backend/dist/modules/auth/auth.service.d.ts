import type { SignupInput, LoginInput } from './auth.schema.js';
export declare const signup: ({ name, email, password }: SignupInput) => Promise<{
    message: string;
    user: {
        id: number;
        email: string;
        name: string | null;
        password: string | null;
    };
}>;
export declare const login: ({ email, password }: LoginInput) => Promise<{
    message: string;
    token: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map