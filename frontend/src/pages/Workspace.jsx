import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import api from '../api/axios.js'


const Workspace = () => {
  const [workspace, setWorkspace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState([])
  const [error, setError] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('todo')
  const [dueDate, setdueDate] = useState('')
  const [assignedToId, setAssignedToId] = useState('')
  
  const {workspaceId} = useParams()

useEffect(() => {
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
fetchWorkspace()
}, [])

const addTask = async()=>{
  e.preventDefault()
  setError('')
  try {
     const response = await api.post(`/task/${workspaceId}`,{
        title,
        content,
        priority,
        satus,
        dueDate:dueDate ? new Date(dueDate).toISOString() : undefined,
        assignedToId:assignedToId ? parseInt(assignedToId) : undefined,
     })
  setTask(response.data.data)
  } catch (err) {
     if(error){
      setError(err?.response?.message ||'Task creation failed')
     }
  }finally{
     setLoading(false)
  }
}

  if(loading) return <h1>Loading...</h1>
  return (
    <div>
       <h1>{workspace?.name}</h1>
       <h2>Members</h2>
       {workspace?.members?.map((m)=>(
        <div key={m.id}>
          <p>{m.user.name}</p>
          <p>{m.role}</p>
        </div>
       ))}

         <h2>Tasks</h2>
    {workspace?.tasks?.map((t) => (
      <div key={t.id}>
        <p>{t.title}</p>
        <p>{t.status}</p>
      </div>
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
         <select value={status} onChange={(e)=>e.target.value}>
          <option value="todo"></option>
          <option value="inprogress"></option>
          <option value="completed"></option>

          <input type="date" value={dueDate} onChange={(e) => setdueDate(e.target.value)}/>

          <select value={assignedToId} onChange={(e)=>setAssignedToId(e.target.value)}></select>
           <option value="">Unassigned</option>
           {workspace?.members?.map((m)=>(
            <option key={m.user.id} value={m.user.id}>{m.user.name}</option>
           ))}
         </select>
          <button type='submit' className='bg-red-700'>Add Task</button>
      </form>
    </div>
    </div>
  )
}

export default Workspace
