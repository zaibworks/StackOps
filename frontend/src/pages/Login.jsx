import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../api/axios.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    setError('')
    try{
      const response = await api.post('/auth/login',{
        email,
        password
      })
      const token = response.data.token
        localStorage.setItem('token', token)
         navigate('/dashboard')
    }catch(e){
      setError(e.response?.message ||'Login failed')
    }finally{
      setLoading(false)
    }
  }
  return (
    <div>
   <h1>Login to StackOps</h1>
   {error && <p>{error}</p>}
   <form onSubmit={handleSubmit}>
    <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
    <button type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
   </form>
    </div>
  )
}

export default Login
