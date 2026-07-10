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
       setError(e.response?.data?.message )
       }finally{
        setLoading(false)
       }
  }
  return (
    <div className='relative min-h-screen flex justify-center items-center bg-zinc-950 overflow-hidden px-4'>
      <div className='absolute inset-0'>
           <div className='absolute inset-0 opacity-[0.03]'>
      <div className='h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]'/>
           </div>
           <div className='absolute top-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/20 blur-[100px]'/>
           <div className='absolute bottom-[-10rem] right-[-10rem] h-[25rem] w-[25rem] rounded-full bg-blue-500/20 blur-[100px]'/>
      </div>
      <div className='z-10 w-full max-w-md rounded-3xl border border-zinc-800 border-zinc-900/70 px-8 py-10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.4) transition-all duration-300 hover:border-zinc-700'>
      <div className='mb-8 text-center'>
      <h1 className='text-xl font-semibold text-zinc-100 tracking-tight'>Stack<span className='text-orange-400'>Ops</span></h1>
      <h2 className='mt-4 text-3xl font-semibold text-zinc-100 tracking-tight'>Create your account</h2>
      <p className='text-zinc-400 mt-2 text-sm'>Start organizing work and collaborating smarter.</p>
      </div>
      <form onSubmit={handleSignup}>
        <div>
          <label className='mb-2  block text-sm font-medium text-zinc-300'>Name</label>
        <input  className='w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition-all
    placeholder:text-zinc-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400'
        type="text" placeholder='John Doe' value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
       <div>
        <label className='mb-2  block text-sm font-medium text-zinc-300'>Email</label>
        <input className='w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition-all
    placeholder:text-zinc-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400'
        type="email" placeholder='name@company.com' value={email} onChange={(e)=>setEmail(e.target.value)} />    
        </div>
        <div>
          <label className='mb-2  block text-sm font-medium text-zinc-300'>Password</label>
        <input className='w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition-all
    placeholder:text-zinc-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400'
         type="password" placeholder='Create a password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
         {error&&(
          <p className='text-sm font-medium text-red-400/90'>{error}</p>
         )  }
        <button  className=' mt-4 w-full rounded-xl bg-orange-500  px-4 py-3 font-medium text-zinc-950 transition-all duration-200 hover:bg-orange-400 disabled:cursor-not-allowed
disabled-opacity-50'
        type='submit' disabled={loading}>{loading?'Creating account...':'Create account'}</button>
      </form>
      <p className='mt-6 text-center text-sm text-zinc-400 gap-y-2'>
    Already have an account?{""}
    <span onClick={()=>navigate('/login')} className='cursor-pointer font-medium text-orange-400 transition-colors hover:text-orange-300'>
       Sign In
    </span>
    </p>
      </div>
    </div>

  )
}

export default Signup
