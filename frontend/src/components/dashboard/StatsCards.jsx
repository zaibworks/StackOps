import React from 'react'
import { FolderKanban,Users,CheckSquare,Activity } from 'lucide-react'

const StatsCards = ({mystats}) => {
  return (
<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

  {/* Workspaces */}
  <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-4 transition-colors duration-200 hover:border-cyan-500/30 hover:bg-zinc-900/70">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/15 bg-cyan-500/10 text-cyan-400">
          <FolderKanban size={17} />
        </div>
        <span className="text-sm font-medium text-zinc-400">
          Workspaces
        </span>
      </div>

      <span className="rounded-md border border-zinc-800 bg-zinc-950/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        Total
      </span>
    </div>

    <div className="mt-4 flex items-end justify-between">
      <h2 className="text-3xl font-semibold leading-none tracking-tight text-zinc-100">
        {mystats.totalWorkspaces}
      </h2>

      <div className="flex h-7 items-end gap-1 opacity-80">
        {[3, 5, 4, 7, 5, 8].map((height, index) => (
          <span
            key={index}
            style={{ height: `${height * 3}px` }}
            className="w-1 rounded-full bg-cyan-400/60"
          />
        ))}
      </div>
    </div>

    <p className="mt-3 text-xs text-zinc-500">
      Workspaces you belong to
    </p>
  </div>


  {/* Owned Workspaces */}
  <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-4 transition-colors duration-200 hover:border-orange-500/30 hover:bg-zinc-900/70">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-orange-500/15 bg-orange-500/10 text-orange-400">
          <Users size={17} />
        </div>
        <span className="text-sm font-medium text-zinc-400">
          Owned
        </span>
      </div>

      <span className="rounded-md border border-zinc-800 bg-zinc-950/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        Admin
      </span>
    </div>

    <div className="mt-4 flex items-end justify-between">
      <h2 className="text-3xl font-semibold leading-none tracking-tight text-zinc-100">
        {mystats.ownedWorkspaces}
      </h2>

      <div className="flex h-7 items-end gap-1 opacity-80">
        {[4, 6, 3, 7, 5, 8].map((height, index) => (
          <span
            key={index}
            style={{ height: `${height * 3}px` }}
            className="w-1 rounded-full bg-orange-400/60"
          />
        ))}
      </div>
    </div>

    <p className="mt-3 text-xs text-zinc-500">
      Workspaces you manage
    </p>
  </div>


  {/* Assigned Tasks */}
  <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-4 transition-colors duration-200 hover:border-zinc-600 hover:bg-zinc-900/70">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700/70 bg-zinc-800/70 text-zinc-300">
          <CheckSquare size={17} />
        </div>
        <span className="text-sm font-medium text-zinc-400">
          Assigned Tasks
        </span>
      </div>

      <span className="rounded-md border border-zinc-800 bg-zinc-950/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        Tasks
      </span>
    </div>

    <div className="mt-4 flex items-end justify-between">
      <h2 className="text-3xl font-semibold leading-none tracking-tight text-zinc-100">
        {mystats.assignedTasks}
      </h2>

      <div className="flex h-7 items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
        <span className="text-[11px] text-zinc-500">Overview</span>
      </div>
    </div>

    <p className="mt-3 text-xs text-zinc-500">
      Tasks assigned to you
    </p>
  </div>


  {/* Activity */}
  <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-4 transition-colors duration-200 hover:border-emerald-500/30 hover:bg-zinc-900/70">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/10 text-emerald-400">
          <Activity size={17} />
        </div>
        <span className="text-sm font-medium text-zinc-400">
          Activity
        </span>
      </div>

      <span className="rounded-md border border-zinc-800 bg-zinc-950/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        Total
      </span>
    </div>

    <div className="mt-4 flex items-end justify-between">
      <h2 className="text-3xl font-semibold leading-none tracking-tight text-zinc-100">
        {mystats.totalActivities}
      </h2>

      <div className="flex h-7 items-end gap-1 opacity-80">
        {[3, 5, 4, 7, 4, 8].map((height, index) => (
          <span
            key={index}
            style={{ height: `${height * 3}px` }}
            className="w-1 rounded-full bg-emerald-400/60"
          />
        ))}
      </div>
    </div>

    <p className="mt-3 text-xs text-zinc-500">
      Recorded workspace activities
    </p>
  </div>

</div>
  )
}

export default StatsCards
