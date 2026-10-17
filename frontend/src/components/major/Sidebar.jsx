import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FolderKanban, CheckSquare, Activity, LogOut,ChevronDown } from "lucide-react"
import api from "../../api/axios"

const Sidebar = ({ user, workspaces}) => {
  const navigate = useNavigate()
  const [shoWorkspace, setshoWorkspace] = useState(false)
  
const lastOpenedWorkspace = async (workspaceId)=>{
  console.log("Hitting API with:", workspaceId)
    const res = await api.patch(`/workspace/${workspaceId}/open`);
    console.log("Response:", res.data)
  return res.data;
}

const handleLogout = async () => {
  try {
    await api.post('/user/logout');
    setUser(null);~
    setWorkspaces([]);
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

  return (
    <aside className="relative flex w-60 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950/50">

  {/* ================= WELCOME ================= */}

  <div className="px-6 pt-6">

    <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 px-4 py-4">

      <p className="text-xs text-zinc-500">
        Welcome back,
      </p>

      <h2 className="mt-1 text-md font-semibold tracking-tight text-orange-400">
        {user?.name || "User"}
      </h2>

      <p className="mt-2 text-xs leading-6 text-zinc-500">
        Manage your workspaces efficiently
      </p>

    </div>

  </div>


  {/* ================= NAVIGATION ================= */}

  <nav className="flex-1 overflow-y-auto px-7 pt-7 pb-28 scrollbar-hide">

    <ul className="space-y-2">

      {/* Workspaces */}

      <li>

        <button
          type="button"
          onClick={() =>
            setshoWorkspace((prev) => !prev)
          }
          className="flex w-full items-center justify-between rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-left text-sm font-medium text-orange-400 transition-colors hover:bg-orange-500/15"
        >

          <span className="flex items-center  justify-start gap-2">
            <FolderKanban size={17} />

            <span className="text-xs">
              Workspaces
            </span>
          </span>

          <span
            className={`text-orange-500 transition-transform duration-200 ${
              shoWorkspace ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={16} />
          </span>

        </button>


        {/* Workspace dropdown */}

        {shoWorkspace && (
          <div className="mt-2 max-h-[300px] space-y-1 overflow-y-auto rounded-xl pl-3 scrollbar-hide">
            {workspaces.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => {
                  navigate(`/workspace/${w.id}`);
                  lastOpenedWorkspace(w.id);
                }}
                className="w-full truncate rounded-lg px-3 py-2 text-left text-xs text-zinc-500 transition-colors hover:bg-zinc-900/50 hover:text-zinc-300"
              >
                {w.name}
              </button>
            ))}

          </div>
        )}

      </li>


      {/* My Tasks */}

      <li>

        <button
          type="button"
          onClick={() => navigate("/mytasks")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-xs text-zinc-400 transition-colors hover:bg-zinc-900/60 hover:text-zinc-200"
        >

          <CheckSquare size={17} />

          <span>
            My Tasks
          </span>

        </button>

      </li>


      {/* Activity */}

      <li>

        <button
          type="button"
          onClick={() => navigate("/activity")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-xs text-zinc-400 transition-colors hover:bg-zinc-900/60 hover:text-zinc-200"
        >

          <Activity size={17} />

          <span>
            Activity
          </span>

        </button>

      </li>

    </ul>

  </nav>


  {/* ================= LOGOUT ================= */}

  <div className="absolute bottom-0 left-0 right-0 px-7 pb-6">

    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
    >

      <LogOut size={16} />

      <span>
        Logout
      </span>

    </button>

  </div>

</aside>
  )
}

export default Sidebar