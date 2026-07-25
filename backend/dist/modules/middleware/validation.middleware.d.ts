import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
export declare const validate: <T>(schema: ZodType<T>, errorMessage?: string) => RequestHandler;
//# sourceMappingURL=validation.middleware.d.ts.map