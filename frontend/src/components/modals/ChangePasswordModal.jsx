import { X, KeyRound, Eye, EyeOff } from "lucide-react";
import api from "../../api/axios.js"
import { useState } from "react";


const ChangePasswordModal = ({isOpen,onClose}) => {
    if(!isOpen) return null;
    const [passError, setPassError] = useState("")
    const [saving, setSaving] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);

    const handleChangePassword = async()=>{
      setPassError("")
          try {
            if(!currentPassword.trim()){ 
              setPassError("Enter current password")
            }else if(!newPassword.trim()){
              setPassError('Enter new password')
            }
            setSaving(true)
            const res = await api.put('/settings/updatePassword',{
              currentPassword,
              newPassword
            })
            setCurrentPassword("")
            setNewPassword("")
            setPassError("")
            onClose()
          } catch (e) {
            setPassError(e?.response?.data?.message || "Cannot update password")
          }finally{
            setSaving(false)
          }
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center  bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/70 fixed left-50">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-orange-500/10 p-2 text-orange-400">
              <KeyRound size={18} />
            </div>

            <div>

              <h2 className="font-semibold">
                Change Password
              </h2>

              <p className="text-xs text-zinc-500">
                Keep your account secure.
              </p>

            </div>

          </div>

          <button onClick={onClose}
          className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200">
            <X size={18} />
          </button>

        </div>

        {/* Body */}
        <div className="space-y-4 p-5">

          <div className="relative">

            <label className="mb-2 block text-sm text-zinc-400">
              Current Password
            </label>

            <div>

            <input value={currentPassword}
            onChange={(e)=>setCurrentPassword(e.target.value)} 
             type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              className="
                w-full rounded-xl
                border border-zinc-700
                bg-zinc-950
                px-4 py-3
                text-sm
                outline-none
                transition
                focus:border-orange-500
              "
            />
             <button
        type="button"
        className="absolute right-3  text-zinc-500 hover:text-zinc-300 p-3"
        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
    >
        {showCurrentPassword ? (
            <EyeOff size={18} />
        ) : (
            <Eye size={18} />
        )}
    </button>
      </div>

          </div>

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              New Password
            </label>

<div className="relative">
            <input value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
             type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="
                w-full rounded-xl
                border border-zinc-700
                bg-zinc-950
                px-4 py-3
                text-sm
                outline-none
                transition
                focus:border-orange-500
              "
            />
            <button
        type="button"
        className="absolute right-3  text-zinc-500 hover:text-zinc-300 p-3"
        onClick={() => setShowNewPassword(!showNewPassword)}
    >
        {showNewPassword ? (
            <EyeOff size={18} />
        ) : (
            <Eye size={18} />
        )}
    </button>

</div>

          </div>
        <div className="h-2">
           {passError&&(
          <p className="text-sm text-red-600">{passError}</p>
        )}
        </div>

        </div>


        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 p-5">

          <button onClick={onClose}
            className="
              rounded-xl
              px-4 py-2
              text-sm
              text-zinc-400
              transition
              hover:bg-zinc-800
            "
          >
            Cancel
          </button>

          <button onClick={handleChangePassword}
          disabled={saving}
            className="
              rounded-xl
              bg-orange-500
              px-5 py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-orange-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Update Password
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChangePasswordModal;