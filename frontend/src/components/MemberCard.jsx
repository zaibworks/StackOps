import React from 'react'

const MemberCard = ({member,workspace,onClose,onMemberUpdate}) => {
  return (
    <div className='fixed w-[420px] left-8 top-24 z-50 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl'>
      <div className='flex flex-col items-center gap-3 p-6'>
  <div className="h-20 w-20 rounded-3xl bg-orange-500/20 flex items-center justify-center text-3xl font-bold">
 {member.user.name.charAt(0).toUpperCase()}
</div>
<h2 className="text-xl font-semibold">
  {member.user.name}
</h2>
<span
 className={`
 px-3 py-1 rounded-full text-xs
 ${
   member.role === "admin"
   ? "bg-red-500/10 text-red-400"
   : "bg-cyan-500/10 text-cyan-400"
 }
 `}
>
 {member.role}
</span>
      </div>
    </div>
  )
}

export default MemberCard
