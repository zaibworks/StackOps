import React from 'react'
import { Users } from 'lucide-react'

const MemberListArea = ({workspace,onSelectMember}) => {
  return (
   <div className="flex min-h-[220px] flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 lg:min-h-0 lg:flex-1">
              <div className="border-b border-zinc-800 px-4 py-4 sm:px-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-100">
                      Members
                    </h2>
                    <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                      Workspace collaborators
                    </p>
                  </div>

                  <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1 text-xs tabular-nums text-zinc-400">
                    {workspace?.members?.length || 0}
                  </span>
                </div>
              </div>

              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3 custom-scrollbar sm:p-4">
                {workspace?.members?.length > 0 ? (
                  workspace.members.map((member) => (
                    <button
                      type="button"
                      onClick={() => onSelectMember(member)}
                      key={member.id}
                      className="flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 py-3 text-left transition-colors hover:border-zinc-700 hover:bg-zinc-950/80"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-500/15 bg-orange-500/10 text-sm font-semibold text-orange-400">
                          {member?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-zinc-200">
                            {member?.user?.name || "Unknown user"}
                          </p>
                          <p className="mt-0.5 text-xs capitalize text-zinc-500">
                            {member?.role || "Member"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-medium sm:text-xs ${
                          member?.role === "admin"
                            ? "bg-orange-500/10 text-orange-400"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {member?.role === "admin" ? "Owner" : "Member"}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="flex min-h-[150px] flex-col items-center justify-center text-center">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/70 text-zinc-500">
                      <Users size={18} />
                    </div>
                    <p className="text-sm text-zinc-300">No members found</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Workspace members will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
  )
}

export default MemberListArea
