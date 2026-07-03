import { X, Pencil } from "lucide-react";

const ChangeNameModal = ({isOpen,onClose}) => {
   if(!isOpen) return;
  return (
    <div className="fixed inset-0 z-50 flex items-center  bg-black/30 backdrop-blur-[2px]">

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 fixed left-50">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-orange-500/10 p-2 text-orange-400">
              <Pencil size={18} />
            </div>

            <div>
              <h2 className="font-semibold text-zinc-100">
                Change Name
              </h2>

              <p className="text-xs text-zinc-500">
                Update your display name.
              </p>
            </div>

          </div>

          <button onClick={onClose}
          className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200">
            <X size={18} />
          </button>

        </div>

        {/* Body */}
        <div className="space-y-4 p-5">

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              New Name
            </label>

            <input
              type="text"
              placeholder="Enter new name"
              className="
                w-full rounded-xl
                border border-zinc-700
                bg-zinc-950
                px-4 py-3
                outline-none
                transition
                focus:border-orange-500
              "
            />

          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 p-5">

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
              bg-orange-500
              px-5 py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-orange-600
            "
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChangeNameModal;