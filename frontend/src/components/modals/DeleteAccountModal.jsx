import { X, Trash2, Eye } from "lucide-react";

const DeleteAccountModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-500/10 p-2.5 text-red-400">
              <Trash2 size={18} />
            </div>

            <div>
              <h2 className="font-semibold text-zinc-100">
                Delete Account
              </h2>

              <p className="text-sm text-zinc-500">
                Permanently remove your account.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-5">

          <p className="text-sm text-zinc-400">
            Confirm your password to permanently delete your account.
          </p>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="
                  w-full rounded-xl border border-zinc-700
                  bg-zinc-900 px-4 py-3 pr-12
                  outline-none transition
                  focus:border-red-500
                "
              />

              <button
                type="button"
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  text-zinc-500 transition
                  hover:text-zinc-300
                "
              >
                <Eye size={18} />
              </button>
            </div>
          </div>

          <p className="text-xs text-red-400">
            ⚠ This action cannot be undone.
          </p>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 p-5">

          <button
            onClick={onClose}
            className="
              rounded-xl border border-zinc-700
              px-5 py-2
              text-zinc-300
              transition
              hover:bg-zinc-800
            "
          >
            Cancel
          </button>

          <button
            className="
              rounded-xl bg-red-500
              px-5 py-2
              font-medium text-white
              transition
              hover:bg-red-600
            "
          >
            Delete Account
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteAccountModal;
