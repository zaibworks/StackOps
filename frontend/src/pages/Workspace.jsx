import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import api from '../api/axios.js'
import TaskCard from '../components/TaskCard.jsx'
import {
  ListTodo,
  Users,
  TriangleAlert,
  Clock3,
  CheckCircle2
} from "lucide-react";


const Workspace = () => {
  const [workspace, setWorkspace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('todo')
  const [dueDate, setdueDate] = useState('')
  const [assignedToId, setAssignedToId] = useState('')
  
  const {workspaceId} = useParams()
  const navigate = useNavigate()

  const fetchWorkspace = async () => {
  try {
    const response = await api.get(`/workspace/${workspaceId}`)
    setWorkspace(response.data.data)
    setLoading(false)
  } catch (e) {
    console.log(e)
    setLoading(false)
  }
}

useEffect(() => {
fetchWorkspace()
}, [])

const addTask = async(e)=>{
  e.preventDefault()
  setError('')
  try {
     const response = await api.post(`/task/${workspaceId}`,{
        title,
        content,
        priority,
        status,
        dueDate:dueDate ? new Date(dueDate).toISOString() : undefined,
        assignedToId:assignedToId ? parseInt(assignedToId) : undefined,
     })
  await fetchWorkspace()
  } catch (err) {
     setError(err?.response?.data?.message || 'Task creation failed')
  }finally{
     setLoading(false)
  }
}



  if(loading) return <h1>Loading...</h1>
  return (
    <div className='h-screen bg-zinc-900 text-zinc-100 overflow-hidden flex flex-col'>
      {/* header section */}
    <div className="mb-5 flex items-center justify-between border border-zinc-800 bg-zinc-900/40 px-5 py-4">

  {/* Left Side */}
  <div className="flex flex-col gap-2">

    {/* Breadcrumb */}
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => navigate("/dashboard")}
        className="text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer"
      >
        Dashboard
      </button>

      <span className="text-zinc-700">/</span>

      <span className="text-zinc-500">
        Workspace
      </span>
    </div>

    {/* Workspace Info */}
    <div className="flex items-center gap-4">

      <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
        {workspace?.name}
      </h1>

      <div className="h-5 w-px bg-zinc-800" />

      <div className="flex items-center gap-2 text-xs">

        <span className="rounded-full border border-zinc-800 px-3 py-1 text-zinc-400">
          {workspace?.members?.length || 0} Members
        </span>

        <span className="rounded-full border border-zinc-800 px-3 py-1 text-zinc-400">
          {workspace?.tasks?.length || 0} Tasks
        </span>

      </div>

    </div>

  </div>

  {/* Right Side */}
  <div className="flex items-center gap-3">

    <button
      className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
    >
      Invite Member
    </button>

    <button
      className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-all hover:bg-white cursor-pointer"
    >
      Add Task
    </button>

  </div>

</div>


{/* <div className="mb-2 h-px bg-gradient-to-r from-orange-500/20 via-zinc-800 to-transparent" />divider */}


{/* stats section  */}
<div className="grid grid-cols-12 gap-5 px-5 pb-5 flex-1 min-h-0">

  {/* LEFT SIDE - TASKS */}
  <section className="col-span-8 h-full min-h-0">
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 h-full overflow-hidden flex flex-col">

      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">
            Tasks
          </h2>
          <p className="text-sm text-zinc-500">
            Manage all workspace tasks
          </p>
        </div>

        <button className="rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
          Filters
        </button>
      </div>

      {/* Tasks Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          Task Card
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          Task Card
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          Task Card
        </div>

      </div>

    </div>
  </section>

  {/* RIGHT SIDE */}
  <section className="col-span-4 flex flex-col gap-5 min-h-0">

    {/* Stats */}
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-4">

  <div className="grid grid-cols-5 gap-2">

    {/* Total Tasks */}
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 hover:border-zinc-700 transition-all">
      <div className="flex flex-col gap-4">
        <p className="text-[11px] text-zinc-500">Tasks</p>
        <div className="rounded-lg p-2"><ListTodo size={18} className="text-zinc-400" /></div>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-zinc-100">24</h2>
    </div>

    {/* Members */}
    <div className="rounded-2xl border border-blue-500/10 bg-zinc-900/80 p-3 hover:border-blue-500/20 transition-all">
      <div className="flex flex-col gap-4">
        <p className="text-[11px] text-zinc-500">Members</p>
        <div className="rounded-lg  p-2"><Users size={18} className='text-blue-500'/></div>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-zinc-100">8</h2>
    </div>

    {/* High Priority */}
    <div className="rounded-2xl border border-orange-500/10 bg-zinc-900/80 p-3 hover:border-orange-500/20 transition-all">
      <div className="flex flex-col gap-4">
        <p className="text-[11px] text-zinc-500">Priority</p>
        <div className="rounded-lg  p-2"><TriangleAlert size={18} className='text-orange-500'/></div>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-orange-400">3</h2>
    </div>

    {/* Overdue */}
    <div className="rounded-2xl border border-red-500/10 bg-zinc-900/80 p-3 hover:border-red-500/20 transition-all">
      <div className="flex flex-col gap-4">
        <p className="text-[11px] text-zinc-500">Overdue</p>
        <div className="rounded-lg p-2"><Clock3 size={18} className='text-red-500'/></div>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-red-400">2</h2>
    </div>

    {/* Completed */}
    <div className="rounded-2xl border border-emerald-500/10 bg-zinc-900/80 p-3 hover:border-emerald-500/20 transition-all">
      <div className="flex flex-col gap-4">
        <p className="text-[11px] text-zinc-500">Completed</p>
        <div className="rounded-lg  p-2"><CheckCircle2 size={18} className='text-emerald-500'/></div>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-emerald-400">77%</h2>
    </div>

  </div>

</div>

    {/* Members */}
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 flex flex-col flex-1 min-h-0 overflow-hidden">

      <div className="border-b border-zinc-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          Members
        </h2>

        <p className="text-sm text-zinc-500">
          Workspace collaborators
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">

        <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-500/20" />
            <div>
              <p className="text-sm font-medium">Zaib</p>
              <p className="text-xs text-zinc-500">Admin</p>
            </div>
          </div>

          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
            Owner
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-700" />
            <div>
              <p className="text-sm font-medium">Member Name</p>
              <p className="text-xs text-zinc-500">Member</p>
            </div>
          </div>
        </div>

      </div>

    </div>

  </section>

</div>
       {/* <h1>{workspace?.name}</h1>
       <h2>Members</h2>
       {workspace?.members?.map((m)=>(
        <div key={m.id}>
          <p>{m.user.name}</p>
          <p>{m.role}</p>
        </div>
       ))}

         <h2>Tasks</h2>
    {workspace?.tasks?.map((t) => (
      <TaskCard task={t} workspaceId={workspaceId} onTaskUpdate={fetchWorkspace}/>
    ))}

    <div>
      <form onSubmit={addTask}>
         <input type="text" placeholder='Task title' value={title} onChange={(e)=>setTitle(e.target.value)} />
         <input type="text" placeholder='Task content' value={content} onChange={(e)=>setContent(e.target.value)} />
         <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
         </select>
         <select value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="inprogress">In-Progress</option>
          <option value="done">Done</option>
         </select>

         <input type="date" value={dueDate} onChange={(e) => setdueDate(e.target.value)} />

         <select value={assignedToId} onChange={(e)=>setAssignedToId(e.target.value)}>
          <option value="">Unassigned</option>
           {workspace?.members?.map((m)=>(
            <option key={m.user.id} value={m.user.id}>{m.user.name}</option>
           ))}
          </select>
          <button type='submit' className='bg-red-700'>Add Task</button>
      </form>
    </div> */}
    </div>
  )
}

export default Workspace
