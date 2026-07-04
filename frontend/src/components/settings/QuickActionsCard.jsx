import {
  ChevronRight,
  BriefcaseBusiness,
  CheckSquare,
  MessageSquare,
  History,
} from "lucide-react";

const QuickActionsCard = ({onWorkspaces,onTasks,onComments,onActivities}) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40">

      {/* Header */}
      <div className="border-b border-zinc-800 px-5 py-4">
        <h2 className="text-lg font-semibold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Manage your application data.
        </p>
      </div>

      {/* Actions */}

      <div>

        {/* Workspace */}

        <button onClick={onWorkspaces}
        className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-zinc-800/40">

          <div className="flex items-center gap-3">

            <BriefcaseBusiness
              size={18}
              className="text-zinc-500"
            />

            <div className="text-left">

              <p className="font-medium">
                Manage Workspaces
              </p>

              <p className="text-sm text-zinc-500">
                Delete selected workspaces
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="text-sm text-zinc-500">
              12
            </span>

            <ChevronRight size={16} />

          </div>

        </button>

        <div className="border-t border-zinc-800" />

        {/* Tasks */}

        <button onClick={onTasks}
        className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-zinc-800/40">

          <div className="flex items-center gap-3">

            <CheckSquare
              size={18}
              className="text-zinc-500"
            />

            <div className="text-left">

              <p className="font-medium">
                Manage Tasks
              </p>

              <p className="text-sm text-zinc-500">
                Delete selected tasks
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="text-sm text-zinc-500">
              48
            </span>

            <ChevronRight size={16} />

          </div>

        </button>

        <div className="border-t border-zinc-800" />

        {/* Comments */}

        <button onClick={onComments}
        className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-zinc-800/40">

          <div className="flex items-center gap-3">

            <MessageSquare
              size={18}
              className="text-zinc-500"
            />

            <div className="text-left">

              <p className="font-medium">
                Manage Comments
              </p>

              <p className="text-sm text-zinc-500">
                Delete selected comments
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="text-sm text-zinc-500">
              163
            </span>

            <ChevronRight size={16} />

          </div>

        </button>

        <div className="border-t border-zinc-800" />

        {/* Activities */}

        <button onClick={onActivities}
        className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-zinc-800/40">

          <div className="flex items-center gap-3">

            <History
              size={18}
              className="text-zinc-500"
            />

            <div className="text-left">

              <p className="font-medium">
                Manage Activities
              </p>

              <p className="text-sm text-zinc-500">
                Clear selected activities
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="text-sm text-zinc-500">
              521
            </span>

            <ChevronRight size={16} />

          </div>

        </button>

      </div>

    </div>
  );
};

export default QuickActionsCard;