import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import TaskCard from "../components/TaskCard.jsx";
import {
  UserX,
  Clock3,
  CheckCircle2,
  ChevronDown,
  Pencil,
  Trash2,
  Bolt,
  CheckSquare,
  Users,
  SquareCheckBig,
  UserPlus,
  Plus,
  Settings,
  SlidersHorizontal,
  MoreVertical,
  X,
} from "lucide-react";
import Navbar from "../components/major/Navbar.jsx";
import InviteModal from "../components/workspace/InviteModal.jsx";
import WorkspaceSettingsModal from "../components/WorkspaceSettingsModal.jsx";
import Loader from "../components/Loader.jsx";
import MemberCard from "../components/workspace/MemberCard.js";
import { useAuth } from "../context/AuthContext.jsx";
import AddTaskModal from "../components/workspace/AddTaskModal.jsx";

const Workspace = () => {
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");;
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openAddTask, setOpenAddTask] = useState(false)
  const [isOpenWorkspaceSettings, setisOpenWorkspaceSettings] = useState(false);

  const { user } = useAuth();

  const currentMember = workspace?.members?.find((m) => m.user.id === user?.id);
  const isAdmin = currentMember?.role === "admin";

  const fetchTasks = async () => {
    const res = api.get();
  };

  const [openTaskMenuId, setopenTaskMenuId] = useState(null);
  const [editMode, seteditMode] = useState(false);

  const [openInviteModal, setopenInviteModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedToId: "",
    unassigned: false,
    overdue: false,
  });

  const filteredTasks = workspace?.tasks?.filter((task) => {
    const statusMatch = !filters.status || task.status === filters.status;

    const priorityMatch =
      !filters.priority || task.priority === filters.priority;

    const assigneeMatch =
      !filters.assignedToId ||
      task.assignedTo?.id === Number(filters.assignedToId);

    const unassignedMatch = !filters.unassigned || !task.assignedTo;

    const overdueMatch =
      !filters.overdue ||
      (task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "done");

    return (
      statusMatch &&
      priorityMatch &&
      assigneeMatch &&
      unassignedMatch &&
      overdueMatch
    );
  });

  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const fetchWorkspace = async () => {
    try {
      const response = await api.get(`/workspace/${workspaceId}`);
      setWorkspace(response.data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspace();
  }, []);

  const refreshWorkspace = async () => {
    try {
      const response = await api.get(`/workspace/${workspaceId}`);
      const updatedWorkspace = response.data.data;
      setWorkspace(updatedWorkspace);

      // selectedTask ko bhi fresh data se sync kiya isme
      setSelectedTask((prev) => {
        if (!prev) return prev;
        const updatedTask = updatedWorkspace.tasks.find(
          (t) => t.id === prev.id,
        );
        return updatedTask || prev;
      });
    } catch (e) {
      console.log(e);
    }
  };

  const overdueCount =
    workspace?.tasks?.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "done",
    ).length || 0;

  const unassignedCount =
    workspace?.tasks?.filter((task) => !task.assignedTo).length || 0;

  const totalTasks = workspace?.tasks?.length || 0;

  const completedTasks =
    workspace?.tasks?.filter((task) => task.status === "done").length || 0;

  const completedPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleEdit = (task) => {
    seteditMode(true);
    setSelectedTask(task);
  };

  const handleClose = () => {
    seteditMode(false);
    setSelectedTask(null);
  };

  const handleDelete = async (task) => {
    try {
      await api.delete(`/task/${workspaceId}/${task.id}`);

      await fetchWorkspace();

      setopenTaskMenuId(null);

      if (selectedTask?.id === task.id) {
        setSelectedTask(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (taskId, status) => {
    try {
      await api.put(`/task/${workspaceId}/${taskId}`, {
        status,
      });

      await refreshWorkspace();
    } catch (err) {
      console.log(err);
    }
  };

  const myAssignedTasks =
    workspace?.tasks?.filter((task) => task.assignedToId === user?.id) || [];

  const myCompletedTasks = myAssignedTasks.filter(
    (task) => task.status === "done",
  ).length;

  // searchdata-----------

  const searchData = [
    ...(workspace?.tasks?.map((task) => ({
      id: task.id,
      type: "task",
      name: task.title,
    })) || []),

    ...(workspace?.members?.map((member) => ({
      id: member.user.id,
      type: "member",
      name: member.user.name,
    })) || []),
  ];

  const taskSelect = (taskId) => {
    const task = workspace.tasks.find((t) => t.id === taskId);

    if (task) {
      setSelectedTask(task);
      setSelectedMember(null);
    }
  };
  const memberSelect = (memberId) => {
    const member = workspace.members.find((m) => m.user.id === memberId);
    if (member) {
      setSelectedMember(member);
      setSelectedTask(null);
    }
  };

  const priorityStyles = {
    low: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    medium: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    high: "border-red-500/20 bg-red-500/10 text-red-400",
  };

  const statusStyles = {
    todo: "border-zinc-600/30 bg-zinc-600/10 text-zinc-400",
    inprogress: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    done: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  };

  if (loading) return <Loader text="Loading your workspace" />;

  return (
    <>
      <div className="h-screen bg-zinc-950 text-zinc-100 overflow-hidden flex flex-col">
        <Navbar
          searchData={searchData}
          searchType="workspace-page"
          onTaskSelect={taskSelect}
          onMemberSelect={memberSelect}
        />
        {/* header section */}

        <div className="mb-5 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/40 px-5 py-4">
          {/* Left Side */}
          <div className="flex flex-col gap-2">
            {/* Workspace Info */}
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-orange-400 to-cyan-500 text-xl font-medium text-zinc-950">
                {workspace.name?.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
                  {workspace?.name}
                </h1>

                {/* <div className="h-5 w-px bg-zinc-800" /> */}

                <div className="flex gap-2">
                  <span className="flex items-center justify-center py-1 gap-1.5 rounded-full border border-zinc-800 px-3 bg-[#1b1b1b]  text-zinc-400 text-xs">
                    <Users size={12} /> {workspace?.members?.length || 0}{" "}
                    Members
                  </span>

                  <span className="flex items-center justify-center py-1 gap-1.5 rounded-full border border-zinc-800 px-3 bg-[#1b1b1b] text-zinc-400 text-xs">
                    <SquareCheckBig size={12} /> {workspace?.tasks?.length || 0}{" "}
                    Tasks
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setopenInviteModal(true)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
            >
              <UserPlus size={14} />
              Invite Member
            </button>

            <button
              onClick={() => {
                setOpenAddTask(true);
                setError("");
              }}
              className="flex items-center gap-1.5 rounded-lg bg-orange-400 px-4 py-2 text-sm font-medium text-zinc-900 transition-all hover:bg-orange-500 cursor-pointer"
            >
              <Plus size={14} />
              Add Task
            </button>

            {isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setisOpenWorkspaceSettings((prev) => !prev)}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors p-2 hover:bg-zinc-400/30 rounded-lg border border-zinc-500"
                >
                  <Settings size={17} />
                </button>
                {isOpenWorkspaceSettings && (
                  <>
                    <WorkspaceSettingsModal
                      isOpen={isOpenWorkspaceSettings}
                      onClose={() => setisOpenWorkspaceSettings(false)}
                      workspace={workspace}
                      onDone={fetchWorkspace}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>

     
        {openInviteModal && (
          <InviteModal
            workspaceId={workspaceId}
            onClose={() => setopenInviteModal(false)}
            onInviteSuccess={fetchWorkspace}
          />
        )}

        {/* ------------------------------ */}
        {/* Main Content  */}
        {/* ------------------------------ */}

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto px-4 pb-4 custom-scrollbar lg:grid-cols-12 lg:overflow-hidden lg:px-5">
          {/* LEFT SIDE — TASKS */}
          <section className="flex min-h-[420px] min-w-0 flex-col lg:col-span-8 lg:min-h-0">
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
              {/* Tasks Header */}
              <div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-4 sm:px-5">
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-zinc-100">
                    Tasks
                  </h2>
                  <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                    Manage all workspace tasks
                  </p>
                </div>

                {workspace.tasks.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    aria-expanded={showFilters}
                    className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                      showFilters
                        ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                        : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/70"
                    }`}
                  >
                    <SlidersHorizontal size={14} />
                    Filters
                  </button>
                )}

                {/* Filters Dropdown */}
                {showFilters && (
                  <div className="absolute right-4 top-[4.25rem] z-40 w-56 space-y-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl shadow-black/30">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-zinc-100">
                        Filter tasks
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowFilters(false)}
                        className="rounded-md p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                        aria-label="Close filters"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                        Status
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-orange-500/50"
                      >
                        <option value="">All statuses</option>
                        <option value="todo">Todo</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                        Priority
                      </label>
                      <select
                        value={filters.priority}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priority: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-orange-500/50"
                      >
                        <option value="">All priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    {/* Assignee */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                        Assignee
                      </label>
                      <select
                        value={filters.assignedToId}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            assignedToId: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-orange-500/50"
                      >
                        <option value="">All members</option>
                        {workspace?.members?.map((member) => (
                          <option key={member.user.id} value={member.user.id}>
                            {member.user.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          status: "",
                          priority: "",
                          assignedToId: "",
                          overdue: false,
                          unassigned: false,
                        }))
                      }
                      className="w-full rounded-lg border border-zinc-800 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>

              {/* Tasks List */}
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 custom-scrollbar sm:p-4">
                {workspace.tasks.length === 0 ? (
                  <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 px-4 py-10 text-center">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/15 bg-orange-500/10 text-orange-400">
                      <CheckSquare size={21} />
                    </div>

                    <p className="text-sm font-medium text-zinc-200">
                      No tasks yet
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-zinc-500 sm:text-sm">
                      Create your first task to get this workspace moving.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setOpenAddTask(true);
                        setError("");
                      }}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-orange-400"
                    >
                      <Plus size={15} />
                      Add Task
                    </button>
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 px-4 py-10 text-center">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-400">
                      <Search size={18} />
                    </div>
                    <p className="text-sm font-medium text-zinc-200">
                      No tasks match your filters
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Try adjusting or clearing your filters.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          status: "",
                          priority: "",
                          assignedToId: "",
                          overdue: false,
                          unassigned: false,
                        }))
                      }
                      className="mt-3 text-xs font-medium text-orange-400 hover:text-orange-300"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  filteredTasks.map((t, index) => {
                    const isNearBottom =
                      filteredTasks.length > 3 &&
                      index >= filteredTasks.length - 2;

                    const isCreator = t.user?.id === user?.id;
                    const canEditTask = isAdmin || isCreator;

                    const priorityAccent = {
                      low: "border-l-emerald-500",
                      medium: "border-l-orange-500",
                      high: "border-l-rose-500",
                    };

                    const statusDot = {
                      todo: "bg-zinc-400",
                      inprogress: "bg-blue-400",
                      done: "bg-emerald-400",
                    };

                    const priorityLabel = {
                      low: "Low",
                      medium: "Medium",
                      high: "High",
                    };

                    const statusLabel = {
                      todo: "Todo",
                      inprogress: "In Progress",
                      done: "Completed",
                    };

                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTask(t)}
                        className={`group cursor-pointer rounded-lg border border-zinc-800/90 border-l-2 ${
                          priorityAccent[t.priority] || "border-l-zinc-600"
                        } bg-zinc-950/40 px-3 py-3 transition-colors hover:border-zinc-700 hover:bg-zinc-950/80 sm:px-4`}
                      >
                        {/* Task title and actions */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-medium text-zinc-100">
                              {t.title}
                            </h3>
                            <p className="mt-1 line-clamp-1 text-xs text-zinc-500 sm:text-sm">
                              {t.content || "No description"}
                            </p>
                          </div>

                          {canEditTask && (
                            <div className="relative shrink-0">
                              <button
                                type="button"
                                aria-label={`Actions for ${t.title}`}
                                aria-expanded={openTaskMenuId === t.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setopenTaskMenuId(
                                    openTaskMenuId === t.id ? null : t.id,
                                  );
                                }}
                                className={`rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200 ${
                                  openTaskMenuId === t.id
                                    ? "bg-zinc-800 text-zinc-200"
                                    : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                                }`}
                              >
                                <MoreVertical size={17} />
                              </button>

                              {openTaskMenuId === t.id && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className={`absolute right-0 z-50 w-40 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 py-1 shadow-xl ${
                                    isNearBottom
                                      ? "bottom-full mb-1"
                                      : "top-full mt-1"
                                  }`}
                                >
                                  <button
                                    type="button"
                                    onClick={() => handleEdit(t)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                                  >
                                    <Pencil size={14} />
                                    Edit task
                                  </button>

                                  <div className="border-y border-zinc-800/80 px-3 py-2">
                                    <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                                      Change status
                                    </label>
                                    <select
                                      value={newStatus}
                                      onChange={(e) =>
                                        handleStatus(t.id, e.target.value)
                                      }
                                      className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-xs text-zinc-200 outline-none focus:border-orange-500/50"
                                    >
                                      <option value="todo">Todo</option>
                                      <option value="inprogress">
                                        In Progress
                                      </option>
                                      <option value="done">Completed</option>
                                    </select>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleDelete(t);
                                      setopenTaskMenuId(null);
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-rose-400 transition-colors hover:bg-rose-500/10"
                                  >
                                    <Trash2 size={14} />
                                    Delete task
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Priority, status, assignee and due date */}
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-md border px-2 py-1 text-[10px] font-medium sm:text-xs ${
                                priorityStyles[t.priority]
                              }`}
                            >
                              {priorityLabel[t.priority] || t.priority}
                            </span>

                            <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-[10px] text-zinc-400 sm:text-xs">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  statusDot[t.status] || "bg-zinc-500"
                                }`}
                              />
                              {statusLabel[t.status] || t.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-zinc-500 sm:text-xs">
                            <span className="inline-flex items-center gap-1.5">
                              <Users size={12} />
                              {t.assignedTo?.name || "Unassigned"}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock3 size={12} />
                              {t.dueDate
                                ? new Date(t.dueDate).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )
                                : "No Due Date"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* TASK DETAILS MODAL — existing functionality preserved */}
          {selectedTask && (
            <TaskCard
              task={selectedTask}
              workspace={workspace}
              onClose={handleClose}
              onTaskUpdate={refreshWorkspace}
              startInEditMode={editMode}
            />
          )}

          {/* RIGHT SIDE — STATS + MEMBERS */}
          <section className="flex min-w-0 flex-col gap-4 lg:col-span-4 lg:min-h-0">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* Overdue */}
              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    overdue: !prev.overdue,
                    unassigned: false,
                  }))
                }
                aria-pressed={filters.overdue}
                className={`min-w-0 rounded-xl border p-3 text-left transition-colors ${
                  filters.overdue
                    ? "border-rose-500/40 bg-rose-500/10"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-rose-500/30"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] text-zinc-500 sm:text-xs">
                    Overdue
                  </p>
                  <Clock3 size={15} className="shrink-0 text-rose-400" />
                </div>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-rose-400 sm:text-2xl">
                  {overdueCount}
                </h3>
              </button>

              {/* Unassigned */}
              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    unassigned: !prev.unassigned,
                    overdue: false,
                  }))
                }
                aria-pressed={filters.unassigned}
                className={`min-w-0 rounded-xl border p-3 text-left transition-colors ${
                  filters.unassigned
                    ? "border-orange-500/40 bg-orange-500/10"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-orange-500/30"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] text-zinc-500 sm:text-xs">
                    Unassigned
                  </p>
                  <UserX size={15} className="shrink-0 text-orange-400" />
                </div>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-orange-400 sm:text-2xl">
                  {unassignedCount}
                </h3>
              </button>

              {/* Completed */}
              <div className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] text-zinc-500 sm:text-xs">
                    Completed
                  </p>
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-emerald-400"
                  />
                </div>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-emerald-400 sm:text-2xl">
                  {completedPercentage}%
                </h3>
              </div>
            </div>

            {/* Members */}
            <div className="flex min-h-[220px] flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 lg:min-h-0 lg:flex-1">
              <div className="border-b border-zinc-800 px-4 py-4 sm:px-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-100">
                      Members
                    </h2>
                    <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                      Workspace collaborators
                    </p>
                  </div>

                  <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1 text-xs tabular-nums text-zinc-400">
                    {workspace?.members?.length || 0}
                  </span>
                </div>
              </div>

              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3 custom-scrollbar sm:p-4">
                {workspace?.members?.length > 0 ? (
                  workspace.members.map((member) => (
                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      key={member.id}
                      className="flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 py-3 text-left transition-colors hover:border-zinc-700 hover:bg-zinc-950/80"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-500/15 bg-orange-500/10 text-sm font-semibold text-orange-400">
                          {member?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-zinc-200">
                            {member?.user?.name || "Unknown user"}
                          </p>
                          <p className="mt-0.5 text-xs capitalize text-zinc-500">
                            {member?.role || "Member"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-medium sm:text-xs ${
                          member?.role === "admin"
                            ? "bg-orange-500/10 text-orange-400"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {member?.role === "admin" ? "Owner" : "Member"}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="flex min-h-[150px] flex-col items-center justify-center text-center">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/70 text-zinc-500">
                      <Users size={18} />
                    </div>
                    <p className="text-sm text-zinc-300">No members found</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Workspace members will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* member card  */}
        {selectedMember && (
          <MemberCard
            member={selectedMember}
            workspace={workspace}
            onClose={() => setSelectedMember(null)}
            onMemberUpdate={fetchWorkspace}
          />
        )}

        {/*  */}
        {openAddTask && (
        <AddTaskModal 
        isOpen={openAddTask} 
        workspace={workspace} 
        onDone={fetchWorkspace}
        onClose={()=>setOpenAddTask(false)}
        />

        )}
      </div>
    </>
  );
};

export default Workspace;
