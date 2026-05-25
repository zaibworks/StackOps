import React from 'react'
import api from '../api/axios.js'

const TaskCard = ({task,workspaceId,onTaskUpdate}) => {

    const deleteTask = async()=>{
      await api.delete(`/task/${workspaceId}/${task.id}`)
       await onTaskUpdate()
    }
  return (
    <div>
      <p>{task.title}</p>
      <p>{task.status}</p>
     <button onClick={deleteTask}>Delete</button>
    </div>
  )
}

export default TaskCard
