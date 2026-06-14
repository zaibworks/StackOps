import React from 'react'
import api from '../api/axios.js'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const InviteModal = ({workspaceId,onClose,onInviteSuccess}) => {
  const [inviteEmail, setinviteEmail] = useState("")
  const [inviteRole, setinviteRole] = useState("member")
  const [inviteError, setinviteError] = useState("")
  const [inviting, setInviting] = useState(false)

  const inviteMember = async()=>{
    if(!inviteEmail.trim()){
      return setinviteError("Email is required")
    }
    setinviteError("")
    setInviting(true)
    try{
         await api.post(`workspace/${workspaceId}/invite`,{
          email:inviteEmail,
          role:inviteRole
         })
         onInviteSuccess()
         setinviteEmail("")
         setinviteRole("member")
         onClose()
    }catch(e){
      setinviteError( e?.response?.data?.message || "Invite failed")
    }finally{
      setInviting(false)
    }
  }
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-3xl border border-zinc-800 backdrop-blur-lg shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">
            Invite Member
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Add a member to this workspace
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="space-y-5 p-5">

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            User Email
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            value={inviteEmail}
            onChange={(e) => setinviteEmail(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-zinc-700"
          />
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Role
          </label>
<div className='relative'>
          <select
            value={inviteRole}
            onChange={(e) => setinviteRole(e.target.value)}
            className="w-full rounded-2xl appearance-none border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-zinc-700"
          >
            <option value="member">
              Member
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

           <ChevronDown
    size={18}
    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
  />

</div>
        </div>

        {/* Error */}
        <div className="h-5">
          {inviteError && (
            <p className="text-sm text-red-400">
              {inviteError}
            </p>
          )}
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-zinc-800 px-5 py-4">

        <button
          onClick={onClose}
          className="rounded-xl border border-zinc-800 px-5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Cancel
        </button>

        <button
          disabled={inviting}
          onClick={inviteMember}
          className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {inviting ? "Inviting..." : "Invite Member"}
        </button>

      </div>

    </div>
  </div>
)
}

export default InviteModal
