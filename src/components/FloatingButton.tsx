import { HiOutlineHeart } from "react-icons/hi2";

function FloatingButton({ btnName = "Support Us" }: { btnName?: string }) {
  return (
    <a
      href="/support"
      aria-label={btnName}
      className="fixed bottom-4 right-4 z-50 group"
    >
      <div className="flex items-center rounded-full border border-orange-400/30 bg-zinc-900/90 p-3 text-white backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:pr-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary shadow-md">
          <HiOutlineHeart className="text-xl" />
        </span>

        <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[160px] group-hover:opacity-100 hidden sm:block">
          {btnName}
        </span>
      </div>
    </a>
  );
}

export default FloatingButton;
