import { LayoutGrid } from "lucide-react";

interface TextType {
  text: string;
}

const Loader = ({ text }: TextType) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center">

        {/* Loader */}
        <div className="relative flex h-18 w-18 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-zinc-800" />

          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-orange-500 border-r-orange-500" />

          <LayoutGrid
            size={21}
            strokeWidth={1.8}
            className="text-orange-500"
          />
        </div>

        {/* Brand */}
        <div className="mt-5 text-center">
          <p className="text-md font-semibold tracking-wide text-zinc-100">
            Stack<span className="text-orange-500">Ops</span>
          </p>

          <p className="mt-1.5 text-sm text-zinc-500">
            {text}
          </p>
        </div>

        {/* Loading dots */}
        <div className="mt-4 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500 [animation-delay:300ms]" />
        </div>

      </div>
    </div>
  );
};

export default Loader;