import { Search } from "lucide-react";

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
    <header className="px-4 py-6 sm:px-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 px-2 sm:px-0">
            <span className="section-kicker">Discover builders</span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">
                People like you
              </h2>
              <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
                See what others are doing and connect with them.
              </p>
            </div>
          </div>

          <div className="w-full lg:max-w-md px-2 sm:px-0">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[rgb(var(--primary))] transition-colors"
                size={16}
              />
              <input
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Find user..."
                className="input-shell pl-11"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-4 overflow-x-auto border-t border-slate-200/70 px-2 py-3 dark:border-white/5 sm:gap-x-8 sm:px-0">
          {overviewStats.map((stat) => (
            <div key={stat.label} className="stat-pill shrink-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-slate-500">
                {stat.label}
              </div>
              <div className="text-sm font-semibold text-slate-950 dark:text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
