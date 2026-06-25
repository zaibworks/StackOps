import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { CheckSquare, Clock3, AlertTriangle, CheckCircle2 } from "lucide-react";

const MyTasks = () => {
return (
<div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">

  <Navbar />

  <div className="flex flex-1 overflow-hidden">

    <Sidebar />

    <main className="flex-1 overflow-y-auto p-8 main-scrollbar">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          My Tasks
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Track all tasks assigned to you across workspaces
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 rounded-2xl border border-zinc-700">

        <div className="rounded-2xl p-5">
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <CheckSquare size={18} />
            Assigned
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            12
          </h2>
        </div>

        <div className="rounded-2xl p-5">
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <Clock3 size={18} />
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            5
          </h2>
        </div>

        <div className="rounded-2xl p-5">
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <AlertTriangle size={18} />
            Overdue
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            2
          </h2>
        </div>

        <div className="rounded-2xl p-5">
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <CheckCircle2 size={18} />
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            19
          </h2>
        </div>

      </div>

      {/* Search + Filters */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <input
          placeholder="Search task..."
          className="w-full md:w-80 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-orange-500"
        />

        <div className="flex gap-2 flex-wrap">

          <button className="rounded-xl border border-orange-500 bg-orange-500/10 px-4 py-2 text-sm">
            All
          </button>

          <button className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900">
            Todo
          </button>

          <button className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900">
            In Progress
          </button>

          <button className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900">
            Done
          </button>

        </div>

      </div>

      {/* Task Cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5 transition-all hover:border-orange-500 hover:bg-zinc-900/40">

          <div className="flex items-start justify-between">

            <h3 className="text-lg font-semibold">
              Fix Login Authentication
            </h3>

            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
              High
            </span>

          </div>

          <p className="mt-3 text-sm text-zinc-500">
            Workspace: StackOps
          </p>

          <div className="mt-4 flex items-center gap-3">

            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
              In Progress
            </span>

            <span className="text-xs text-zinc-500">
              Due: 28 Jun 2026
            </span>

          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Assigned by: MrZaib
          </p>

        </div>

        <div className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5 transition-all hover:border-orange-500 hover:bg-zinc-900/40">

          <div className="flex items-start justify-between">

            <h3 className="text-lg font-semibold">
              Create Dashboard Charts
            </h3>

            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
              Medium
            </span>

          </div>

          <p className="mt-3 text-sm text-zinc-500">
            Workspace: Analytics
          </p>

          <div className="mt-4 flex items-center gap-3">

            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
              Todo
            </span>

            <span className="text-xs text-zinc-500">
              Due: 30 Jun 2026
            </span>

          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Assigned by: Danny
          </p>

        </div>

      </div>

    </main>

  </div>

</div>
)
}
export default MyTasks