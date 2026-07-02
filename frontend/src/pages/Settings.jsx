import Navbar from "../components/Navbar.jsx";
import AboutCard from "../components/settings/AboutCard.jsx";
import ProfileCard from "../components/settings/ProfileCard.jsx";
import QuickActionsCard from "../components/settings/QuickActionsCard.jsx";
import DangerZoneCard from "../components/settings/DangerZoneCard.jsx"

const Settings = () => {
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

          <ProfileCard />
          <QuickActionsCard/>
          <AboutCard/>
          <DangerZoneCard/>
        </div>

      </main>

    </div>
  );
};

export default Settings;