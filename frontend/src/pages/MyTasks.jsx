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

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex gap-2 flex-wrap">

          <button className="rounded-xl border border-orange-500 bg-orange-500/10 px-4 py-2 text-sm">
            All
          </button>

          <button className="rounded-xl border border-zinc-800 px-7 py-2 text-sm hover:bg-zinc-900">
            CreatedByMe
          </button>

          <button className="rounded-xl border border-zinc-800 px-7 py-2 text-sm hover:bg-zinc-900">
             AssignedTome
          </button>

        </div>

<div className="flex gap-2 flex-wrap">

        <div className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900">
            Status
        </div>
        <div className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900">
            Workspace
        </div>
</div>

      </div>

      {/* Task Cards */}
      <div className="mt-8 flex-1 min-h-0 overflow-y-auto px-2 p-4 space-y-2 custom-scrollbar">

       <div className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 transition-all hover:border-zinc-800 hover:bg-zinc-900/40">

  <div className="flex items-center justify-between">

    <div className="min-w-0">
      <h3 className="truncate text-sm font-semibold text-zinc-100">
        Fix Login Authentication
      </h3>

      <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
        <span className="font-medium hover:text-zinc-300">📁 StackOps</span>

        <span>•</span>

        <span>In Progress</span>

        <span>•</span>

        <span>28 Jun</span>
      </div>
    </div>

    <span className=" px-2 py-1 text-[11px] font-medium text-red-500">
      High
    </span>

  </div>

</div>
       <div className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 transition-all hover:border-zinc-800 hover:bg-zinc-900/40">

  <div className="flex items-center justify-between">

    <div className="min-w-0">
      <h3 className="truncate text-sm font-semibold text-zinc-100">
        Fix task filter
      </h3>

      <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
        <span className="font-medium hover:text-zinc-300">📁 oxpress</span>

        <span>•</span>

        <span>Todo</span>

        <span>•</span>

        <span>01 Jun</span>
      </div>
    </div>

    <span className="px-2 py-1 text-[11px] font-medium text-red-500">
      High
    </span>

  </div>

</div>


      </div>

    </main>

  </div>

</div>
)
}
export default MyTasks