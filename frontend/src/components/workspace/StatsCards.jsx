import React from 'react'
import { CheckCircle2,UserX,Clock3 } from 'lucide-react'

const StatsCards = ({onFilter,workspace,mystats,setFilter}) => {

    const unassignedCount =
    workspace?.tasks?.filter((task) => !task.assignedTo).length || 0;

  const totalTasks = workspace?.tasks?.length || 0;

  const completedTasks =
    workspace?.tasks?.filter((task) => task.status === "done").length || 0;

  const completedPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const overdueCount =
    workspace?.tasks?.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "done",
    ).length || 0;

    
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* Overdue */}
              <button
                type="button"
                onClick={() =>
                  onFilter((prev) => ({
                    ...prev,
                    overdue: !prev.overdue,
                    unassigned: false,
                  }))
                }
                aria-pressed={setFilter.overdue}
                className={`min-w-0 rounded-xl border p-3 text-left transition-colors ${
                  setFilter.overdue
                    ? "border-rose-500/40 bg-rose-500/10"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-rose-500/30"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] text-zinc-500 sm:text-xs">
                    Overdue
                  </p>
                  <Clock3 size={15} className="shrink-0 text-rose-400" />
                </div>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-rose-400 sm:text-2xl">
                  {overdueCount}
                </h3>
              </button>

              {/* Unassigned */}
              <button
                type="button"
                onClick={() =>
                  onFilter((prev) => ({
                    ...prev,
                    unassigned: !prev.unassigned,
                    overdue: false,
                  }))
                }
                aria-pressed={setFilter.unassigned}
                className={`min-w-0 rounded-xl border p-3 text-left transition-colors ${
                  setFilter.unassigned
                    ? "border-orange-500/40 bg-orange-500/10"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-orange-500/30"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] text-zinc-500 sm:text-xs">
                    Unassigned
                  </p>
                  <UserX size={15} className="shrink-0 text-orange-400" />
                </div>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-orange-400 sm:text-2xl">
                  {unassignedCount}
                </h3>
              </button>

              {/* Completed */}
              <div className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] text-zinc-500 sm:text-xs">
                    Completed
                  </p>
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-emerald-400"
                  />
                </div>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-emerald-400 sm:text-2xl">
                  {completedPercentage}%
                </h3>
              </div>
            </div>
  )
}

export default StatsCards
