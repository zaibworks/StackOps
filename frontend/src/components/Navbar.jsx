import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  Search,
  User
} from "lucide-react";

const Navbar = ({
  workspaceName,
  showBack = false
}) => {

  const navigate = useNavigate();

  return (
    <nav className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">

      <div className="h-full px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Logo */}
          <Link
            to="/stackOps.png"
            className="text-lg font-bold text-zinc-100"
          >
            StackOps
          </Link>

          <div className="h-5 w-px bg-zinc-800" />

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="text-sm text-zinc-400 hover:text-zinc-200"
          >
            Dashboard
          </Link>

          {workspaceName && (
            <>
              <span className="text-zinc-700">/</span>

              <span className="text-sm text-zinc-300">
                {workspaceName}
              </span>
            </>
          )}

          {showBack && (
            <>
              <span className="text-zinc-700">/</span>

              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <button
            className="rounded-xl border border-zinc-800 p-2 hover:bg-zinc-900"
          >
            <Search size={18} />
          </button>

          {/* Settings */}
          <button
            className="rounded-xl border border-zinc-800 p-2 hover:bg-zinc-900"
          >
            <Settings size={18} />
          </button>

          {/* User */}
          <button
            className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center"
          >
            <User size={18} />
          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
