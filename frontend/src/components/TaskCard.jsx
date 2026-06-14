import React, { useEffect, useEffectEvent } from "react";
import api from "../api/axios.js";
import { useState} from "react";
import { useAuth } from "../context/AuthContext.jsx";

import { X, Calendar, User, Flag, PencilIcon,Trash2 } from "lucide-react";

const TaskCard = ({ task, workspace, onClose, onTaskUpdate}) => {

  const {user} = useAuth()

  const currentUserId = user.id
const currentMember = workspace.members.find(
  member => member.userId === currentUserId
)
const currentUserRole = currentMember?.role


const [comments,setComments] = useState([])
const [comment,setComment] = useState("")

const [openCommentMenuId, setopenCommentMenuId] = useState(null)

  const [isEditing, setisEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);
  const [editContent, setEditContent] = useState(task.content);

  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
  );
  const [editAssignedToId, setEditAssignedToId] = useState(
    task.assignedTo?.id || "",
  );
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editStatus, setEditStatus] = useState(task.status);

  const [isMetaEditing, setisMetaEditing] = useState(false);

  const deleteTask = async () => {
    try {
      const res = await api.delete(`/task/${workspace.id}/${task.id}`);
      await onTaskUpdate();
       onClose()
    } catch (e) {
      console.log(e.response?.data)
      
    }
  };

  const updateTaskHeader = async () => {
    await api.put(`/task/${workspace.id}/${task.id}`, {
      title: editTitle,
      content: editContent,
    });
    await onTaskUpdate();
    setisEditing(false);
  };

  const updateTaskMeta = async () => {
    try{
       await api.put(`/task/${workspace.id}/${task.id}`, {
      priority: editPriority,
      status: editStatus,
      dueDate: editDueDate ? new Date(editDueDate).toISOString() : null,
      assignedToId: editAssignedToId,
    });
    await onTaskUpdate();
    setisMetaEditing(false);
    }catch(e){
      console.log(e)
    }
  };

  const fetchComments = async () => {
    console.log("FETCH COMMENTS CALLED")
  try{
    const res = await api.get(
      `/comment/${workspace.id}/${task.id}`
    )
    await console.log(res.data.data)
    setComments(res.data.data)
  }catch(err){
    console.log(err)
  }
}

useEffect(() => {
  fetchComments()
}, [task.id])

const addComment = async () => {
  try{
    await api.post(
      `/comment/${workspace.id}/${task.id}`,
      {
        content: comment
      }
    )

    setComment("")
    fetchComments()

  }catch(err){
    console.log(err)
  }
}

const deleteComment = async (commentId) => {
  try {
    await api.delete(
      `/comment/${workspace.id}/${commentId}`
    )
     
    setopenCommentMenuId(null)
    fetchComments()
  } catch (err) {
    console.log(err)
  }
}

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="h-full w-[42%] min-w-[550px] border-l border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full
bg-transparent
text-xl
font-semibold
text-zinc-100
outline-none
border-b
border-zinc-700
pb-1"
              />
            ) : (
              <h2 className="text-xl font-semibold text-zinc-100">
                {task.title}
              </h2>
            )}

            <p className="mt-1 text-sm text-zinc-500">Task Details</p>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setisEditing(false)}
                  className="rounded-xl border border-none px-4 py-2 text-sm text-zinc-300 hover:bg-red-800"
                >
                  Cancel
                </button>

                <button
                  onClick={updateTaskHeader}
                  className="rounded-xl border border-none px-4 py-2 text-sm text-zinc-300 hover:bg-cyan-800"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setisEditing(true)}
                className="rounded-xl border border-none px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
              >
                <PencilIcon size={14} />
              </button>
            )}

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* BODY */}

        <div className="h-[calc(100vh-90px)] overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* STATUS + PRIORITY */}

          <div className="flex gap-3">
            <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
              {task.priority.charAt(0).toUpperCase()+task.priority.slice(1)}
            </span>

            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
              {task.status.charAt(0).toUpperCase()+task.status.slice(1)}
            </span>
          </div>

          {/* DESCRIPTION */}

          {isEditing ? (
            <textarea
              rows={6}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full
bg-transparent
text-sm
leading-relaxed
text-zinc-400
outline-none
resize-none
custom-scrollbar
"
            />
          ) : (
            <>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5 min-h-[180px]">
                <h3 className="mb-3 text-sm font-medium text-zinc-300">
                  Description
                </h3>

                <p className="leading-relaxed text-sm text-zinc-500 break-all whitespace-pre-wrap">
                  {task.content || "No description provided."}
                </p>
              </div>
            </>
          )}

          {/* META */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
            <div className="flex items-center justify-between px-2 py-1">
              <h3 className="mb-5 text-sm font-medium text-zinc-300">
                Details
              </h3>

              {isMetaEditing ? (
                <>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setisMetaEditing(false)}
                      className="rounded-lg px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={updateTaskMeta}
                      className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-900 hover:bg-white"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setisMetaEditing(true)}
                  className="rounded-xl border border-none px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  <PencilIcon size={14} />
                </button>
              )}
            </div>

            <div className="space-y-5">
              {/* assignie  */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500">
                  <User size={16} />
                  <span>Assigned To</span>
                </div>
                {isMetaEditing ? (
                  <select
                    value={editAssignedToId}
                    onChange={(e) => setEditAssignedToId(e.target.value ? Number(e.target.value) : null)}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-700"
                  >
                    <option value="">Unassigned</option>
                    {workspace.members.map((member) => (
                      <option key={member.user.id} value={member.user.id}>
                        {member.user.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="text-sm text-zinc-200">
                    {task.assignedTo?.name || "Unassigned"}
                  </span>
                )}
              </div>

              {/* due date  */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Calendar size={16} />
                  <span>Due Date</span>
                </div>

                {isMetaEditing ? (
                  <input
                    type="date"
                    value={editDueDate?.split("T")[0] || ""}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-700"
                  />
                ) : (
                  <span className="text-sm text-zinc-200">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No Due Date"}
                  </span>
                )}
              </div>

              {/* priority  */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Flag size={16} />
                  <span>Priority</span>
                </div>
                {isMetaEditing ? (
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-700"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                ) : (
                  <span className="text-sm text-zinc-200">{task.priority.charAt(0).toUpperCase()+task.priority.slice(1)}</span>
                )}
              </div>

              {/* status  */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Flag size={16} />
                  <span>Status</span>
                </div>
                {isMetaEditing ? (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-700"
                  >
                    <option value="todo">Todo</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                ) : (
                  <span className="text-sm text-zinc-200">{task.status.charAt(0).toUpperCase()+task.status.slice(1)}</span>
                )}
              </div>
            </div>
          </div>

          {/* ACTIVITY */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h3 className="mb-4 text-sm font-medium text-zinc-300">Activity</h3>

            <div className="space-y-4">
              <div className="border-l border-zinc-700 pl-4">
                <p className="text-sm text-zinc-300">Task Created</p>

                <p className="text-xs text-zinc-500">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l border-zinc-700 pl-4">
                <p className="text-sm text-zinc-300">Task Updated</p>

                <p className="text-xs text-zinc-500">
                  {new Date(task.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* comments  */}
          <div className="p-3 border-b border-zinc-800">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/30 p-5">
              <h3 className="mb-4 text-sm font-medium text-zinc-300">
                Comments
              </h3>

              {/* Existing Comments */}
         
          {comments.map(c=>(
                   
                   
              <div key={c.id} className="space-y-4 mb-5 bg-transparent hover:bg-zinc-800/30 ">
                <div className="flex items-center justify-between pr-4">
                          <div className="border-l border-zinc-700 pl-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200">
                      {c.user?.name}
                    </span>

                    <span className="text-xs text-zinc-500">{new Date(c.createdAt).toLocaleString()}</span>
                  </div>

                  <p className="mt-2 text-sm text-zinc-400">
                    {c.content}
                  </p>
            
                </div>

                     {(c.userId === currentUserId || currentUserRole === "admin") && (<>
                     <div className="relative">
    <button onClick={() => setopenCommentMenuId( openCommentMenuId ===c.id?null:c.id)}
       className="rounded-lg p-2 text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer">
      ⋮
    </button>
      {openCommentMenuId === c.id && (
    <div className="absolute right-0 top-8 z-50 min-w-[100px] rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
      <button
        onClick={() => deleteComment(c.id)}
        className="w-full rounded-lg flex justify-between items-center text-left text-sm text-red-400 hover:bg-zinc-800 px-3"
      >
        <Trash2 size={14}/>
        Remove
      </button>
    </div>
  )}

                     </div>
                     </>
  )}
                </div>

              </div>
          ))}

              {/* Add Comment */}

              <div className="space-y-3">
                <textarea
                  rows={3}
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-zinc-700"
                />

                <div className="flex justify-end">
                  <button onClick={addComment} className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white">
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* delete button  */}
          <button  onClick={deleteTask}
          className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 py-3 text-red-400 hover:bg-red-500/20">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
