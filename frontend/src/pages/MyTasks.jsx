import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { CheckSquare, Clock3, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {useWorkspace} from '../context/WorkspaceContext.jsx'
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard.jsx";

const MyTasks = () => {

  const [selectedTask, setSelectedTask] = useState(null)
const [selectedWorkspace, setSelectedWorkspace] = useState(null)

  const [page, setpage] = useState(1)
  const [tasks, setTasks] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [filter, setFilter] = useState('all')

  const [status, setStatus] = useState('')
  const [workspaceId, setWorkspaceId] = useState('')

  const {user,setUser} = useAuth()
  const {workspaces} = useWorkspace()
  const navigate = useNavigate()


  const handleTaskClick = async (task) => {
  const res = await api.get(`/workspace/${task.workspace.id}`)
  const freshWorkspace = res.data.data

  const freshTask = freshWorkspace.tasks.find(t => t.id === task.id)
  
  setSelectedWorkspace(freshWorkspace)
  setSelectedTask(freshTask || tasks)
}

  const fetchTasks =async ()=>{
    try{
      const res = await api.get(`/task/getMy`,{
        params:{
          page:page,
          limit:10,
          filter,
          status,
          workspaceId
        }
      })
      setTasks(res.data.data)
      setTotalPages(res.data.totalPages)
    }catch(e){
      console.log(e)
    }
   }

  useEffect(() => {
   fetchTasks()
  }, [page,filter,status,workspaceId])

  const priorityColors = {
  low: 'text-yellow-400',
  medium: 'text-orange-400',
  high: 'text-red-500'
}

const handleTaskUpdate = async () => {
  await fetchTasks()
  
  const res = await api.get(`/workspace/${selectedTask.workspace.id}`)
  const updatedWorkspace = res.data.data
  console.log('updatedWorkspace:', updatedWorkspace)
  const updatedTask = updatedWorkspace.tasks.find(t => t.id === selectedTask.id)
  console.log('updatedTask:', updatedTask)
  
  setSelectedWorkspace(updatedWorkspace)
  if(updatedTask) setSelectedTask(updatedTask)
}
  
return (
<div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">

  <Navbar />

  <div className="flex flex-1 overflow-hidden">

    <Sidebar user={user} workspaces={workspaces} />

    <main className="flex-1 flex flex-col overflow-hidden p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          My Tasks
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Track all tasks assigned to you across workspaces
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex gap-2 flex-wrap">

          <button  onClick={() => setFilter('all')}
          className={`rounded-xl border px-5 py-2 text-sm ${
    filter === 'all'
    ? 'border-orange-500 bg-orange-500/10'
    : 'border-zinc-800 hover:bg-zinc-900'
  }`}>
            All
          </button>

          <button onClick={() => setFilter('createdByMe')}
          className={`rounded-xl border px-7 py-2 text-sm ${
    filter === 'createdByMe'
    ? 'border-orange-500 bg-orange-500/10'
    : 'border-zinc-800 hover:bg-zinc-900'
  }`}>
            CreatedByMe
          </button>

          <button onClick={() => setFilter('assignedToMe')}
          className={`rounded-xl border px-7 py-2 text-sm ${
    filter === 'assignedToMe'
    ? 'border-orange-500 bg-orange-500/10'
    : 'border-zinc-800 hover:bg-zinc-900'
  }`}>
             AssignedToMe
          </button>

        </div>

<div className="flex gap-2 flex-wrap">

  <select
    value={status}
    onChange={(e) => { setStatus(e.target.value); setpage(1) }}
    className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-900 cursor-pointer outline-none"
  >
    <option value="">Status</option>
    <option value="todo">Todo</option>
    <option value="inprogress">In Progress</option>
    <option value="done">Done</option>
  </select>

  <select
    value={workspaceId}
    onChange={(e) => { setWorkspaceId(e.target.value); setpage(1) }}
    className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-900 cursor-pointer outline-none"
  >
    <option value="">Workspace</option>
    {workspaces?.map(w => (
      <option key={w.id} value={w.id}>{w.name}</option>
    ))}
  </select>

</div>

      </div>

      {/* Task Cards */}
      <div className="mt-8 flex-1 min-h-0 overflow-y-auto px-2 p-4 space-y-2 custom-scrollbar">
{tasks?.map(t=>(

  <div  key={t.id} onClick={() => handleTaskClick(t)}
  className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 transition-all hover:border-zinc-800 hover:bg-zinc-900/40">

  <div className="flex items-center justify-between">

    <div className="min-w-0">
      <h3 className="truncate text-sm font-semibold text-zinc-100">
        {t.title}
      </h3>

      <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
        <span  onClick={(e) => { 
  e.stopPropagation() 
  navigate(`/workspace/${t.workspace.id}`) 
}}
        className="font-medium hover:text-zinc-300">📁 {t.workspace.name}</span>

        <span>•</span>

        <span>{t.status}</span>

        <span>•</span>

        <span>{t.dueDate ? new Date(t.dueDate).toLocaleDateString():"No due Date"}</span>
      </div>
    </div>

  <span className={`px-2 py-1 text-[11px] font-medium ${priorityColors[t.priority] || 'text-zinc-400'}`}>
  {t.priority}
</span>

  </div>

</div>

))}


      </div>
{/* pages change  */}
  <div className="flex border-y border-zinc-500 justify-center items-center gap-3 py-3">
  <button
    onClick={() => setpage(page - 1)}
    disabled={page === 1}
    className="px-4 py-2 rounded-xl border border-zinc-800 text-sm hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Previous
  </button>

  <span className="text-sm text-zinc-500">{page} / {totalPages}</span>

  <button
    onClick={() => setpage(page + 1)}
    disabled={page === totalPages}
    className="px-4 py-2 rounded-xl border border-zinc-800 text-sm hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Next
  </button>
</div>

    </main>

  </div>

{selectedTask && selectedWorkspace && (
  <TaskCard
    task={selectedTask}
    workspace={selectedWorkspace}
    onClose={() => { setSelectedTask(null); setSelectedWorkspace(null) }}
    onTaskUpdate={handleTaskUpdate}
  />
)}

</div>
)
}
export default MyTasks