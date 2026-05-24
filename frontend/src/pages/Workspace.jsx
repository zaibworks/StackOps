import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import api from '../api/axios.js'


const Workspace = () => {
 const {workspaceId} = useParams()
  const [workspace, setWorkspace] = useState(null)
  const [loading, setLoading] = useState(true)

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
    </div>
  )
}

export default Workspace
