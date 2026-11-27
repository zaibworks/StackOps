import type { SignupInput, LoginInput } from './auth.schema.js';
import type { GoogleUserInput } from '../../types/auth.types.js';
export declare const signup: ({ name, email, password }: SignupInput) => Promise<{
    message: string;
    user: {
        id: number;
        email: string;
        name: string | null;
        password: string | null;
        googleId: string | null;
    };
}>;
export declare const login: ({ email, password }: LoginInput) => Promise<{
    message: string;
    user: {
        id: number;
        name: string | null;
        email: string;
    };
    token: string;
}>;
export declare const continueWithGoogle: ({ googleId, email, name }: GoogleUserInput) => Promise<{
    user: {
        id: number;
        email: string;
        name: string | null;
        password: string | null;
        googleId: string | null;
    };
    token: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map