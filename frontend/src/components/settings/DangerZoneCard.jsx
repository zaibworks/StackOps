import { ChevronRight } from "lucide-react";

const DangerZoneCard = () => {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-zinc-900/40">

      {/* Header */}
      <div className="border-b border-red-500/20 px-5 py-4">
        <h2 className="text-lg font-semibold text-red-400">
          Danger Zone
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Permanent actions that cannot be undone.
        </p>
      </div>

      {/* Action */}

      <button
        className="
          flex w-full items-center justify-between
          px-5 py-4
          transition-colors
          hover:bg-red-500/5
        "
      >

        <div className="text-left">

          <p className="font-medium text-red-400">
            Delete Account
          </p>

          <p className="text-sm text-zinc-500">
            Permanently remove your account and all associated data.
          </p>

        </div>

        <ChevronRight
          size={16}
          className="text-red-400"
        />

      </button>

      <div className="border-t border-red-500/20" />

      {/* Footer */}

      <div className="px-5 py-4">

        <p className="text-sm text-zinc-500">
          This action deletes your account, workspaces, tasks,
          comments and activities permanently.
        </p>

      </div>

    </div>
  );
};

export default DangerZoneCard;