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
---------------------------------------------------------

