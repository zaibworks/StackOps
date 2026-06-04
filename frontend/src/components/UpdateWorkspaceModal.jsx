import React from 'react'

const UpdateWorkspaceModal = ({isOpen,onClose,workspace,onSuccess}) => {

    if (!isOpen) return null

     const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
  if (workspace) {
    setName(workspace.name)
  }
}, [workspace])

const updateWorkspace = async () => {
    setUpdating(true)
  if (!name.trim()) {
    return setError("Workspace name required");
  }

  if (name.trim() === workspace.name) {
    return setError("Workspace name is unchanged");
  }

  try {
    const response = await api.put(
      `/workspace/${workspace.id}`,
      { name }
    );

    onSuccess(response.data);
    onClose();

    setName("");
    setError("");
  } catch (e) {
    setError(
      e.response?.data?.message ||
      "Failed to update workspace"
    );
  }finally{
    setUpdating(false)
  }
}

  return (
    <div>
      
    </div>
  )
}

export default UpdateWorkspaceModal
