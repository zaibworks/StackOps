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
    <div className='relative min-h-screen flex justify-center items-center bg-zinc-950 overflow-hidden px-4'>
      <div className='absolute inset-0'>
           <div className='absolute inset-0 opacity-[0.03]'>
      <div className='h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px 40px]'/>
           </div>
           <div className='absolute top-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/20 blur-[100px]'/>
           <div className='absolute bottom-[-10rem] right-[-10rem] h-[25rem] w-[25rem] rounded-full bg-cyan-500/20 blue-[100px]'/>
      </div>
      <div className='z-10 w-full max-w-md rounded-3xl border border-zinc-800 border-zinc-900/70 px-8 py-10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.4) transition-all duration-300 hover:border-zinc-700'>
      <h1>Signup in StackOps</h1>
      {error&& <p>{error}</p> }
      <form onSubmit={handleSignup}>
        <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit' disabled={loading}>{loading?'Signing In...':'Signup'}</button>
      </form>

      </div>
    </div>
  )
}

export default Signup
