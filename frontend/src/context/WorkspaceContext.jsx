import { createContext,useContext,useState,useEffect} from "react";
import api from "../api/axios.js";


const WorkspaceContext = createContext()

export const WorkspaceProvider =({children})=>{
    const [workspaces, setWorkspaces] = useState([])
    const [loading, setLoading] = useState(true)

   useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await api.get('/workspace')
        setWorkspaces(response.data)
      } catch (e) {
        console.log(e)
      }finally{
        setLoading(false)
      }
    }
    fetchWorkspaces()
  }, [])
    
return(
<WorkspaceContext.Provider value={{workspaces,setWorkspaces,loading}}>
       {children}
</WorkspaceContext.Provider>
)
}

export const useWorkspace = ()=>{
    return useContext(WorkspaceContext)
}