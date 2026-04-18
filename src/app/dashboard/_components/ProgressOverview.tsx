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
        <div className="grid w-full grid-cols-3 gap-2 sm:gap-4 xl:w-auto xl:min-w-[600px]">
          {[1,2,3].map(i => (
            <div key={i} className="surface-card h-20 rounded-2xl animate-pulse bg-zinc-200/50 dark:bg-white/5 border-zinc-200 dark:border-white/5" />
          ))}
       </div>
     );
  }

  return (
    <div className="grid w-full grid-cols-3 gap-1 sm:gap-4 xl:w-auto xl:min-w-[600px] px-0.5 sm:px-0">
      <div className="glass-premium flex flex-row items-center gap-1.5 sm:gap-4 rounded-xl sm:rounded-2xl px-2 py-2.5 sm:px-5 sm:py-4 relative group overflow-hidden border-zinc-200 dark:border-white/5 hover:border-orange-500/20 transition-all">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex h-7 w-7 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-sm">
          <Flame size={12} fill="currentColor" className="opacity-80 sm:hidden" />
          <Flame size={18} fill="currentColor" className="opacity-80 hidden sm:block" />
        </div>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="block text-[6px] sm:text-[10px] font-black uppercase tracking-tight sm:tracking-[0.2em] text-zinc-500 -mb-0.5">STREAK</span>
          <p className="text-[13px] sm:text-2xl font-black text-zinc-900 dark:text-white leading-none">
            {stats.totalStreaks}<span className="hidden sm:inline-block ml-1 text-[10px] font-bold text-zinc-500">Days</span>
          </p>
        </div>
      </div>

      <div className="glass-premium flex flex-row items-center gap-1.5 sm:gap-4 rounded-xl sm:rounded-2xl px-2 py-2.5 sm:px-5 sm:py-4 relative group overflow-hidden border-zinc-200 dark:border-white/5 hover:border-[rgba(var(--primary-rgb),0.2)] transition-all">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--primary-rgb),0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex h-7 w-7 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-[rgba(var(--primary-rgb),0.1)] text-[rgb(var(--primary))] border border-[rgba(var(--primary-rgb),0.2)] shadow-sm">
          <Star size={12} fill="currentColor" className="opacity-80 sm:hidden" />
          <Star size={18} fill="currentColor" className="opacity-80 hidden sm:block" />
        </div>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="block text-[6px] sm:text-[10px] font-black uppercase tracking-tight sm:tracking-[0.2em] text-zinc-500 -mb-0.5">LEVEL</span>
          <p className="text-[13px] sm:text-2xl font-black text-zinc-900 dark:text-white leading-none">
            {stats.credibilityScore}<span className="hidden sm:inline-block ml-1 text-[10px] font-bold text-zinc-500">XP</span>
          </p>
        </div>
      </div>

      <div className="glass-premium flex flex-row items-center gap-1.5 sm:gap-4 rounded-xl sm:rounded-2xl px-2 py-2.5 sm:px-5 sm:py-4 relative group overflow-hidden border-zinc-200 dark:border-white/5 hover:border-emerald-500/20 transition-all">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex h-7 w-7 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm">
          <CheckCircle2 size={12} className="text-emerald-500 sm:hidden" />
          <CheckCircle2 size={18} className="text-emerald-500 hidden sm:block" />
        </div>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="block text-[6px] sm:text-[10px] font-black uppercase tracking-tight sm:tracking-[0.2em] text-zinc-500 -mb-0.5">DAILY</span>
          <p className="text-[13px] sm:text-2xl font-black text-zinc-900 dark:text-white leading-none">
            {stats.habitsCompletedToday}<span className="hidden sm:inline-block ml-1 text-[10px] font-bold text-zinc-500">Done</span>
          </p>
        </div>
      </div>
    </div>
  );
}
