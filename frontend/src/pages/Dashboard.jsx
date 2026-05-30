import { useState,useEffect } from "react"
import api from '../api/axios.js'
import { useNavigate,useParams} from "react-router-dom"

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)
  const [shoWorkspace, setshoWorkspace] = useState(false)

  const navigate = useNavigate()

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

  if (loading) return <h1>Loading...</h1>
  return (
    <div className="min-h-screen  bg-zinc-950 text-zinc-100 overflow-hidden">
      <div className="flex">
     <aside className="h-screen w-64 border-r flex-col border-zinc-800 bg-zinc-900/50 p-5">
          <div className="mb-8 border-b border-zinc-800 pb-6">
  <p className="text-sm text-zinc-500">
    Welcome,
  </p>

  <h2 className="mt-1 text-xl font-semibold tracking-tight text-cyan-400">
    UserName
  </h2>

  <p className="mt-2 text-sm text-zinc-500">
    Manage your workspaces efficiently
  </p>
</div>

<nav className="space-y-2">
       <button onClick={()=>setshoWorkspace((prev)=>!prev)}
  className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200"
>
  <span className="font-medium">Workspaces</span><span className={`text-xs text-zinc-500 transition-transform duration-200 ${shoWorkspace?"rotate-180":""}`}>▾</span>
</button>
{
  shoWorkspace && (
      <div className="mt-2 space-y-1 pl-3 h-[300px] overflow-y-auto transition-colors duration-300 hover:bg-zinc-900/30 rounded-xl scrollbar-hide">
<button className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-500 transition-colors hover:text-zinc-300">
  All Workspaces
</button>
 {workspaces.map((w)=>(
      <button  className="w-full truncate rounded-sm px-3 py-1.5 text-left text-zinc-500 transition-colors hover:text-zinc-300"
      key={w.id} 
      onClick={()=>navigate(`/workspace/${w.id}`)}>
       {w.name}
      </button>
     ))}
</div>
  )
}
   <div className="mt-4 space-y-1">
  <button className="flex w-full items-center rounded-xl px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200">
  My Tasks
</button>

<button className="flex w-full items-center rounded-xl px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200">
  Activity
</button>
  </div>
     </nav>
     </aside> 
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
