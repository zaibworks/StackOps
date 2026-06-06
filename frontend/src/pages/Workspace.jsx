import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import api from '../api/axios.js'
import TaskCard from '../components/TaskCard.jsx'


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
    <div className='min-h-screen bg-zinc-900 text-zinc-100'>
      {/* header section */}
    <div className="mb-8 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 px-5 py-4">

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
{/* stats section  */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 mb-8 p-8">
  
  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">Total Tasks</p>
      <div className="rounded-xl bg-zinc-800 p-2">
        📋
      </div>
    </div>

    <h2 className="mt-4 text-3xl font-semibold text-zinc-100">
      24
    </h2>

    <p className="mt-1 text-xs text-zinc-500">
      All workspace tasks
    </p>
  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">Members</p>
      <div className="rounded-xl bg-blue-500/10 p-2">
        👥
      </div>
    </div>

    <h2 className="mt-4 text-3xl font-semibold text-zinc-100">
      8
    </h2>

    <p className="mt-1 text-xs text-zinc-500">
      Active collaborators
    </p>
  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">High Priority</p>
      <div className="rounded-xl bg-orange-500/10 p-2">
        ⚠️
      </div>
    </div>

    <h2 className="mt-4 text-3xl font-semibold text-zinc-100">
      3
    </h2>

    <p className="mt-1 text-xs text-zinc-500">
      Needs attention
    </p>
  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">Overdue</p>
      <div className="rounded-xl bg-red-500/10 p-2">
        ⏰
      </div>
    </div>

    <h2 className="mt-4 text-3xl font-semibold text-zinc-100">
      2
    </h2>

    <p className="mt-1 text-xs text-zinc-500">
      Past due date
    </p>
  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">Unassigned</p>
      <div className="rounded-xl bg-purple-500/10 p-2">
        🎯
      </div>
    </div>

    <h2 className="mt-4 text-3xl font-semibold text-zinc-100">
      5
    </h2>

    <p className="mt-1 text-xs text-zinc-500">
      Not assigned yet
    </p>
  </div>

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
