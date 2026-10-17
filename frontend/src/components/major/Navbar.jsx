import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  Search,
  User
} from "lucide-react";

import ProfileDropdown from "../ProfileDropdown.jsx";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.js";

function NavbarNew(){
  return(
    <>
   
    </>
  )
}

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
  searchData?.filter(item =>item.name.toLowerCase().includes(query.toLowerCase())
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

     <header className="flex h-17 w-full shrink-0 items-center border-b border-zinc-800/60 bg-zinc-950 px-10">

  {/* Left Section */}
  <div className="flex items-center">

    {/* Logo */}
    <div
     onClick={()=>navigate('/')}
      className="text-lg font-bold tracking-tight"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <span className="text-zinc-50">Stack</span>
      <span className="text-orange-500">Ops</span>
    </div>

    {/* Divider */}
    <div className="mx-8 h-6 w-px bg-zinc-700" />

    {/* Current Page */}

    
    <Link 
    to={'/dashboard'}
    className="text-[14px] text-zinc-400 hover:text-zinc-300">
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

  </div>

  {/* Search */}
  <div className="absolute left-1/2 w-[430px] -translate-x-1/2">

    <div className="relative">

      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
      />

      <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search tasks, members, workspaces..."
        className="py-2 w-full rounded-full border border-zinc-800 bg-zinc-900/70 pl-12 pr-5 text-sm text-zinc-300 outline-none placeholder:text-zinc-500 focus:border-zinc-700"
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

  {/* Right Section */}
  <div className="ml-auto relative">

    {/* Avatar */}
    <div  onClick={() => setShowProfile(prev => !prev)}
    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-cyan-400 text-sm font-medium text-zinc-950 cursor-pointer">
       {user?.name?.charAt(0)?.toUpperCase()}
    </div>

    {showProfile && (
    <ProfileDropdown
      user={user}
      onLogout={userLogout}
      onSettings={() => navigate("/settings")}
    />
  )}




  </div>

</header>
   
  );
};

export default Navbar;
