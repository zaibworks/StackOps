import { useState,useEffect } from "react"
import api from '../api/axios.js'
import { useNavigate } from "react-router-dom"


const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchWorkspaces = async()=>{
      try{
        const response = await api.get('/workspace')
        setWorkspaces(response.data)

      }catch(e){
         setError(e.response?.data?.message || "Failed to get workspaces")
      }finally{
        setLoading(false)
      }
    }
    fetchWorkspaces()
  }, [])

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  const addWorkspace = async(e)=>{
    e.preventDefault()
     if (!name.trim()) {
   setError('Workspace name required')
     return
     }
     if (creating) return
    setError('')
    setCreating(true)
    try {
      const response = await api.post('/workspace',{
        name
      })
      setWorkspaces((prev)=>[
        ...prev,response.data
      ])
      setName('')
    } catch (err) {
       setError(err.response?.data?.message || 'Something went wrong')
    }finally{
      setCreating(false)
    }
  }

  if (loading) return <h1>Loading...</h1>
  return (
    <div>
      <h1>DashBoard</h1>
      {error && <p>{error}</p>}
     {workspaces.map((w)=>(
      <div key={w.id}>
        <p>{w.name}</p>
      </div>
     ))}
     <button onClick={handleLogout} className="bg-red-600 rounded-2xl p-2 font-bold">Logout</button>
     <form onSubmit={addWorkspace}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <button type="submit" disabled={creating} className="bg-yellow-500 rounded-2xl p-2 font-bold">
         {creating ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>

  )
}

export default Dashboard
