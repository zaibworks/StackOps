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
    </div>
  )
}

export default Login
