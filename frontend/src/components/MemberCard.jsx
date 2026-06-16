import React from 'react'
import { useState } from 'react'
import { Settings,Pin,TrashIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'



const MemberCard = ({member,workspace,onClose,onMemberUpdate}) => {

  const {user} = useAuth()

 const [role, setRole] = useState(member.role)
 const [isEditingRole, setIsEditingRole] = useState(false)

const currentUserRole =
  workspace.members.find(
    m => m.user.id === user.id
  )?.role
 const isAdmin = currentUserRole === "admin"

 const isMySelf = user.id === member.user.id

 console.log("Logged User:", user)
console.log("Opened Member:", member.user)
console.log("isMySelf:", isMySelf)
console.log("Role:", currentUserRole)
console.log("isAdmin:", isAdmin)

 const assignedTasks = workspace?.tasks.filter(t=> t.assignedToId === member.user.id)
 const completedTasks = assignedTasks.filter(t=>t.status ==="done").length
 const pendingTasks = assignedTasks.length - completedTasks
 const completionRate = assignedTasks.length? Math.round(completedTasks/assignedTasks.length*100):0


 const handleClose=()=>{
    onClose()
 }
  return (
    <div onClick={handleClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
  <div onClick={(e)=>e.stopPropagation()}
  className="w-[400px] max-h-[90vh] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">

    {/* HEADER */}
    <div className="relative border-b border-zinc-800 px-6 py-5">

      <button
        onClick={onClose}
        className="absolute right-5 top-5 rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
      >
        ✕
      </button>

      <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
        Team Credential
      </p>

    </div>

    {/* BODY */}
    <div className="flex h-full flex-col px-6 py-5 mb-4">

      {/* AVATAR */}
      <div className="flex items-center gap-4 justify-between">

<div className='flex items-center gap-5'>
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-3xl font-bold text-orange-400">
          {member.user.name.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-bold text-zinc-100">
          {member.user.name}
        </h2>

</div>

        <span
          className={`mt-2 rounded-full px-4 py-1 text-xs font-medium
          ${
            member.role === "admin"
              ? "bg-red-500/10 text-red-400"
              : "bg-cyan-500/10 text-cyan-400"
          }`}
        >
          {member.role.toUpperCase()}
        </span>
      </div>

      {/* INFO */}
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Email
            </p>

            <p className="mt-1 truncate text-sm text-zinc-200">
              {member.user.email}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Joined
            </p>

            <p className="mt-1 text-sm text-zinc-200">
              {new Date(member.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="mt-5">

        <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
          Task Analytics
        </p>

        <div className="grid grid-cols-3 gap-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-3 text-center">
            <p className="text-xl font-bold text-zinc-100">
              {assignedTasks.length}
            </p>

            <p className="mt-1 text-[11px] text-zinc-500">
              Assigned
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-3 text-center">
            <p className="text-xl font-bold text-green-400">
              {completedTasks}
            </p>

            <p className="mt-1 text-[11px] text-zinc-500">
              Done
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-3 text-center">
            <p className="text-xl font-bold text-orange-400">
              {pendingTasks}
            </p>

            <p className="mt-1 text-[11px] text-zinc-500">
              Pending
            </p>
          </div>

        </div>

      </div>

      {/* Controls */}
      


{isAdmin && !isMySelf &&(
  <>
  <div className="pt-5">

        <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
          Controls section
        </p>
        <div className="grid grid-cols-2 gap-3">
     
          <button
            className="w-full flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-left text-sm text-zinc-300 hover:bg-zinc-800"
          >
             <Settings size={16}/>
             Role
          </button>

          <button
            className="w-full flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/20"
          >
             <TrashIcon size={16}/>
            Remove
          </button>
</div>
</div>
           </>
)}
{isMySelf&&(
  <div className="pt-5">

        <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
          Controls section
        </p>
   <button
            className="w-full flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/20"
          >
             <TrashIcon size={16}/>
            Leave Workspace
          </button>
  </div>
)}



    </div>

  </div>
</div>
  )
}

export default MemberCard
