import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import api from '../api/axios.js'
import TaskCard from '../components/TaskCard.jsx'
import {
  UserX,
  Clock3,
  CheckCircle2
} from "lucide-react";
import Navbar from '../components/Navbar.jsx'
const Workspace = () => {
  const [workspace, setWorkspace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('todo')
  const [dueDate, setdueDate] = useState('')
  const [assignedToId, setAssignedToId] = useState('')
  const [openAddTask, setOpenAddTask] = useState(false)
  const [addingTask, setAddingTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "",
  priority: "",
  assignedToId: ""
  })

const filteredTasks = workspace?.tasks?.filter((task) => {
  const statusMatch =
    !filters.status ||
    task.status === filters.status

  const priorityMatch =
    !filters.priority ||
    task.priority === filters.priority

  const assigneeMatch =
    !filters.assignedToId ||
    task.assignedTo?.id === Number(filters.assignedToId)

  return (
    statusMatch &&
    priorityMatch &&
    assigneeMatch
  )
})
  
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
  setAddingTask(true)
  e.preventDefault()
  setError('')
  try {
     await api.post(`/task/${workspaceId}`,{
        title,
        content,
        priority,
        status,
        dueDate:dueDate ? new Date(dueDate).toISOString() : undefined,
        assignedToId:assignedToId ? parseInt(assignedToId) : undefined,
     })
  await fetchWorkspace()
       setOpenAddTask(false)
  setTitle("")
  setContent("")
  setPriority("medium")
  setStatus("todo")
  setdueDate("")
  setAssignedToId("")
   setError("")

  } catch (err) {
     setError(err?.response?.data?.message || 'Task creation failed')
  }finally{
     setAddingTask(false)
  }
}


  if(loading) return <h1>Loading...</h1>
  return (
    <>
    <div className='h-screen bg-zinc-950 text-zinc-100 overflow-hidden flex flex-col'>
    <Navbar/>
      {/* header section */}
    <div className="mb-5 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/40 px-5 py-4">

  {/* Left Side */}
  <div className="flex flex-col gap-2">

    {/* Breadcrumb */}
    {/* <div className="flex items-center gap-2 text-sm">
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
    </div> */}

    {/* Workspace Info */}
    <div className="flex items-center gap-4">

      <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
        {workspace?.name}
      </h1>

      {/* <div className="h-5 w-px bg-zinc-800" /> */}

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

    <button onClick={()=>{
      setOpenAddTask(true)
      setError("")
    } }
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
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/40 h-full overflow-hidden flex flex-col relative">

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

        <button onClick={()=> setShowFilters(!showFilters)}
        className="rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
          Filters
        </button>

        {showFilters && (
  <div className="absolute right-5 top-20 w-72 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl">
    <select name='Status' 
    value={filters.status} 
    onChange={(e)=>setFilters(prev=>({
      ...prev,status: e.target.value
    }))}
     className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
     >
  <option value="">All</option>
  <option value="todo">Todo</option>
  <option value="inprogress">In Progress</option>
  <option value="done">Done</option>
    </select>
    <select name="Priority" id=""></select>
  </div>
)}
      </div>

      {console.log(
  workspace.tasks.map(t => ({
    title: t.title,
    updatedAt: t.updatedAt
  }))
)}
      {/* Tasks Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-2 custom-scrollbar">
     {filteredTasks.map((t) => (
  <div
    key={t.id}
    onClick={() => setSelectedTask(t)}
    className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 hover:border-zinc-700 transition-all cursor-pointer"
  >
    {/* Top Row */}
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-medium text-zinc-100">
          {t.title}
        </h3>

        <p className="mt-1 text-sm text-zinc-500 line-clamp-1">
          {t.content || "No description"}
        </p>
      </div>

      <button className="text-zinc-500 hover:text-zinc-300">
        ⋮
      </button>
    </div>

    {/* Bottom Row */}
    <div className="mt-4 flex items-center justify-between">

      <div className="flex items-center gap-2">

        {/* Priority */}
        <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2 py-1 text-xs text-orange-400">
          {t.priority}
        </span>

        {/* Status */}
        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
          {t.status}
        </span>

      </div>

      <div className="flex items-center gap-4 text-xs text-zinc-500">

        {/* Assignee */}
        <span>
          {t.assignedTo?.name || "Unassigned"}
        </span>

        {/* Due Date */}
        <span>
          {t.dueDate
    ? new Date(t.dueDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No Due Date"}
        </span>

      </div>

    </div>
  </div>
))}
</div>
    </div>
  </section>

  {/* taskcard modal  */}
  {selectedTask && (
  <TaskCard
    task={selectedTask}
    workspace={workspace}
    onClose={() => setSelectedTask(null)}
    onTaskUpdate={fetchWorkspace}
  />
)}
{/* ----------- */}





  {/* RIGHT SIDE */}
  <section className="col-span-4 flex flex-col gap-5 min-h-0">

    {/* Stats */}
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/40 p-4">

  <div className="grid grid-cols-3 gap-3">

     {/* Overdue */}
    <div className="rounded-2xl border border-red-500/10 bg-zinc-900/30 p-3 hover:border-red-500/20 transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-zinc-500">Overdue</p>
        <div className="rounded-lg p-2"><Clock3 size={18} className='text-red-500'/></div>
      </div>

      <h2 className="mt-2 text-2xl font-bold text-red-400">2</h2>
    </div>

    {/* UnAssigned */}
    <div className="rounded-2xl border border-orange-500/10 bg-zinc-900/30 p-3 hover:border-orange-500/20 transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-zinc-500">Unassigned</p>
        <div className="rounded-lg  p-2"><UserX size={18} className='text-orange-500'/></div>
      </div>

      <h2 className="mt-2 text-2xl font-bold text-orange-400">3</h2>
    </div>

    {/* Completed */}
    <div className="rounded-2xl border border-emerald-500/10 bg-zinc-900/30 p-3 hover:border-emerald-500/20 transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-zinc-500">Completed</p>
        <div className="rounded-lg  p-2"><CheckCircle2 size={18} className='text-emerald-500'/></div>
      </div>

      <h2 className="mt-2 text-2xl font-bold text-emerald-400">77%</h2>
    </div>

  </div>

</div>

    {/* Members */}
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/40 flex flex-col flex-1 min-h-0 overflow-hidden">

      <div className="border-b border-zinc-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          Members
        </h2>

        <p className="text-sm text-zinc-500">
          Workspace collaborators
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            
            {/* member card  */}
            {workspace?.members?.map(member=>(
        <div key={member.id} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-3">
          <div className="flex items-center gap-3">
            {/* <div className="h-10 w-10 rounded-full bg-orange-500/20" /> */}
            <div className="h-10 w-10 rounded-full bg-green-800/20 flex items-center justify-center text-sm font-semibold text-white">
  {member.user.name.charAt(0).toUpperCase()}
</div>
            <div>
              <p className="text-sm font-medium">{member?.user?.name}</p>
              <p className="text-xs text-zinc-500">{member?.role}</p>
            </div>
          </div>

          <span className={`rounded-full  px-3 py-1 text-xs  ${member?.role==='admin'?'text-red-400 bg-red-500/10':'text-cyan-400 bg-cyan-500/10'}`}>
            {member?.role ==='admin'?"Owner":"Member"}
          </span>
        </div>

            ))}

        {/* <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-700" />
            <div>
              <p className="text-sm font-medium">Member Name</p>
              <p className="text-xs text-zinc-500">Member</p>
            </div>
          </div>
        </div> */}

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
    {openAddTask &&(
      <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className='w-full max-w-lg rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-lg'>

        
      <div className="flex items-center justify-between border-b  border-zinc-800  px-5 py-4">
          <div> 
            <h2 className="text-xl font-semibold text-zinc-100"> 
                     Create Task
           </h2>
    <p className="mt-1 text-sm text-zinc-500">
      Add a new task to this workspace
    </p>
  </div>
     
  <button
 onClick={() => {
  setOpenAddTask(false)
  setError("")
 }}
 className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
 >
    ✕
  </button>
      </div>

      <form onSubmit={addTask} className="space-y-4 p-5">
        <div>
  <label className="mb-2 block text-sm text-zinc-400">Title</label>
   <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Fix authentication bug"
    className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm outline-none focus:border-zinc-600"
  />
</div>
<div>
  <label className="mb-2 block text-sm text-zinc-400">
    Description
  </label>

  <textarea
    rows={3}
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Describe task..."
    className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm outline-none focus:border-zinc-600"
  />
</div>
{/* assignie row  */}
<div className="grid grid-cols-2 gap-4">
  {/* priority */}
<div>
  <label className="mb-2 block text-sm text-zinc-400">
    Priority
  </label>

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm outline-none"
  >
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
</div>
   {/* assignedto  */}
     <div>
  <label className="mb-2 block text-sm text-zinc-400">
    Assignee
  </label>

  <select
    value={assignedToId}
    onChange={(e) => setAssignedToId(e.target.value)}
    className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm outline-none"
  >
    <option value="">
      Unassigned
    </option>

    {workspace?.members?.map((m) => (
      <option
        key={m.user.id}
        value={m.user.id}
      >
        {m.user.name}
      </option>
    ))}
  </select>
</div>
</div>

{/* dueDate  */}
   <div>
  <label className="mb-2 block text-sm text-zinc-400">
    Due Date
  </label>

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setdueDate(e.target.value)}
    className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none"
  />
</div>
<div className="h-5">
  {error && (
    <p className="text-sm text-red-400">
      {error}
    </p>
  )}
</div>
     {/* footer  */}
<div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-5">

<button
  type="button"
  onClick={() => setOpenAddTask(false)}
  className="rounded-xl border border-zinc-800 px-5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800"
>
  Cancel
</button>

 <button
  type="submit"
  disabled={addingTask}
  className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white cursor-pointer disabled:opacity-50
disabled:cursor-not-allowed"
>
 { addingTask? 'Creating...':'Create'}
</button>

</div>

      </form>
 


</div>
      </div>
    )}

    </div>
     </>
  )
}

export default Workspace
