import React from 'react'
import { useState } from 'react';
import api from '../../api/axios';
import { ChevronDown } from 'lucide-react';



const AddTaskModal = ({isOpen,workspace,onDone,onClose}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setdueDate] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [addingTask, setAddingTask] = useState(false);
  const [error, setError] = useState('')




    const addTask = async (e) => {
      setAddingTask(true);
      e.preventDefault();
      setError("");
      try {
        await api.post(`/task/${workspace.id}`, {
          title,
          content,
          priority,
          status,
          dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
          assignedToId: assignedToId ? parseInt(assignedToId) : undefined,
        });
       await onDone()
       onClose()
        setTitle("");
        setContent("");
        setPriority("medium");
        setStatus("todo");
        setdueDate("");
        setAssignedToId("");
        setError("");
      } catch (err) {
        setError(err?.response?.data?.message || "Task creation failed");
      } finally {
        setAddingTask(false);
      }
    };


  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
               <div className="w-full max-w-lg rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-lg">
                 <div className="flex items-center justify-between border-b  border-zinc-800  px-5 py-4">
                   <div>
                     <h2 className="text-xl font-semibold text-zinc-100">
                       Create Task
                     </h2>
                     <p className="mt-1 text-sm text-zinc-500">
                       Add a new task to this workspace
                     </p>
                   </div>
   
                   <button
                     onClick={() => {
                      onClose()
                       setError("");
                     }}
                     className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                   >
                     ✕
                   </button>
                 </div>
   
                 <form onSubmit={addTask} className="space-y-4 p-5">
                   <div>
                     <label className="mb-2 block text-sm text-zinc-400">
                       Title
                     </label>
                     <input
                       type="text"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       placeholder="Fix authentication bug"
                       className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm outline-none focus:border-zinc-600"
                     />
                   </div>
                   <div>
                     <label className="mb-2 block text-sm text-zinc-400">
                       Description
                     </label>
   
                     <textarea
                       rows={3}
                       value={content}
                       onChange={(e) => setContent(e.target.value)}
                       placeholder="Describe task..."
                       className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm outline-none focus:border-zinc-600"
                     />
                   </div>
                   {/* assignie row  */}
                   <div className="grid grid-cols-2 gap-4">
                     {/* priority */}
                     <div>
                       <label className="mb-2 block text-sm text-zinc-400">
                         Priority
                       </label>
                       <div className="relative">
                         <select
                           value={priority}
                           onChange={(e) => setPriority(e.target.value)}
                           className="w-full appearance-none rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm outline-none"
                         >
                           <option value="low">Low</option>
                           <option value="medium">Medium</option>
                           <option value="high">High</option>
                         </select>
                         <ChevronDown
                           size={18}
                           className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                         />
                       </div>
                     </div>
                     {/* assignedto  */}
                     <div>
                       <label className="mb-2 block text-sm text-zinc-400">
                         Assignee
                       </label>
                       <div className="relative">
                         <select
                           value={assignedToId}
                           onChange={(e) => setAssignedToId(e.target.value)}
                           className="w-full rounded-2xl appearance-none border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm outline-none"
                         >
                           <option value="">Unassigned</option>
   
                           {workspace?.members?.map((m) => (
                             <option key={m.user.id} value={m.user.id}>
                               {m.user.name}
                             </option>
                           ))}
                         </select>
   
                         <ChevronDown
                           size={18}
                           className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                         />
                       </div>
                     </div>
                   </div>
   
                   {/* dueDate  */}
                   <div>
                     <label className="mb-2 block text-sm text-zinc-400">
                       Due Date
                     </label>
   
                     <input
                       type="date"
                       value={dueDate}
                       onChange={(e) => setdueDate(e.target.value)}
                       className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none"
                     />
                   </div>
                   <div className="h-5">
                     {error && <p className="text-sm text-red-400">{error}</p>}
                   </div>
                   {/* footer  */}
                   <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-5">
                     <button
                       type="button"
                       onClick={() => onClose()}
                       className="rounded-xl border border-zinc-800 px-5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800"
                     >
                       Cancel
                     </button>
   
                     <button
                       type="submit"
                       disabled={addingTask}
                       className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white cursor-pointer disabled:opacity-50
   disabled:cursor-not-allowed"
                     >
                       {addingTask ? "Creating..." : "Create"}
                     </button>
                   </div>
                 </form>
               </div>
             </div>
  )
}

export default AddTaskModal
