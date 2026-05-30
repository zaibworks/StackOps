import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Workspace from './pages/Workspace'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext.jsx'


function App() {
  return (
    <AuthProvider>
       <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={
       <ProtectedRoute>
         <Dashboard/>
       </ProtectedRoute>
        }/>
        <Route path='/workspace/:workspaceId' element={<ProtectedRoute>
          <Workspace/>
        </ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App
