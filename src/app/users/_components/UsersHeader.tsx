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
    <header className="px-6 py-10 sm:px-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <span className="label-elite uppercase text-[rgb(var(--primary))] opacity-80">
              Discovery Engine
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Global Network
              </h2>
              <p className="max-w-xl text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Connect with active builders and discover high-signal profiles in the performance matrix.
              </p>
            </div>
          </div>

          <div className="w-full lg:max-w-md">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[rgb(var(--primary))] transition-colors"
                size={16}
              />
              <input
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Find user..."
                className="w-full bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-semibold placeholder:text-zinc-400/60 focus:border-[rgb(var(--primary))] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-4 border-t border-zinc-100 dark:border-white/5">
          {overviewStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="label-elite uppercase text-zinc-400 dark:text-zinc-500">
                {stat.label}
              </div>
              <div className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
