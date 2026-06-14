import React from 'react'
import api from '../api/axios.js'
import { useState } from 'react'

const InviteModal = ({workspaceId,onClose,onInviteSuccess}) => {
  const [inviteEmail, setinviteEmail] = useState("")
  const [inviteRole, setinviteRole] = useState("member")
  const [inviteError, setinviteError] = useState("")
  const [inviting, setInviting] = useState(false)

  const inviteMember = async()=>{
    if(!inviteEmail.trim()){
      return setinviteError("Email is required")
    }
    setinviteError("")
    setInviting(true)
    try{
         await api.post(`workspace/${workspaceId}/invite`,{
          email:inviteEmail,
          role:inviteRole
         })
         onInviteSuccess()
         setinviteEmail("")
         setinviteRole("member")
         onClose()
    }catch(e){
      setinviteError( e?.response?.data?.message || "Invite failed")
    }finally{
      setInviting(false)
    }
  }
  return (
    <div>
       <div>
        <input type="email" placeholder='User Email' value={inviteEmail} onChange={(e)=>setinviteEmail(e.target.value)} />
        <select name="Role" placeholder='User Role' value={inviteRole} onChange={(e)=>setinviteRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <button disabled={inviting} onClick={inviteMember}> {inviting ? "Inviting..." : "Invite"}</button>
       </div>
    </div>
  )
}

export default InviteModal
