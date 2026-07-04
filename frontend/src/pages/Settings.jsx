import Navbar from "../components/Navbar.jsx";
import AboutCard from "../components/settings/AboutCard.jsx";
import ProfileCard from "../components/settings/ProfileCard.jsx";
import QuickActionsCard from "../components/settings/QuickActionsCard.jsx";
import DangerZoneCard from "../components/settings/DangerZoneCard.jsx"
import { useState,useEffect } from "react";
import ChangeNameModal from "../components/modals/ChangeNameModal.jsx";
import ChangePasswordModal from "../components/modals/ChangePasswordModal.jsx"
import ManageWorkspaceModal from "../components/modals/ManageWorkspaceModal.jsx";
import ManageTasksModal from "../components/modals/ManageTasksModal.jsx";
import ManageCommentModal from "../components/modals/ManageCommentModal.jsx";
import ManageActivityModal from "../components/modals/ManageActivityModal.jsx";
import DeleteAccountModal from "../components/modals/DeleteAccountModal.jsx";

const Settings = () => {
  const [openModal, setOpenModal] = useState(null)
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold tracking-tight">
            Settings
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your account and application preferences.
          </p>

        </div>

        {/* Cards */}
        <div className="space-y-6">

          <ProfileCard 
          onClickName={()=>setOpenModal("name")}
          onClickPassword={()=>setOpenModal("password")}
            />
          <QuickActionsCard
          onWorkspaces={()=>setOpenModal("workspaces")}
          onTasks={()=>setOpenModal("tasks")}
          onComments={()=>setOpenModal("comments")}
          onActivities={()=>setOpenModal("activities")}
          />
          <AboutCard/>
          <DangerZoneCard onClickDanger={()=>setOpenModal("danger")} />
        </div>

      </main>

      {openModal === "name" &&(
         <ChangeNameModal isOpen={setOpenModal} onClose={()=>setOpenModal(null)}/>
      )}
      {openModal === "password" &&(
        <ChangePasswordModal isOpen={setOpenModal} onClose={()=>setOpenModal(null)}/>
      )}
      {openModal === "workspaces" &&(
        <ManageWorkspaceModal isOpen={setOpenModal} onClose={()=>setOpenModal(null)}/>
      )}
      {openModal === "tasks" &&(
        <ManageTasksModal isOpen={setOpenModal} onClose={()=>setOpenModal(null)}/>
      )}
      {openModal === "comments" &&(
        <ManageCommentModal isOpen={setOpenModal} onClose={()=>setOpenModal(null)}/>
      )}
      {openModal === "activities" &&(
        <ManageActivityModal isOpen={setOpenModal} onClose={()=>setOpenModal(null)}/>
      )}
      {openModal === "danger" &&(
        <DeleteAccountModal isOpen={setOpenModal} onClose={()=>setOpenModal(null)}/>
      )}
    </div>
  );
};

export default Settings;