import { useState,useEffect } from "react"
import api from '../api/axios.js'
import { useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { Plus,X,FolderKanban,CheckSquare,Activity,LogOut,MoreVertical,Users,Pencil,Trash2 } from "lucide-react";

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [shoWorkspace, setshoWorkspace] = useState(false)
  const [showCreateModal, setshowCreateModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [showUpdateModal, setshowUpdateModal] = useState(false)

  const navigate = useNavigate()
  const {user,setUser} = useAuth()

  console.log(user)

  useEffect(() => {
    const fetchWorkspaces = async()=>{
      try{
        const response = await api.get('/workspace')
        setWorkspaces(response.data)

      }catch(e){
         setError(e.response?.data?.message || "Failed to get workspaces")
      }finally{
        setLoading(false)
      }
    }
    fetchWorkspaces()
  }, [])

  const handleLogout = () => {
  localStorage.removeItem('token');
  setUser(null);
  setWorkspaces([]);
  navigate('/login');
};

  const addWorkspace = async(e)=>{
    e.preventDefault()
     if (!name.trim()) {
   setError('Workspace name required')
     return
     }
     if (creating) return
    setError('')
    setCreating(true)
    try {
      const response = await api.post('/workspace',{
        name
      })
      setWorkspaces((prev)=>[
        ...prev,response.data
      ])
      setName('')
      navigate(`/workspace/${response?.data?.id}`)
      setShowCreateModal(false)
      setError('')
    } catch (err) {
       setError(err.response?.data?.message || 'Something went wrong')
    }finally{
      setCreating(false)
    }
  }

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const updateWorkspace = async (id)=>{
  if (!name.trim()) return setError('You have to change something');
  try{
    const response = await api.put(`/workspace/${id}`,{
      name
    })
    setWorkspaces((prev)=>prev.map((w)=>
      w.id === id ?response.data:w
    ))
      setshowUpdateModal(false)
    setError('')

  }catch(e){
     setError(e.response?.data?.message ||"Failed to update workspace");
  }
}

  if (loading) return <h1>Loading...</h1>
  return (
    <div className="min-h-screen  bg-zinc-950 text-zinc-100 overflow-hidden">
      <div className="flex">
     <aside className="relative flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-900/50">

  {/* Fixed welcome */}
  <div className="px-5 pt-5">
    <div className="mb-6 border-b border-zinc-800 pb-6">
      <p className="text-sm text-zinc-500">
        Welcome,
      </p>

      <h2 className="mt-1 text-xl font-semibold tracking-tight text-orange-400">
        {user?.name || "User"}
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Manage your workspaces efficiently
      </p>
    </div>
  </div>

  {/* Scrollable nav */}
  <nav className="flex-1 overflow-y-auto px-5 pb-28 scrollbar-hide">

    <button
      onClick={() => setshoWorkspace((prev) => !prev)}
      className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200 cursor-pointer"
    >
      <span className="font-medium flex gap-x-2 items-center"><FolderKanban size={16} />Workspaces</span>

      <span
        className={`text-xs text-zinc-500 transition-transform duration-200 ${
          shoWorkspace ? "rotate-180" : ""
        }`}
      >
        ▾
      </span>
    </button>

    {shoWorkspace && (
      <div className={`mt-2  max-h-[300px]  space-y-1 overflow-y-auto rounded-xl scrollbar-hide pl-3 transition-colors duration-300 hover:bg-zinc-900/30`}>
        <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer">
          All Workspaces
        </button>
        {workspaces.map((w) => (
          <button
            key={w.id}
            onClick={() => navigate(`/workspace/${w.id}`)}
            className="w-full truncate rounded-sm px-3 py-1.5 text-left text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer"
          >
            {w.name}
          </button>
        ))}
      </div>
    )}

    <div className="mt-4 space-y-1">
      <button className="flex w-full gap-x-2 items-center rounded-xl px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200 cursor-pointer">
       <CheckSquare size={14} /> My Tasks
      </button>

      <button className="flex w-full gap-x-2 items-center rounded-xl px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200 cursor-pointer">
        <Activity size={14} />Activity
      </button>
    </div>

  </nav>

  {/* Fixed logout */}
  <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 backdrop-blur-md">
  <div className="border-t border-zinc-800/80 pt-4">
    <button
      onClick={handleLogout}
      className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-zinc-800/50 hover:text-red-400 bg-zinc-900/70 cursor-pointer"
    >
      <LogOut size={16} />
      Logout
    </button>
  </div>
</div>
</aside>
 <main className="flex-1 p-8 overflow-y-auto">
  <div className="flex items-center justify-between px-2 mb-8">
     <div>
       <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
           Dashboard
       </h1>
       <p className="mt-2 text-sm text-zinc-500">
        Manage you workspaces and track your activity
       </p>
     </div>
<button  onClick={()=>setshowCreateModal(true)}
className=" flex items-center justify-between gap-2 pl-3 rounded-xl bg-zinc-300 px-6 py-2 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-300/90 cursor-pointer"><Plus size={16}/> Create</button>
  </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 rounded-2xl border border-zinc-700">
  <div className="rounded-2xl p-5">
    <p className="text-sm text-zinc-500"><FolderKanban size={18}/>Workspaces</p>
    <h2 className="mt-2 text-3xl font-semibold">
      {workspaces?.length}
    </h2>
  </div>

  <div className="rounded-2xl p-5">
    <p className="text-sm text-zinc-500"><Users size={18}/>Owned</p>
    <h2 className="mt-2 text-3xl font-semibold">{workspaces.filter(w=>w.members[0]?.role==='admin').length}</h2>
  </div>

  <div className="rounded-2xl p-5">
    <p className="text-sm text-zinc-500"><CheckSquare size={18}/>Assigned Tasks</p>
    <h2 className="mt-2 text-3xl font-semibold">0</h2>
  </div>

  <div className="rounded-2xl p-5">
    <p className="text-sm text-zinc-500"><Activity size={18}/>Activity</p>
    <h2 className="mt-2 text-3xl font-semibold">0</h2>
  </div>
</div>

{/* Recent Workspaces */}
<div className="mt-8">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-xl font-semibold text-zinc-100">
      Recent Workspaces
    </h2>

    <button className="text-sm text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer">
      View all
    </button>
  </div>
   <div className="max-h-[320px] overflow-y-auto scrollbar-hide space-y-3 pr-2">
    {workspaces.slice(0, 6).map((workspace,index) => {
      const isNearBottom = index>= workspaces.slice(0, 6).length - 2 
      return(
      <div
        key={workspace.id}
        onClick={(e) => 
          navigate(`/workspace/${workspace.id}`)}
        className="relative flex w-full items-center justify-between  border-y border-zinc-600 bg-zinc-950/40 py-3 px-5 text-left transition-all hover:bg-zinc-900/70 hover:border-orange-500/30 cursor-pointer"
      >
        <div className="flex items-center gap-10">
         <h3 className="truncate font-semibold text-base text-zinc-100">
          {workspace.name}
        </h3>
       <div className="flex items-center gap-4 text-xs text-zinc-500">
      <span>{workspace.members?.[0]?.role?.charAt(0).toUpperCase()+workspace.members?.[0]?.role?.slice(1)}</span>
      <span>•</span>
      <span>{`${workspace._count.members} ${workspace._count.members<2?'Member':'Members'}`}</span>
      <span>•</span>
      <span>{`Updated at ${formatDate(workspace.updatedAt)}`}</span>
    </div>
        </div>

        <button onClick={(e)=>{
          e.stopPropagation();
          setOpenMenuId(openMenuId === workspace.id ? null :workspace.id)
        }}
  className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300 cursor-pointer"
>
 <MoreVertical size={18}/>
</button>
{
  openMenuId === workspace.id &&(
    <div className={`absolute right-10 z-50 w-40 text-xs rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl ${
      isNearBottom
        ? "bottom-10"
        : "top-10"
    }`}>
{workspace.members?.[0]?.role === 'admin'?(
<>
    <button className="w-full px-2 py-2 text-left hover:bg-zinc-800 rounded-t-xl flex items-center gap-x-2">
      <Pencil size={10}/>
      Rename
    </button>

    <button className="w-full px-2 py-2 text-left text-red-400 hover:bg-zinc-800 rounded-x-xl flex items-center gap-x-2">
      <Trash2 size={10}/>
      Delete
    </button>

    <button className="w-full px-2 py-2 text-left text-red-400 hover:bg-zinc-800 rounded-b-xl flex items-center gap-x-2">
      <LogOut size={10}/>
      Leave
    </button>
</>
):(
  <>
   <button className="w-full px-2 py-2 text-left text-red-400 hover:bg-zinc-800 rounded-xl flex items-center gap-x-2">
      <LogOut size={10}/>
      Leave
    </button>
  </>
)}
    </div>
  )
}
      </div>
    )})}
  </div>
</div>
 </main>
      </div>

      {showCreateModal && (
        <div
       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    onClick={() => setshowCreateModel(false)}
  >
    <form
      onSubmit={addWorkspace}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-zinc-800 p-6">
          <h2 className="text-2xl font-semibold text-zinc-100">
            Create Workspace
          </h2>

        <button
          type="button"
          onClick={() => setshowCreateModal(false)}
          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          <X size={18}/>
        </button>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6">
        {/* Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Workspace Name
          </label>

          <input
            type="text"
            value={name}
            maxLength={50}
            placeholder="Enter workspace name..."
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition-colors focus:border-orange-500"
          />

          <div className="mt-2 flex justify-end">
            <span className="text-xs text-zinc-500">
              {name.length}/50
            </span>
          </div>
        </div>

        {/* Helper Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
          <p className="text-sm text-orange-300">
            A workspace contains members, tasks and activity. You can invite
            teammates and collaborate after creating it.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">
        <button
          type="button"
          onClick={() => setshowCreateModel(false)}
          className="rounded-xl px-5 py-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={creating}
          className="rounded-xl bg-zinc-100 px-6 py-2 font-medium text-zinc-900 transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  </div>
)}
    </div>

  )
}

export default Dashboard
