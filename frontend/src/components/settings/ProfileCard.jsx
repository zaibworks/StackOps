import { ChevronRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

const ProfileCard = ({onClickName,onClickPassword}) => {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40">

      {/* Header */}
      <div className="border-b border-zinc-800 px-5 py-4">
        <h2 className="text-lg font-semibold">
          Profile
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Manage your account information.
        </p>
      </div>

      {/* User */}
      <div className="flex items-center gap-4 px-5 py-5">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-lg font-semibold text-orange-400">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <div className="flex-1">
          <p className="font-medium">
            {user?.name}
          </p>

          <p className="text-sm text-zinc-500">
            {user?.email}
          </p>
        </div>

      </div>

      {/* Actions */}

      <div className="border-t border-zinc-800">

        <button onClick={onClickName}
        className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-zinc-800/40">

          <div>

            <p className="text-left font-medium">
              Change Name
            </p>

            <p className="text-left text-sm text-zinc-500">
              Update display name
            </p>

          </div>

          <ChevronRight size={16} />

        </button>

        <div className="border-t border-zinc-800" />

        <button onClick={onClickPassword}
        className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-zinc-800/40">

          <div>

            <p className="text-left font-medium">
              Change Password
            </p>

            <p className="text-left text-sm text-zinc-500">
              Update your password
            </p>

          </div>

          <ChevronRight size={16} />

        </button>

      </div>
    </div>
  );
};

export default ProfileCard;