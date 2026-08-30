import { LayoutGrid } from "lucide-react";

interface textType{
  text:String
}

const Loader = ({ text  }:textType) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <div className="flex flex-col items-center gap-5">
        
        {/* Spinning ring + icon */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-2xl animate-spin [animation-direction:reverse]  border-[3px] border-zinc-400" />
          <div className="absolute inset-0 animate-spin rounded-2xl border-[3px] border-transparent border-t-orange-500 border-r-orange-500" />
          <LayoutGrid size={24} className="text-orange-500" />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="font-bold tracking-wide text-zinc-50">
            Stack<span className="text-orange-500">Ops</span>
          </p>
          <p className="mt-1 text-sm text-zinc-500">{text}</p>
        </div>

        {/* Bouncing dots */}
        <div className="flex gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500" />
        </div>

      </div>
    </div>
  );
};

export default Loader;