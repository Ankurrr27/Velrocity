import { Flame, Star, CheckCircle2 } from "lucide-react";

type ProgressProps = {
  loading?: boolean;
  stats: {
    totalStreaks: number;
    credibilityScore: number;
    habitsCompletedToday: number;
  };
};

export default function ProgressOverview({ stats, loading }: ProgressProps) {
  if (loading) {
     return (
       <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 xl:w-auto xl:min-w-[520px]">
          {[1,2,3].map(i => (
            <div key={i} className="surface-muted h-16 rounded-[20px] animate-pulse" />
          ))}
       </div>
     );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 xl:w-auto xl:min-w-[520px]">
      <div className="surface-muted flex items-center gap-3 rounded-[20px] px-4 py-3 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
          <Flame size={18} fill="currentColor" className="opacity-80" />
        </div>
        <div className="relative z-10">
          <span className="block text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Streaks</span>
          <p className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
            {stats.totalStreaks} <span className="text-xs font-medium text-zinc-400">days</span>
          </p>
        </div>
      </div>

      <div className="surface-muted flex items-center gap-3 rounded-[20px] px-4 py-3 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
          <Star size={18} fill="currentColor" className="opacity-80" />
        </div>
        <div className="relative z-10">
          <span className="block text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Credit</span>
          <p className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
            {stats.credibilityScore} <span className="text-xs font-medium text-zinc-400">xp</span>
          </p>
        </div>
      </div>

      <div className="surface-muted flex items-center gap-3 rounded-[20px] px-4 py-3 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <CheckCircle2 size={18} className="text-emerald-500" />
        </div>
        <div className="relative z-10">
          <span className="block text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Today</span>
          <p className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
            {stats.habitsCompletedToday} <span className="text-xs font-medium text-zinc-400">done</span>
          </p>
        </div>
      </div>
    </div>
  );
}
