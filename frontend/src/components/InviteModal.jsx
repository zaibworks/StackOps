import React from 'react'
import api from '../api/axios.js'

const InviteModal = ({workspaceId,onClose,onInviteSuccess}) => {
  const [inviteEmail, setinviteEmail] = useState("")
  const [inviteRole, setinviteRole] = useState("")
  const [inviteError, setinviteError] = useState("")

  const inviteMember = async()=>{
    try{
         await api.post(`workspace/${workspaceId}`,{
          email:inviteEmail,
          role:inviteRole
         })
         onInviteSuccess()
         onClose()
    }catch(e){
      setinviteError(e)
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
        <button onClick={inviteMember}>Invite</button>
       </div>
    </div>
  )
}

export default InviteModal
