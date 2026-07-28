import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import ProtectedRoute from "./components/ProtectedRoute";
import Activity from "./pages/Activity";
import MyTasks from "./pages/MyTasks";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import { WorkspaceProvider } from "./context/WorkspaceContext";

function App() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/mytasks" element={<MyTasks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Home/>}/>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workspace/:workspaceId"
              element={
                <ProtectedRoute>
                  <Workspace />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;
