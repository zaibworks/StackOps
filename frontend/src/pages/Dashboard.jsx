import { useState,useEffect } from "react"
import api from '../api/axios.js'
import { useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { Plus,X,MoreVertical,Pencil,Trash2, FolderKanban, Users, CheckSquare, Activity, LogOut, Flag } from "lucide-react";
import UpdateWorkspaceModal from "../components/workspace/UpdateWorkspaceModal.jsx";
import DeleteWorkspaceModal from "../components/workspace/DeleteWorkspaceModal.jsx";
import LeaveWorkspaceModal from "../components/workspace/LeaveWorkspaceModal.jsx";
import Navbar from "../components/major/Navbar.jsx";
import Sidebar from "../components/major/Sidebar.jsx";
import Loader from "../components/Loader.jsx"
import {
  CheckCircle2,
  UserPlus,
  MessageSquare,
  Rocket,
} from "lucide-react";
import StatsCards from "../components/dashboard/StatsCards.jsx";


const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [userLoading, setuserLoading] = useState(true)       
  const [error, setError] = useState('')
  const [showCreateModal, setshowCreateModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [showUpdateModal, setshowUpdateModal] = useState(false)
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [user, setUser] = useState(null)
 const [mystats, setMyStats] = useState({
  totalWorkspaces: 0,
  ownedWorkspaces: 0,
  assignedTasks: 0,
  totalActivities: 0
});

  const navigate = useNavigate()
  

 useEffect(() => {
  const fetchWorkspaces = async () => {
    try {
      const response = await api.get('/workspace')
      setWorkspaces(response.data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await api.get('/user/stats')
      setMyStats(response?.data?.data)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchUser = async () => {
    try {
      const response = await api.get("/user/me")
      setUser(response.data)
    } catch (err) {
      console.log(err)
      setUser(null)
    } finally {
      setuserLoading(false)
    }
  }

  fetchUser()
  fetchWorkspaces()
  fetchStats()
}, [])

  const searchData = workspaces.map(w => ({
  id: w.id,
  type: "workspace",
  name: w.name
}))

  console.log(user)


const handleLogout = async () => {
  try {
    await api.post('/auth/logout');
    setUser(null);
    setWorkspaces([]);
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

  const addWorkspace = async(e)=>{
    e.preventDefault()
     if (!name.trim()) {
   setError('Workspace name required')
     return
     }
     if (creating) return
    setError('')
    setCreating(true)
    try {
      const response = await api.post('/workspace',{
        name
      })
      setWorkspaces((prev)=>[
        ...prev,response.data
      ])
      setName('')
      navigate(`/workspace/${response?.data?.id}`)
      setShowCreateModal(false)
      setError('')
    } catch (err) {
       setError(err.response?.data?.message || 'Something went wrong')
    }finally{
      setCreating(false)
    }
  }

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const handleWorkspaceUpdated = (updatedWorkspace) => {
  setWorkspaces(prev =>
    prev.map(w =>
      w.id === updatedWorkspace.id
        ? updatedWorkspace
        : w
    )
  )
  setOpenMenuId(null)
}
const handleDeleteWorkspace = (deletedWorkspace)=>{
  setWorkspaces(prev=>prev.filter(w=> w.id !== deletedWorkspace.id))
}
const handleWorkspaceLeft = (workspace) => {
  setWorkspaces(prev =>
    prev.filter(w => w.id !== workspace.id)
  );

  setOpenMenuId(null);
};

const lastOpenedWorkspace = async (workspaceId)=>{
  console.log("Hitting API with:", workspaceId)
    const res = await api.patch(`/workspace/${workspaceId}/open`);
    console.log("Response:", res.data)
  return res.data;
}

  if (loading && userLoading) return <Loader text="Loading your Dashboard Panel" />
  return (
    <>
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
    <Navbar searchData={searchData} searchType="workspace"/>
      <div className="flex flex-1 overflow-hidden">
     {/* Sidebar component - extracted from lines 116-194 */}
     <Sidebar user={user} workspaces={workspaces}/>


 <main className="flex-1 p-8 overflow-y-auto main-scrollbar">
  <div className="mb-5 flex items-center justify-between px-1">
     <div>
       <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
           Dashboard
       </h1>
       <p className="mt-1 text-sm text-zinc-500">
        Manage you workspaces and track your activity
       </p>
     </div>
<button  onClick={()=>setshowCreateModal(true)}
className=" flex cursor-pointer items-center gap-2 rounded-lg bg-orange-400 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-orange-500">
<Plus size={16}/> 
Create
</button>
  </div>


  {/* Stats Section  */}

<StatsCards mystats={mystats}/>



{
/* 
------------------------------
Recent Workspaces ------------
------------------------------
*/}

<div className="mt-5 grid min-h-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(210px,0.95fr)]">

  {/* ==================== RECENT WORKSPACES ==================== */}
  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">

    {/* Header */}
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-zinc-100">
        Recent Workspaces
      </h2>

      <button
        onClick={() => navigate("/dashboard/workspaces")}
        className="text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
      >
        View all
      </button>
    </div>

    {/* Workspace Content */}
    <div className="min-h-[210px]">

      {workspaces.length === 0 ? (

        /* ==================== EMPTY STATE ==================== */
        <div className="flex h-[240px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-800 text-center">
          <div className="rounded-full bg-orange-500/10 p-3 text-orange-400">
            <FolderKanban size={22} />
          </div>

          <div>
            <p className="font-medium text-zinc-200">
              No workspaces yet
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Create your first workspace to start organizing tasks.
            </p>
          </div>

          <button
            onClick={() => setshowCreateModal(true)}
            className="mt-1 flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-all hover:bg-white"
          >
            <Plus size={16} />
            Create Workspace
          </button>
        </div>

      ) : (

        /* ==================== WORKSPACES ==================== */
        <div className="space-y-2">

          {workspaces.slice(0, 3).map((workspace, index) => {

            const isNearBottom =
              index >= workspaces.slice(0, 3).length - 2;

            return (
              <div
                key={workspace.id}
                onClick={() => {
                  navigate(`/workspace/${workspace.id}`);
                  lastOpenedWorkspace(workspace.id);
                }}
                className="group relative flex cursor-pointer items-center justify-between rounded-xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-zinc-800 hover:bg-zinc-900/70"
              >

                {/* Left */}
                <div className="flex min-w-0 items-center gap-4">

                  {/* Workspace Avatar */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-orange-400 to-cyan-500 text-xl font-medium text-zinc-950">
                    {workspace.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* Workspace Info */}
                  <div className="min-w-0">

                    <h3 className="truncate text-base font-semibold text-zinc-100">
                      {workspace.name}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-zinc-500">

                      <span className="rounded-full bg-zinc-800 px-2 py-0.5 font-medium text-zinc-300">
                        {workspace.members?.[0]?.role
                          ?.charAt(0)
                          .toUpperCase() +
                          workspace.members?.[0]?.role?.slice(1)}
                      </span>

                      <span>•</span>

                      <span>
                        {workspace._count.members}{" "}
                        {workspace._count.members < 2
                          ? "Member"
                          : "Members"}
                      </span>

                      <span>•</span>

                      <span>
                        Updated {formatDate(workspace.updatedAt)}
                      </span>

                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex shrink-0 items-center gap-5">

                  {/* Progress Circle */}
                  <div
                    className="relative flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      background:
                        "conic-gradient(#f97316 0deg 234deg, #27272a 234deg 360deg)",
                    }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950">
                      <span className="text-xs font-semibold text-zinc-200">
                        65%
                      </span>
                    </div>
                  </div>

                  {/* Menu */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      setOpenMenuId(
                        openMenuId === workspace.id
                          ? null
                          : workspace.id
                      );
                    }}
                    className="cursor-pointer rounded-lg p-2 text-zinc-500 opacity-0 transition-all hover:bg-zinc-800 hover:text-zinc-300 group-hover:opacity-100"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown */}
                  {openMenuId === workspace.id && (
                    <div
                      className={`absolute right-4 z-[200] w-40 rounded-xl border border-zinc-800 bg-zinc-900 text-xs shadow-xl ${
                        isNearBottom
                          ? "bottom-12"
                          : "top-12"
                      }`}
                    >

                      {workspace.members?.[0]?.role === "admin" ? (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWorkspace(workspace);
                              setshowUpdateModal(true);
                            }}
                            className="flex w-full items-center gap-2 rounded-t-xl px-3 py-2.5 text-left hover:bg-zinc-800"
                          >
                            <Pencil size={12} />
                            Rename
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWorkspace(workspace);
                              setShowDeleteModal(true);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-red-400 hover:bg-zinc-800"
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWorkspace(workspace);
                              setShowLeaveModal(true);
                            }}
                            className="flex w-full items-center gap-2 rounded-b-xl px-3 py-2.5 text-left text-red-400 hover:bg-zinc-800"
                          >
                            <LogOut size={12} />
                            Leave
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWorkspace(workspace);
                            setShowLeaveModal(true);
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-red-400 hover:bg-zinc-800"
                        >
                          <LogOut size={12} />
                          Leave
                        </button>
                      )}

                    </div>
                  )}
                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  </div>


  {/* ==================== RECENT ACTIVITY ==================== */}
  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">

    {/* Header */}
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-zinc-100">
        Recent Activity
      </h2>
    </div>

    {/* Activities */}
    <div className="space-y-5">

      {/* Activity 1 */}
      <div className="flex items-start gap-4">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium leading-5 text-zinc-200">
            Task 'Configure DNS' marked done
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            3h ago
          </p>
        </div>

      </div>


      {/* Activity 2 */}
      <div className="flex items-start gap-4">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
          <UserPlus size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium leading-5 text-zinc-200">
            You renamed workspace HostingZaib 
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            2d ago
          </p>
        </div>

      </div>

    </div>
  </div>

</div>
 </main>
      </div>

      {showCreateModal && (
        <div
       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
           onClick={() => setshowCreateModal(false)}
  >
    <form
      onSubmit={addWorkspace}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-2xl rounded-3xl border border-zinc-800 backdrop-blur-lg shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-zinc-800 p-6">
          <h2 className="text-2xl font-semibold text-zinc-100">
            Create Workspace
          </h2>

        <button
          type="button"
          onClick={() => setshowCreateModal(false)}
          className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          <X size={18}/>
        </button>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6">
        {/* Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Workspace Name
          </label>

          <input
            type="text"
            value={name}
            maxLength={50}
            placeholder="Enter workspace name..."
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition-colors focus:border-orange-500"
          />

          <div className="mt-2 flex justify-end">
            <span className="text-xs text-zinc-500">
              {name.length}/50
            </span>
          </div>
        </div>

        {/* Helper Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
          <p className="text-sm text-orange-300">
            A workspace contains members, tasks and activity. You can invite
            teammates and collaborate after creating it.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">
        <button
          type="button"
          onClick={() => setshowCreateModal(false)}
          className="rounded-xl px-5 py-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={creating}
          className="rounded-xl bg-zinc-100 px-6 py-2 font-medium text-zinc-900 transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  </div>
)}
{showUpdateModal&&(
  <UpdateWorkspaceModal 
  isOpen={showUpdateModal} 
  onClose={()=>setshowUpdateModal(false)} 
  workspace={selectedWorkspace} 
  onSuccess={handleWorkspaceUpdated} />
)}
{showDeleteModal&&(
  <DeleteWorkspaceModal
   isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  workspace={selectedWorkspace}
  onDone={handleDeleteWorkspace}
  />
)}
{showLeaveModal&&(
  <LeaveWorkspaceModal
  isOpen={showLeaveModal}
  onClose={() => setShowLeaveModal(false)}
  workspace={selectedWorkspace}
  onDone={handleWorkspaceLeft}
/>
)}
  </div>
 </>
  )
}

export default Dashboard
