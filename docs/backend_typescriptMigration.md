# createActivity.ts

## Purpose
Creates an activity log after CRUD operations.

## Converted
- .js → .ts
- Added interface for function parameter.
- Added Promise<void> return type.

## Topics Learned
- Interface
- Object parameter typing
- Promise<void>
- Async return types
--------------------------------------------------------

# db.ts

## Purpose
Creates and exports a single Prisma Client instance connected to the PostgreSQL database using the Prisma Neon Adapter.

## Converted
- .js → .ts
- Added runtime check for `DATABASE_URL`.
- Used TypeScript type inference instead of unnecessary explicit types.
- Kept `.js` import extensions (NodeNext + ESM).

## Topics Learned
- Type Inference
- Environment Variables (`string | undefined`)
- Type Narrowing
- Prisma Client
- NodeNext ESM Import Rules
-----------------------------------------------------

# auth.middleware.ts

## Purpose
Verifies the JWT token sent by the client. If the token is valid, extracts the payload and attaches it to the request so protected routes can identify the authenticated user.

## Converted
- .js → .ts
- Added `Request`, `Response`, and `NextFunction` types from Express.
- Added runtime checks for:
  - Missing Authorization header.
  - Invalid Bearer token format.
  - Missing JWT token.
  - Missing `JWT_SECRET`.
- Created a custom `TokenPayload` interface to describe the decoded JWT payload.
- Learned why `jwt.verify()` returns `string | JwtPayload` instead of only the payload.
- Understood that `jwt.sign()` returns a **token**, while `jwt.verify()` returns the **decoded payload**.
- Started using Declaration Merging (instead of a custom request interface) to add `req.user` to Express Request.

## Topics Learned
- Express Request Types
- JWT Authentication Flow
- JWT Token vs JWT Payload
- Type Narrowing
- Environment Variables (`string | undefined`)
- Custom Interfaces
- Declaration Merging (Module Augmentation)

## Notes
- `jwt.sign(payload, secret)` creates a token.
- The frontend stores and sends the token in the `Authorization` header.
- `jwt.verify(token, secret)` validates the token and returns only the original payload.
- `JWT_SECRET` is **never stored inside the token**. It is only used for signing and verification.
- `req.user` is not part of Express by default, so TypeScript must be told about it using Declaration Merging.

## Mistakes Faced
- Tried to store `JWT_SECRET` inside `TokenPayload` (incorrect).
- Thought `jwt.verify()` returned the token instead of the decoded payload.
- Created `CustomRequest` with `userId` instead of `user`.
- Forgot that `process.env.JWT_SECRET` can be `undefined`.
-----------------------------------------------------------------

# workspaceMember.middleware.ts

## Purpose
Checks whether the authenticated user is a member of the requested workspace before allowing access to protected workspace routes.

## Converted
- .js → .ts
- Added `Request`, `Response`, and `NextFunction` types from Express.
- Created a temporary custom request interface to access `req.user`.
- Used TypeScript type inference instead of unnecessary explicit types.
- Narrowed `req.params.workspaceId` from `string | string[] | undefined` to `string` before passing it to `parseInt()`.
- Narrowed the `catch` error from `unknown` to `Error` using `instanceof Error`.
- Returned a `400 Bad Request` for an invalid `workspaceId` instead of throwing an unexpected server error.

## Topics Learned
- Express Middleware Types
- Route Parameters
- Type Narrowing
- Type Inference
- `instanceof Error`
- HTTP Status Codes (400 vs 500)

## Mistakes Faced
- `req.params.workspaceId` was not guaranteed to be a string, so `parseInt()` produced a type error.
- Initially tried to throw an error for an invalid route parameter, but learned that invalid client input should return **400 Bad Request**.
- Learned that the `catch` variable has the type `unknown` and must be narrowed before accessing `error.message`.
- Temporarily used a custom request interface for `req.user`; this will later be replaced with **Declaration Merging** across the project.
---------------------------------------------------------------




