import { Navigate } from "react-router-dom";

type ProviderType={
  children:React.ReactNode
}

const ProtectedRoute=({children}:ProviderType)=>{
    const token = localStorage.getItem('token')

    if(!token){
        return <Navigate to="/login"/>
    }
    return children
}

export default ProtectedRoute
