import { useState,useEffect } from "react"
import api from '../api/axios.js'
import { useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [shoWorkspace, setshoWorkspace] = useState(false)

  const navigate = useNavigate()
  const {user} = useAuth()

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

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

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
    } catch (err) {
       setError(err.response?.data?.message || 'Something went wrong')
    }finally{
      setCreating(false)
    }
  }

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

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

      <h2 className="mt-1 text-xl font-semibold tracking-tight text-cyan-400">
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
      className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200"
    >
      <span className="font-medium">Workspaces</span>

      <span
        className={`text-xs text-zinc-500 transition-transform duration-200 ${
          shoWorkspace ? "rotate-180" : ""
        }`}
      >
        ▾
      </span>
    </button>

    {shoWorkspace && (
      <div className={`mt-2  h-[300px]  space-y-1 overflow-y-auto rounded-xl scrollbar-hide pl-3 transition-colors duration-300 hover:bg-zinc-900/30`}>
        <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-500 transition-colors hover:text-zinc-300">
          All Workspaces
        </button>
        {workspaces.map((w) => (
          <button
            key={w.id}
            onClick={() => navigate(`/workspace/${w.id}`)}
            className="w-full truncate rounded-sm px-3 py-1.5 text-left text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {w.name}
          </button>
        ))}
      </div>
    )}

    <div className="mt-4 space-y-1">
      <button className="flex w-full items-center rounded-xl px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200">
        My Tasks
      </button>

      <button className="flex w-full items-center rounded-xl px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200">
        Activity
      </button>
    </div>

  </nav>

  {/* Fixed logout */}
  <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 backdrop-blur-md">
  <div className="border-t border-zinc-800/80 pt-4">
    <button
      onClick={handleLogout}
      className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-zinc-800/50 hover:text-red-400 bg-zinc-900/70"
    >
      Logout
    </button>
  </div>
</div>
</aside>
 <main className="flex-1 p-8 overflow-y-auto">
     <div className="mb-8">
       <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
           Dashboard
       </h1>
       <p className="mt-2 text-sm text-zinc-500">
        Manage you workspaces and track your activity
       </p>
     </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 rounded-2xl border border-zinc-700">
  <div className="rounded-2xl p-5">
    <p className="text-sm text-zinc-500">Workspaces</p>
    <h2 className="mt-2 text-3xl font-semibold">
      {workspaces?.length}
    </h2>
  </div>

  <div className="rounded-2xl p-5">
    <p className="text-sm text-zinc-500">Owned</p>
    <h2 className="mt-2 text-3xl font-semibold">0</h2>
  </div>

  <div className="rounded-2xl p-5">
    <p className="text-sm text-zinc-500">Assigned Tasks</p>
    <h2 className="mt-2 text-3xl font-semibold">0</h2>
  </div>

  <div className="rounded-2xl p-5">
    <p className="text-sm text-zinc-500">Activity</p>
    <h2 className="mt-2 text-3xl font-semibold">0</h2>
  </div>
</div>

{/* Recent Workspaces */}
<div className="mt-8">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-xl font-semibold text-zinc-100">
      Recent Workspaces
    </h2>

    <button className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
      View all
    </button>
  </div>
   <div className="max-h-[320px] overflow-y-auto scrollbar-hide space-y-3 pr-2">
    {workspaces.slice(0, 6).map((workspace) => (
      <div
        key={workspace.id}
        onClick={() => navigate(`/workspace/${workspace.id}`)}
        className="flex w-full items-center justify-between  border-y border-zinc-600 bg-zinc-950/40 py-3 px-5 text-left transition-all hover:border-zinc-700 hover:bg-zinc-900/70"
      >
        <div className="flex items-center gap-10">
         <h3 className="truncate text-lg font-medium text-zinc-100">
          {workspace.name}
        </h3>
       <div className="flex items-center gap-4 text-sm text-zinc-500">
      <span>{workspace.members?.[0]?.role?.charAt(0).toUpperCase()+workspace.members?.[0]?.role?.slice(1)}</span>
      <span>•</span>
      <span>{`${workspace._count.members} ${workspace._count.members<2?'Member':'Members'}`}</span>
      <span>•</span>
      <span>{`Updated at ${formatDate(workspace.updatedAt)}`}</span>
    </div>
        </div>

        <button
  className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
>
  ⋮
</button>
      </div>
    ))}
  </div>
</div>
 </main>
      </div>
      {/* <h1>DashBoard</h1>
      {error && <p>{error}</p>}
     <button onClick={handleLogout} className="bg-red-600 rounded-2xl p-2 font-bold">Logout</button>
     <form onSubmit={addWorkspace}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <button type="submit" disabled={creating} className="bg-yellow-500 rounded-2xl p-2 font-bold">
         {creating ? 'Creating...' : 'Create'}
        </button>
      </form> */}
    </div>

  )
}

export default Dashboard
