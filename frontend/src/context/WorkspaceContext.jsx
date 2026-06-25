import { createContext,useContext,useState} from "react";


const WorkspaceContext = createContext()

export const WorkspaceProvider =({children})=>{
    const [workspaces, setWorkspaces] = useState([])
return(
<WorkspaceContext.Provider value={{workspaces,setWorkspaces}}>
       {children}
</WorkspaceContext.Provider>
)
}

export const useWorkspace = ()=>{
    return useContext(WorkspaceContext)
}