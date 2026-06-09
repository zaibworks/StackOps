import { LogOut } from "lucide-react";
import { useState } from "react";

const LeaveWorkspaceModal = ({
  isOpen,
  onClose,
  workspace,
  onDone,
}) => {
  if (!isOpen) return null;

  const [error, setError] = useState("");
const [leaving, setLeaving] = useState(false);


  const leaveWorkspace = async () => {
  try {
    setLeaving(true);

    // api later

    onDone(workspace);

    onClose();
  } catch (e) {
    setError(
      e.response?.data?.message ||
      "Failed to leave workspace"
    );
  } finally {
    setLeaving(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 backdrop-blur-2xl shadow-2xl">

        {/* Header */}
        <div className="border-b border-zinc-800 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-500/10 p-2">
              <LogOut
                size={18}
                className="text-orange-400"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-zinc-100">
                Leave Workspace
              </h2>

              <p className="text-sm text-zinc-500">
                You can be invited again later.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">
            <p className="text-sm text-zinc-300">
              Are you sure you want to leave
              <span className="font-semibold text-orange-400">
                {" "}
                "{workspace?.name}"
              </span>
              ?
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              You will lose access to this workspace,
              its tasks and member list until someone
              invites you again.
            </p>
          </div>

          {/* Error */}
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
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={leaveWorkspace}
            disabled={leaving}
            className="rounded-xl bg-orange-500 px-5 py-2 font-medium text-white transition-all hover:bg-orange-600 disabled:opacity-50"
          >
            {leaving ? "Leaving..." : "Leave"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveWorkspaceModal;