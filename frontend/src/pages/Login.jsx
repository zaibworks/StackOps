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
      const
    }
  }
  return (
    <div>

    </div>
  )
}

export default Login
