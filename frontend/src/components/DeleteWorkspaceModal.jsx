import React from 'react'
import { useState,useEffect } from 'react'
import api from '../api/axios.js'



const DeleteWorkspaceModal = ({isOpen,onClose,workspace,onDone,onSuccess}) => {

    const [error, setError] = useState("")
    const [deleting, setDeleting] = useState(false)

    const deleteWorkspace = async()=>{
        setDeleting(true)
    try{
        const response = await api.delete(`/workspace/${workspace.id}`)
        onDone?.(response.data);
        onSuccess?.();
        onClose()
        setError("")
    }catch(e){
        console.log(e.response)
        console.log(e)
        setError( e.response?.data?.message || 'Failed to delete workspace' )
    }finally{
        setDeleting(false)
    }
}
if(!isOpen) return null
  return (
   <div onClick={(e) => e.stopPropagation()}
   className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
  <div className="w-full max-w-md rounded-3xl border border-zinc-800 backdrop-blur-2xl shadow-2xl">

    {/* Header */}
    <div className="border-b border-zinc-800 p-6">
      <h2 className="text-xl font-semibold text-zinc-100">
        Delete Workspace
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        This action cannot be undone.
      </p>
    </div>

    {/* Body */}
    <div className="p-6">
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
        <p className="text-sm text-zinc-300">
          Are you sure you want to delete
          <span className="font-semibold text-red-400">
            {" "}
            "{workspace?.name}"
          </span>
          ?
        </p>

        <p className="mt-2 text-xs text-zinc-500">
          All tasks, members and activity related to this workspace
          will be permanently removed.
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">
      <button
        onClick={onClose}
        className="rounded-xl px-5 py-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
      >
        Cancel
      </button>

      <button
        onClick={deleteWorkspace}
        disabled={deleting}
        className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white transition-all hover:bg-red-600 disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>

  </div>
</div>
  )
}

export default DeleteWorkspaceModal
