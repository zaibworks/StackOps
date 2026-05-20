import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

const Signup = () => {
   const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name, setName] = useState('')
  const [error,setError]=useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignup = async (e)=>{
       e.preventDefault()
       setLoading(true)
       setError('')
       try{
        const response = await api.post('/auth/signup',{
          name,
          email,
          password
        })
          // const token = response.data.token
          // localStorage.setItem('token',token)
          navigate('/login')
       }catch(e){
       setError(e.response?.message ||'Signup failed')
       }finally{
        setLoading(false)
       }
  }
  return (
    <div>
      <h1>Signup in StackOps</h1>
      {error&& <p>{error}</p> }
      <form onSubmit={handleSignup}>
        <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit' disabled={loading}>{loading?'Signing In...':'Signup'}</button>
      </form>
    </div>
  )
}

export default Signup
