import axios from 'axios'

const api = axios.create({
<<<<<<< HEAD
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001"
})


//interceptors

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
=======
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
  withCredentials: true
>>>>>>> typescript
})

// Interceptors
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api