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

# validate.middleware.ts

## Purpose
Creates a reusable validation middleware for any Zod schema. It validates `req.body` before the request reaches the controller. If validation fails, it returns a `400 Bad Request`; otherwise, it replaces `req.body` with the validated data and calls `next()`.

## Converted
- .js → .ts
- Added `Request`, `Response`, `NextFunction`, and `RequestHandler` types from Express.
- Typed `errorMessage` as `string`.
- Typed `schema` as `ZodType<T>` using a Generic.
- Converted `validate()` into a Generic function (`<T>`) so it works with any Zod schema.
- Used `RequestHandler` as the return type because the function returns an Express middleware.
- Used `import type` for type-only imports.

## Topics Learned
- Generic Functions (`<T>`)
- `ZodType<T>`
- Type Inference
- Express `RequestHandler`
- Type-only Imports (`import type`)
- Middleware Factory Pattern

## Mistakes Faced
- Initially tried to place `<T>` on the variable (`const validate: <T>`) instead of on the function (`const validate = <T>(...)`).
- Thought the function should return `T`, but learned that `validate()` returns an Express middleware, so its return type is `RequestHandler`.
- Confused `result` with `result.data`. Learned that `safeParse()` always returns a result object, while only `result.data` changes based on the provided schema.
- Tried to think of Generics as a return type, but learned that they describe the relationship between the input schema and the validated output (`result.data`), not what the outer function returns.

## Pending
- Improve the schema type further with more specific Zod helper types if needed after learning advanced Zod typings.
---------------------------------------------------------

# *.schema.ts

## Purpose
Defines the validation rules for incoming request data using Zod. Each module has its own schema to validate request bodies before they reach the controller or service.

## Converted
- .js → .ts
- Exported TypeScript types using `z.infer<typeof schema>`.
- Followed TypeScript naming convention by using `PascalCase` for inferred types (e.g. `SignupInput`, `TaskInput`).
- Removed unnecessary imports where applicable.

## Topics Learned
- `z.infer`
- Type Inference
- Single Source of Truth
- Runtime Validation vs Compile-time Type Safety

## Mistakes Faced
- Initially thought `z.infer` types should be passed into `validate<T>()`.
- Learned that `validate()` already infers the type from the provided Zod schema automatically.
- Understood that `z.infer` is mainly used to create reusable TypeScript types for validated data in services, controllers, or other parts of the application.
- Learned that there is no need to manually create duplicate interfaces for request bodies because `z.infer` generates them directly from the Zod schema.

## Pending
- Use inferred types (`SignupInput`, `TaskInput`, `WorkspaceInput`, etc.) in service function parameters and other places where validated request objects are used.
-----------------------------------------------------------------

# workspace.service.ts

## Purpose
Handles all workspace-related business logic such as creating workspaces, inviting/removing members, updating workspace details, changing member roles, leaving/deleting workspaces, and retrieving workspace information. It communicates directly with the database through Prisma and records workspace activities.

## Converted
- .js → .ts
- Added types to all service function parameters.
- Used `CreateWorkspaceInput` from Zod schema instead of manually defining object types.
- Used Prisma `Role` enum instead of plain strings for member roles.
- Removed unnecessary `Number()` conversions where values were already `number`.
- Relied on Prisma's automatic type inference for queries and returned objects.
- Kept return types inferred instead of writing unnecessary explicit types.
- Removed unused imports and unnecessary type checks.

## Topics Learned
- Function Parameter Types
- Object Destructuring with Typed Objects
- Prisma Type Inference
- Prisma Generated Enums (`Role`)
- Type Narrowing with Null Checks
- Return Type Inference
- Object Property Shorthand

## Mistakes Faced
- Initially forgot to destructure `CreateWorkspaceInput`, causing the entire object to be treated as a single value instead of accessing its `name` property.
- Added unnecessary type narrowing for values that were already guaranteed by TypeScript.
- Used unnecessary `Number()` conversions even though parameters were already typed as `number`.
- Imported unused modules and types that were left over from the JavaScript version.
- Learned to trust Prisma's inferred types instead of manually writing types for query results.

## Key Learnings
- Only add type narrowing when a value actually has multiple possible types (e.g. `string | undefined` or `User | null`).
- Prisma automatically infers the types of query results, so manual annotations are usually unnecessary.
- Enums should be used instead of plain strings whenever possible to improve type safety.
- Object destructuring makes service parameters cleaner and easier to work with.
- TypeScript inference should be trusted whenever it already knows the correct type.

## Pending
- Apply the same TypeScript patterns to remaining service files.
- Reuse common request/object types where appropriate.
- Convert controllers to use typed request bodies and parameters.
-----------------------------------------------------------------










