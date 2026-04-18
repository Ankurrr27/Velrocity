import { Search, Sparkles } from "lucide-react";

interface UsersHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  overviewStats: Array<{ label: string; value: string }>;
}

export default function UsersHeader({
  search,
  onSearch,
  overviewStats,
}: UsersHeaderProps) {
  return (
    <header className="px-4 py-6 sm:px-10 sm:py-8">
      <div className="flex flex-col gap-6 sm:gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1 sm:space-y-3 px-2 sm:px-0">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[rgb(var(--primary))] opacity-80">
              Explore Peoples
            </span>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-3xl font-black tracking-tighter text-zinc-900 dark:text-white italic">
                People like you
              </h2>
              <p className="max-w-xl text-[11px] sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                See what others are doing and connect with them.
              </p>
            </div>
          </div>

          <div className="w-full lg:max-w-md px-2 sm:px-0">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[rgb(var(--primary))] transition-colors"
                size={16}
              />
              <input
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Find user..."
                className="w-full bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm font-semibold placeholder:text-zinc-400/60 focus:border-[rgb(var(--primary))] outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-6 sm:gap-x-12 overflow-x-auto no-scrollbar px-2 sm:px-0 py-3 sm:py-4 border-t border-zinc-100 dark:border-white/5">
          {overviewStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="text-[8px] sm:text-[10px] font-black uppercase text-zinc-500 tracking-widest leading-none">
                {stat.label}
              </div>
              <div className="text-sm sm:text-lg font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-none">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
