import {X,Pencil,Trash2,LogOut,Settings,ChevronRight, Flag,} from "lucide-react";
import { useState } from "react";
import DeleteWorkspaceModal from "./DeleteWorkspaceModal.jsx";
import UpdateWorkspaceModal from "./UpdateWorkspaceModal.jsx";
import { useWorkspace } from "../context/WorkspaceContext.jsx";
import { useNavigate } from "react-router-dom";

const WorkspaceSettingsModal = ({isOpen,onClose,workspace,onDone}) => {
  if (!isOpen) return null;

  const navigate = useNavigate()

   const [showUpdateWorkspace, setshowUpdateWorkspace] = useState(false)
    const [showDeleteWorkspace, setshowDelelteWorkspace] = useState(false)
    
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Settings size={20} />
              Workspace Settings
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {workspace?.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">
              <button
                onClick={()=>{
                  setshowUpdateWorkspace(true)}}
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-cyan-500 hover:bg-zinc-900"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                    <Pencil size={18} />
                  </div>

                  <div className="text-left">
                    <p className="font-medium">
                      Rename Workspace
                    </p>

                    <p className="text-sm text-zinc-500">
                      Update workspace name.
                    </p>
                  </div>
                </div>

                <ChevronRight size={18} />
              </button>

              <button
                onClick={()=>{
                  setshowDelelteWorkspace(true)}}
                className="flex w-full items-center justify-between rounded-2xl border border-red-500/20 bg-red-500/5 p-4 transition hover:bg-red-500/10"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
                    <Trash2 size={18} />
                  </div>

                  <div className="text-left">
                    <p className="font-medium text-red-400">
                      Delete Workspace
                    </p>

                    <p className="text-sm text-zinc-500">
                      Permanently remove this workspace.
                    </p>
                  </div>
                </div>

                <ChevronRight size={18} />
              </button>

        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-2 hover:bg-zinc-800"
          >
            Close
          </button>
        </div>
      </div>
      {showUpdateWorkspace &&(
        <UpdateWorkspaceModal
        isOpen={showUpdateWorkspace}
        onClose={()=>setshowUpdateWorkspace(false)}
        workspace={workspace}
        onSuccess={onDone}
        />
      )}
      {showDeleteWorkspace&&(
        <DeleteWorkspaceModal
        isOpen={showDeleteWorkspace}
        onClose={()=>setshowDelelteWorkspace(false)}
        workspace={workspace}
        onSuccess={()=>navigate('/dashboard')}
        />
      )}
      
    </div>
  );
};

export default WorkspaceSettingsModal;