import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../api/axios.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  return (
    <div>

    </div>
  )
}

export default Login
