import { ChevronRight } from "lucide-react";

const AboutCard = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40">

      {/* Header */}
      <div className="border-b border-zinc-800 px-5 py-4">
        <h2 className="text-lg font-semibold">
          About
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Application information.
        </p>
      </div>

      {/* Body */}
      <div>

        {/* Version */}

        <div className="flex items-center justify-between px-5 py-4">

          <div>

            <p className="font-medium">
              Version
            </p>

            <p className="text-sm text-zinc-500">
              Current application version
            </p>

          </div>

          <span className="text-sm text-zinc-400">
            v1.0.0
          </span>

        </div>

        <div className="border-t border-zinc-800" />

        {/* Stack */}

        <div className="flex items-center justify-between px-5 py-4">

          <div>

            <p className="font-medium">
              Tech Stack
            </p>

            <p className="text-sm text-zinc-500">
              PERN Stack
            </p>

          </div>

          <span className="text-sm text-zinc-400">
            React • Express • Prisma
          </span>

        </div>

        <div className="border-t border-zinc-800" />

        {/* Developer */}

        <button className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-zinc-800/40">

          <div className="text-left">

            <p className="font-medium">
              Developer
            </p>

            <p className="text-sm text-zinc-500">
              Built with ❤️ by Zaib
            </p>

          </div>

          <ChevronRight size={16} />

        </button>

      </div>

    </div>
  );
};

export default AboutCard;