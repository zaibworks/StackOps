import React from 'react'
import { X } from 'lucide-react'

const UpdateWorkspaceModal = ({isOpen,onClose,workspace,onSuccess}) => {

    if (!isOpen) return null

     const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
  if (workspace) {
    setName(workspace.name)
  }
}, [workspace])

const updateWorkspace = async () => {
    setUpdating(true)
  if (!name.trim()) {
    return setError("Workspace name required");
  }

  if (name.trim() === workspace.name) {
    return setError("Workspace name is unchanged");
  }

  try {
    const response = await api.put(
      `/workspace/${workspace.id}`,
      { name }
    );

    onSuccess(response.data);
    onClose();

    setName("");
    setError("");
  } catch (e) {
    setError(
      e.response?.data?.message ||
      "Failed to update workspace"
    );
  }finally{
    setUpdating(false)
  }
}

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
  <form
    onSubmit={updateWorkspace}
    className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl"
  >
    {/* Header */}
    <div className="flex items-center justify-between border-b border-zinc-800 p-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">
          Rename Workspace
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Update the workspace name
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
      >
        <X size={18} />
      </button>
    </div>

    {/* Body */}
    <div className="space-y-5 p-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Workspace Name
        </label>

        <input
          type="text"
          value={name}
          maxLength={50}
          placeholder="Enter workspace name..."
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition-colors focus:border-orange-500"
        />

        <div className="mt-2 flex justify-end">
          <span className="text-xs text-zinc-500">
            {name.length}/50
          </span>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">
      <button
        type="button"
        onClick={onClose}
        className="rounded-xl px-5 py-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={updating}
        className="rounded-xl bg-zinc-100 px-6 py-2 font-medium text-zinc-900 transition-all hover:bg-white disabled:opacity-50"
      >
        {updating ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </form>
</div>
  )
}

export default UpdateWorkspaceModal
