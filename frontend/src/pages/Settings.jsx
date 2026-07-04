import Navbar from "../components/Navbar.jsx";
import AboutCard from "../components/settings/AboutCard.jsx";
import ProfileCard from "../components/settings/ProfileCard.jsx";
import QuickActionsCard from "../components/settings/QuickActionsCard.jsx";
import DangerZoneCard from "../components/settings/DangerZoneCard.jsx"
import { useState,useEffect } from "react";
import ChangeNameModal from "../components/modals/ChangeNameModal.jsx";
import ChangePasswordModal from "../components/modals/ChangePasswordModal.jsx"
import DeleteAccountModal from "../components/modals/DeleteAccountModal.jsx";
import ManageItemsModal from "../components/modals/ManageItemsModal.jsx";

const modalConfig ={
   workspaces: {
    title: "Manage your Workspaces",
    description: "Select one or more workspaces to delete",
  },

  tasks: {
    title: "Manage your tasks",
    description: "Select one or more tasks to delete",
  },

  comments: {
    title: "...",
    description: "...",
  },

  activities: {
    title: "...",
    description: "...",
  }
}

const Settings = () => {
  const [openModal, setOpenModal] = useState(null)
  const [currentType, setCurrentType] = useState(null);

  const config = modalConfig[currentType];

  const handleManage = (type) => {
  setCurrentType(type);
  setOpenModal("manage");
};
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
  onWorkspaces={() => handleManage("workspaces")}
  onTasks={() => handleManage("tasks")}
  onComments={() => handleManage("comments")}
  onActivities={() => handleManage("activities")}
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
      {openModal === "manage" && (
  <ManageItemsModal 
  isOpen={openModal} 
  onClose={()=>setOpenModal(null)}
  title={config.title}
  description={config.description}
  />
)}
    </div>
  );
};

export default Settings;