import { createContext,useContext,useState,useEffect} from "react";
import api from "../api/axios.js";

type WorkspaceProvideProps={
  children:React.ReactNode
}

type memberType={
  role:string
}

type taskType={
  assignedToId:number | null
  status:string
}

type worksapceCount={
  members:number
  tasks:number
}

interface workspaceType{
  id:number
  name:string
  createdAt:string
  updatedAt:string
  members:memberType[]
  tasks:taskType[]
  _count: worksapceCount
}
interface WorkspaceContextType{
  workspaces: workspaceType | null
  setWorkspaces: React.Dispatch<React.SetStateAction<workspaceType | null>>
  loading:boolean
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null)

export const WorkspaceProvider =({children}:WorkspaceProvideProps)=>{
    const [workspaces, setWorkspaces] = useState<workspaceType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

   useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await api.get('/workspace')
        setWorkspaces(response.data)
        console.log(response.data)
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