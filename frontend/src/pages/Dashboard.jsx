import { useState,useEffect } from "react"
import api from '../api/axios.js'
import { useNavigate } from "react-router-dom"


const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [newworkspace, setNewworkspace] = useState([])
  const [error, setError] = useState('')
  const [name, setName] = useState('')

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

  const addWorkspace = async(e)=>{
    e.preventDefault()
    setError('')
    try {
      const response = await api.post('/workspace/',{
        name
      })
    } catch (err) {
       setError(e.response?.message || 'Something went wrong')
    }
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
     <div>
     <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
     <button onClick={addWorkspace}>Create</button>

     </div>
    </div>
  )
}

export default Dashboard
