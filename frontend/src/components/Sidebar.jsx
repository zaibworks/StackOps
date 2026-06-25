import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FolderKanban, CheckSquare, Activity, LogOut } from "lucide-react"

const Sidebar = ({ user, workspaces, onLogout }) => {
  const navigate = useNavigate()
  const [shoWorkspace, setshoWorkspace] = useState(false)
  

  return (
    <aside className="relative flex w-64 flex-col border-r border-zinc-800 bg-zinc-950/50">
      {/* Fixed welcome */}
      <div className="px-5 pt-5">
        <div className="mb-6 border-b border-zinc-800 pb-6">
          <p className="text-sm text-zinc-500">
            Welcome,
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-orange-400">
            {user?.name || "User"}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your workspaces efficiently
          </p>
        </div>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto px-5 pb-28 scrollbar-hide">
        <button
          onClick={() => setshoWorkspace((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200 cursor-pointer"
        >
          <span className="font-medium flex gap-x-2 items-center"><FolderKanban size={16} />Workspaces</span>

          <span
            className={`text-xs text-zinc-500 transition-transform duration-200 ${
              shoWorkspace ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {shoWorkspace && (
          <div className={`mt-2  max-h-[300px]  space-y-1 overflow-y-auto rounded-xl scrollbar-hide pl-3 transition-colors duration-300 hover:bg-zinc-900/30`}>
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer">
              All Workspaces
            </button>
            {workspaces.map((w) => (
              <button
                key={w.id}
                onClick={() => navigate(`/workspace/${w.id}`)}
                className="w-full truncate rounded-sm px-3 py-1.5 text-left text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer"
              >
                {w.name}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-1">
          <button className="flex w-full gap-x-2 items-center rounded-xl px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200 cursor-pointer">
           <CheckSquare size={14} /> My Tasks
          </button>

          <button onClick={()=>navigate('/activity')}
          className="flex w-full gap-x-2 items-center rounded-xl px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200 cursor-pointer">
            <Activity size={14} />Activity
          </button>
        </div>
      </nav>

      {/* Fixed logout */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 backdrop-blur-md">
        <div className="border-t border-zinc-800/80 pt-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-zinc-800/50 hover:text-red-400 bg-zinc-900/70 cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar