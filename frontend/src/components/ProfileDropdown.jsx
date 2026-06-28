import {LogOut,Settings,BriefcaseBusiness,CheckCircle2,ClipboardList,} from "lucide-react";
import { useState,useEffect } from "react";
import api from '../api/axios.js'
import {useAuth} from '../context/AuthContext.jsx'

const ProfileDropdown = ({onLogout,onSettings}) => {

  const [stats, setStats] = useState(null)

  const {user} = useAuth()

  useEffect(() => {
  const fetchStats = async () => {
    const res = await api.get('/user/overview')
     console.log("FULL RESPONSE", res.data)
    setStats(res.data.data)
  }

  fetchStats()
}, [])

const workspaceCount = stats?.length || 0

const allTasks =
  stats?.flatMap(workspace => workspace.tasks) || []

  const assignedTasks =
  allTasks.filter(
    task => task.assignedToId === user.id
  ).length

  const completedTasks =
  allTasks.filter(
    task =>
      task.assignedToId === user.id &&
      task.status === "done"
  ).length

  return (
    <div
      className="
      absolute right-0 top-14
      w-[340px]
      overflow-hidden
      rounded-3xl
      border border-zinc-800
      bg-zinc-950
      shadow-2xl
      z-50
      "
    >
      {/* Glow */}
      <div className="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Header */}
      <div className="relative border-b border-zinc-800 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
          Account
        </p>

        <div className="mt-5 flex flex-col items-center">
          <div
            className="
            flex h-20 w-20 items-center justify-center
            rounded-full
            border border-zinc-700
            bg-zinc-900
            text-4xl font-bold
            text-orange-400
            "
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <h2 className="mt-4 text-xl font-semibold text-zinc-100">
            {user?.name}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-zinc-800 px-5 py-4">
        <div className="space-y-3">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-500">
              <BriefcaseBusiness size={15} />
              <span>Workspaces</span>
            </div>

            <span className="font-medium text-zinc-100">
              {workspaceCount || 0}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-500">
              <ClipboardList size={15} />
              <span>Assigned Tasks</span>
            </div>

            <span className="font-medium text-zinc-100">
              {assignedTasks || 0}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-500">
              <CheckCircle2 size={15} />
              <span>Completed Tasks</span>
            </div>

            <span className="font-medium text-green-400">
              {completedTasks || 0}
            </span>
          </div>

        </div>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2">

         <button
          onClick={onLogout}
          className="
          flex w-full items-center gap-3
          rounded-xl
          border border-zinc-500/20
          bg-zinc-500/10
          px-4 py-3
          text-sm text-zinc-400
          transition
          hover:bg-zinc-500/20
          "
        >
          <Settings size={16} />
          Settings
        </button>

        <button
          onClick={onLogout}
          className="
          flex w-full items-center gap-3
          rounded-xl
          border border-red-500/20
          bg-red-500/10
          px-4 py-3
          text-sm text-red-400
          transition
          hover:bg-red-500/20
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;