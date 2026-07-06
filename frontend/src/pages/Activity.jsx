import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { ActivityIcon } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext.jsx";
import Loader from "../components/Loader.jsx";

const Activity = () => {
const [activities, setActivities] = useState([]);
const [loading, setLoading] = useState(true);

const { user, setUser } = useAuth();
const {workspaces} = useWorkspace();

console.log(activities)

useEffect(() => {
const fetchActivities = async () => {
try {
const response = await api.get("/activities");

    setActivities(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

fetchActivities();

}, []);

const handleLogout = () => {
localStorage.removeItem("token");
setUser(null);
};

if (loading) {
return <Loader text={"Getting your activities"}/>;
}

return (
<div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
<Navbar />

  <div className="flex flex-1 overflow-hidden">
    <Sidebar user={user} onLogout={handleLogout} workspaces={workspaces} />

    <main className="flex-1 p-8 overflow-hidden flex flex-col">

      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-semibold tracking-tight">
          Activity Feed
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Track everything happening across your workspaces
        </p>
      </header>


      <div className="flex-1 overflow-y-auto rounded-2xl border border-zinc-800 main-scrollbar">

        {activities.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-20 text-center">
    <div className="rounded-full bg-orange-500/10 p-3 text-orange-400">
      <ActivityIcon size={22} />
    </div>
    <div>
      <p className="font-medium text-zinc-200">
        No activity yet
      </p>
      <p className="mt-1 text-sm text-zinc-500">
        Actions across your workspaces will show up here.
      </p>
    </div>
  </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="border-b border-zinc-800 p-5 hover:bg-zinc-900/40 transition-colors"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm">
                    <span className="font-semibold text-orange-400">
                      {activity.user.name}
                    </span>

                    <span className="ml-2 text-zinc-300">
                      {activity.action}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Workspace: {activity.workspace.name}
                  </p>
                </div>

                <p className="text-xs text-zinc-500">
                  {new Date(
                    activity.createdAt
                  ).toLocaleString()}
                </p>

              </div>
            </div>
          ))
        )}
      </div>
    </main>
  </div>
</div>

)
}

export default Activity