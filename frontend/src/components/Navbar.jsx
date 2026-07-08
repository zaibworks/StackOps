import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  Search,
  User
} from "lucide-react";

import ProfileDropdown from "./ProfileDropdown.jsx";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({
  workspaceName,
  showBack = false,
  searchData,
  searchType,
  onTaskSelect,
  onMemberSelect
}) => {

  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")

  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate();
  const {user,setUser} = useAuth()

  const userLogout = () => {
  localStorage.removeItem('token');
  setUser(null);
  // setWorkspaces([]);
  navigate('/login');
};

const filteredResults =
  searchData?.filter(item =>
    item.name
      .toLowerCase()
      .includes(query.toLowerCase())
  ) || []

  const handleSearchClick = (item) => {
  if (item.type === "workspace") {
    navigate(`/workspace/${item.id}`)
  }

  if (item.type === "task") {
    onTaskSelect(item.id)
  }

  if (item.type === "member") {
    onMemberSelect(item.id)
  }

  setShowSearch(false)
  setQuery("")
}

  return (
    <nav className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">

      <div className="h-full px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Logo */}
          <div
           onClick={navigate('/')}
            className="text-lg font-bold text-zinc-100"
          >
            Stack<span className="text-orange-400">Ops</span>
          </div>

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

{/* center  */}
        <div className="flex-1 flex justify-center relative">

  <div className="w-[450px] relative">

    <Search
      size={16}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
    />

    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search tasks, members, workspaces..."
      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-10 pr-4 py-2 text-sm outline-none focus:border-zinc-600"
    />

    {query && (
      <div className="absolute top-12 w-full border border-zinc-800 bg-zinc-700/50 p-2 shadow-xl">

        {filteredResults.slice(0, 4).map(item => (
          <div
            key={`${item.type}-${item.id}`}
            onClick={() => handleSearchClick(item)}
            className="cursor-pointer rounded-xl p-3 hover:bg-zinc-900"
          >
            {item.name}
          </div>
        ))}

      </div>
    )}

  </div>

</div>

  

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* User */}

         <div className="relative">

  <button
    onClick={() => setShowProfile(prev => !prev)}
    className="
 flex h-10 w-10 items-center justify-center
            rounded-full
            border border-zinc-700
            bg-zinc-900
            text-xl font-bold
            text-orange-400
            cursor-pointer
    "
  >
    {user?.name?.charAt(0)?.toUpperCase()}
  </button>

  {showProfile && (
    <ProfileDropdown
      user={user}
      onLogout={userLogout}
      onSettings={() => navigate("/settings")}
    />
  )}

</div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
