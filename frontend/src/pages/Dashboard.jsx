import { useState,useEffect } from "react"
import api from '../api/axios.js'
import { useNavigate } from "react-router-dom"


const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [newworkspace, setNewworkspace] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchWorkspaces = async()=>{
       const response = await api.get('/workspace')
       setWorkspaces(response.data)
       setLoading(false)
    }
    fetchWorkspaces()
  }, [])

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  return (
    <div>
      <h1>DashBoard</h1>
     {workspaces.map((w)=>(
      <div key={w.id}>
        <p>{w.name}</p>
      </div>
     ))}

     <button onClick={handleLogout} className="bg-red-600 rounded-2xl p-2 font-bold">Logout</button>
    </div>
  )
}

export default Dashboard
