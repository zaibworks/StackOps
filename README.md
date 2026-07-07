# StackOps

A multi-tenant project management SaaS built from scratch — workspaces, role-based access, task management, and activity tracking, designed the way real product teams work.

> Self-taught, built end-to-end (database schema, API, auth, and UI) as a portfolio project to demonstrate production-style engineering decisions, not just CRUD.

**[Live demo](#) · [Video walkthrough](#)**

---

## What is StackOps?

StackOps is a workspace-based project management tool, similar in spirit to Linear or Asana. Users create or join **workspaces** (multi-tenant orgs), get assigned a **role** (admin or member), and manage **tasks** with priorities, due dates, and assignees — all backed by an **activity feed** that tracks what happened and who did it.

It was built to show real backend and frontend decision-making: authorization logic, query design, state management, and the kind of debugging and tradeoffs that come up in an actual product, not a tutorial clone.

---

## Features

**Authentication & security**
- JWT-based auth with bcrypt password hashing
- Password-verified account deletion (re-enter password before permanent delete)
- Route-level and resource-level authorization (task creator or workspace admin only)

**Workspaces**
- Multi-tenant architecture — one user can belong to many workspaces with different roles in each
- Invite members, manage roles, leave or delete a workspace
- "Recently opened" tracking — workspaces you actually visit rise to the top of your dashboard, independent of when the data itself last changed

**Tasks**
- Full CRUD with priority, status, due dates, and assignment
- Server-side filtering (status, priority, assignee, workspace) and pagination
- Permission-aware UI — edit and delete controls only render for the task's creator or a workspace admin

**Comments & activity**
- Per-task comments
- Full activity audit log per workspace (who did what, and when)

**Settings**
- Profile updates (name, password)
- A single reusable, config-driven modal for bulk-managing workspaces, tasks, comments, and activities — one component, four data types, driven by a config object instead of four duplicated components
- Danger zone: permanent account deletion with password confirmation

**Dashboard**
- Live stats (total workspaces, owned workspaces, assigned tasks, total activity) fetched in parallel with `Promise.all` for faster load times
- Recently opened workspaces
- Consistent branded loading states and empty states across every page

---

## Tech stack

**Backend**
- Node.js + Express
- PostgreSQL (hosted on Neon)
- Prisma ORM
- Zod for request validation
- JWT + bcrypt for auth
- ESM modules

**Frontend**
- React
- React Router
- Tailwind CSS
- Axios
- Lucide icons

---

## Architecture highlights

A few decisions worth pointing out if you're reviewing this as a technical evaluator:

- **Config-driven UI over duplication.** The "manage workspaces / tasks / comments / activities" feature is one modal component driven by a config object (fetch function, delete function, label key, display name per resource type) rather than four near-identical components.
- **Data lives where it's owned.** "Recently opened" is tracked on the `Membership` model (per user, per workspace) rather than on `Workspace` itself — because "recent" is inherently a per-user concept, not a property of the workspace.
- **Parallel over sequential where it's safe.** Independent, read-only queries (e.g. dashboard stats) are batched with `Promise.all` instead of sequential `await` calls, since they don't depend on each other's results.
- **Pagination applied where it earns its keep.** The single-workspace task view stays simple (realistic task counts per workspace are small and the page already depends on the full task list for stats and filters); the cross-workspace "My Tasks" view — where task counts can genuinely grow large — is paginated server-side.
- **Authorization enforced server-side, reflected client-side.** Edit/delete controls are hidden in the UI for non-owners/non-admins, but the actual authorization check happens in the API — the UI hiding a button is a UX nicety, not the security boundary.

---

## Getting started

### Prerequisites
- Node.js (v18+)
- A PostgreSQL database (e.g. a free [Neon](https://neon.tech) instance)

### Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your_jwt_secret"
```

Run migrations and start the server:

```bash
npx prisma migrate dev
npm run dev
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## Project structure

```
backend/
  controllers/     # Request handling, calls services, shapes responses
  services/        # Business logic and Prisma queries
  routes/          # Express route definitions
  middleware/      # Auth, workspace membership, request validation
  prisma/          # Schema and migrations

frontend/
  src/
    pages/         # Route-level pages (Dashboard, Workspace, Settings, MyTasks...)
    components/    # Reusable UI (modals, cards, loaders, empty states)
    context/       # Auth and workspace context providers
    api/           # Axios instance and API config
```

---

## About this project

Built solo, end-to-end, as a self-taught developer working toward a backend/full-stack engineering role. Every module — schema design, API, auth, and frontend — was designed and debugged from scratch, including the kind of judgment calls (where to paginate, how to model per-user vs per-resource data, when to parallelize queries) that come up in real production work rather than tutorials.

**Contact:** [your email] · [LinkedIn] · [Portfolio]

