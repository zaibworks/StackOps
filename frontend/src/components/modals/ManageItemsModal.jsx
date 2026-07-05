import {
  X,
  BriefcaseBusiness,
} from "lucide-react";
import { useState } from "react";

const ManageItemsModal = ({isOpen,onClose,title,description,items,itemLabel,onDelete,typeName}) => {
    if(!isOpen) return null;

    const [selectedIds, setSelectedIds] = useState([])

    const toggleSelect =(id)=>{
      if(selectedIds.includes(id)){
       setSelectedIds( selectedIds.filter(selectedId=>selectedId !==id))
      }else{
          setSelectedIds([...selectedIds,id])
      }
    }

   const selectAll = () => {
  if (selectedIds.length === items.length) {
    setSelectedIds([]);
  } else {
    setSelectedIds(items.map(item => item.id));
  }
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950/90">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">

          <div>

            <h2 className="text-lg font-semibold">
             {title}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {description}
            </p>

          </div>

          <button onClick={onClose}
            className="
              rounded-lg
              p-2
              text-zinc-500
              transition
              hover:bg-zinc-800
              hover:text-white
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* Select All */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">

          <label className="flex cursor-pointer items-center gap-3">

            <input
              type="checkbox"
              checked={selectedIds.length===items.length}
              onChange={selectAll}
              className="h-4 w-4 accent-zinc-500"
            />

            <span className="text-sm font-medium">
              Select All
            </span>

          </label>

          <span className="text-sm text-zinc-500">
            {`${items.length} ${typeName}`} 
          </span>

        </div>

        {/* Items List */}
        <div className="max-h-80 overflow-y-auto">

          {items.map((item) => (

            <label
              key={item.id}
              className="
                flex cursor-pointer items-center justify-between
                border-b border-zinc-800
                px-5 py-4
                transition
                hover:bg-zinc-800/40
              "
            >

              <div className="flex items-center gap-4">

                <input
                  type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  className="h-4 w-4 accent-orange-500"
                />

                <div className="rounded-lg bg-orange-500/10 p-2 text-orange-400">
                  <BriefcaseBusiness size={16} />
                </div>

                <div>

                  <p className="font-medium">
                    {item[itemLabel]}
                  </p>

                  {/* <p className="text-xs text-zinc-500">
                    12 Tasks
                  </p> */}

                </div>

              </div>

            </label>

          ))}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 p-5">

          <p className="text-sm text-zinc-500">
            {`${selectedIds.length} Selected`}
          </p>

          <div className="flex gap-3">

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

            <button
              className="
                rounded-xl
                bg-red-500
                px-5 py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-red-600
              "
            >
              Delete Selected
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ManageItemsModal;
