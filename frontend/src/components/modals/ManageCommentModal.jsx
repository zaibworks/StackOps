import {
  X,
  BriefcaseBusiness,
} from "lucide-react";

const ManageCommentsModal = ({isOpen,onClose}) => {
    if(!isOpen) return;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950/90">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">

          <div>

            <h2 className="text-lg font-semibold">
              Manage Comments
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Select one or more comments to delete.
            </p>

          </div>

          <button onClick={onClose}
            className="
              rounded-lg
              p-2
              text-zinc-500
              transition
              hover:bg-zinc-800
              hover:text-white
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* Select All */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">

          <label className="flex cursor-pointer items-center gap-3">

            <input
              type="checkbox"
              className="h-4 w-4 accent-orange-500"
            />

            <span className="text-sm font-medium">
              Select All
            </span>

          </label>

          <span className="text-sm text-zinc-500">
            6 Comments
          </span>

        </div>

        {/* Workspace List */}
        <div className="max-h-80 overflow-y-auto">

          {[1, 2, 3, 4, 5].map((workspace) => (

            <label
              key={workspace}
              className="
                flex cursor-pointer items-center justify-between
                border-b border-zinc-800
                px-5 py-4
                transition
                hover:bg-zinc-800/40
              "
            >

              <div className="flex items-center gap-4">

                <input
                  type="checkbox"
                  className="h-4 w-4 accent-orange-500"
                />

                <div className="rounded-lg bg-orange-500/10 p-2 text-orange-400">
                  <BriefcaseBusiness size={16} />
                </div>

                <div>

                  <p className="font-medium">
                    Hey this done
                  </p>

                  <p className="text-xs text-zinc-500">
                    
                  </p>

                </div>

              </div>

            </label>

          ))}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 p-5">

          <p className="text-sm text-zinc-500">
            2 selected
          </p>

          <div className="flex gap-3">

            <button onClick={onClose}
              className="
                rounded-xl
                px-4 py-2
                text-sm
                text-zinc-400
                transition
                hover:bg-zinc-800
              "
            >
              Cancel
            </button>

            <button
              className="
                rounded-xl
                bg-red-500
                px-5 py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-red-600
              "
            >
              Delete Selected
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ManageCommentsModal;

