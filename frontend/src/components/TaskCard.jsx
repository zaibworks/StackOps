import React from 'react'
import api from '../api/axios.js'
import { useState } from 'react'

const TaskCard = ({task,workspaceId,onTaskUpdate}) => {
    const [isEditing, setisEditing] = useState(false)
     const [editTitle, setEditTitle] = useState(task.title)
    const [editStatus, setEditStatus] = useState(task.status)
     const [editPriority, setEditPriority] = useState(task.priority)

    const deleteTask = async()=>{
      await api.delete(`/task/${workspaceId}/${task.id}`)
       await onTaskUpdate()
    }

    const updateTask = async()=>{
        await api.put(`/task/${workspaceId}/${task.id}`,{
             title: editTitle,
             priority: editPriority,
           status: editStatus
        })
        await onTaskUpdate()
        setisEditing(false)
    }

  return (
    <div>
        {isEditing?(
            <div>
                <form onSubmit={updateTask}>
                         <input type="text" placeholder='Task title' value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} />

      <select value={editPriority} onChange={(e)=>setEditPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
         </select>

      <select value={editStatus} onChange={(e)=>setEditStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="inprogress">In-Progress</option>
          <option value="done">Done</option>
         </select>

         <button type='Submit'>Done</button>
                </form>

<button onClick= {()=>setisEditing(false)}>Cancel</button>
            </div>
        ):(
            <div>
         <p>{task.title}</p>
         <p>{task.status}</p>
        <button onClick={deleteTask}>Delete</button>
        <button onClick={()=>setisEditing(true)}>Edit</button>
            </div>
        )
    }
    </div>
  )
}

export default TaskCard
