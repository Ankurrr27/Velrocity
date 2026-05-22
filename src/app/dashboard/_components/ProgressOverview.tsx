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
        <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 xl:w-auto xl:min-w-[560px]">
          {[1,2,3].map(i => (
            <div key={i} className="surface-card h-20 animate-pulse" />
          ))}
       </div>
     );
  }

  return (
    <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 xl:w-auto xl:min-w-[560px]">
      <div className="glass-premium group flex flex-row items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500 sm:h-11 sm:w-11">
          <Flame size={14} fill="currentColor" className="opacity-80 sm:hidden" />
          <Flame size={18} fill="currentColor" className="hidden opacity-80 sm:block" />
        </div>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="block text-[9px] font-semibold uppercase tracking-[0.06em] text-slate-500">Streak</span>
          <p className="text-base font-semibold leading-none text-slate-950 dark:text-white sm:text-2xl">
            {stats.totalStreaks}<span className="ml-1 hidden text-[10px] font-medium text-slate-500 sm:inline-block">days</span>
          </p>
        </div>
      </div>

      <div className="glass-premium group flex flex-row items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[rgba(var(--primary-rgb),0.2)] bg-[rgba(var(--primary-rgb),0.1)] text-[rgb(var(--primary))] sm:h-11 sm:w-11">
          <Star size={14} fill="currentColor" className="opacity-80 sm:hidden" />
          <Star size={18} fill="currentColor" className="hidden opacity-80 sm:block" />
        </div>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="block text-[9px] font-semibold uppercase tracking-[0.06em] text-slate-500">Level</span>
          <p className="text-base font-semibold leading-none text-slate-950 dark:text-white sm:text-2xl">
            {stats.credibilityScore}<span className="ml-1 hidden text-[10px] font-medium text-slate-500 sm:inline-block">XP</span>
          </p>
        </div>
      </div>

      <div className="glass-premium group flex flex-row items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 sm:h-11 sm:w-11">
          <CheckCircle2 size={14} className="text-emerald-500 sm:hidden" />
          <CheckCircle2 size={18} className="hidden text-emerald-500 sm:block" />
        </div>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="block text-[9px] font-semibold uppercase tracking-[0.06em] text-slate-500">Daily</span>
          <p className="text-base font-semibold leading-none text-slate-950 dark:text-white sm:text-2xl">
            {stats.habitsCompletedToday}<span className="ml-1 hidden text-[10px] font-medium text-slate-500 sm:inline-block">done</span>
          </p>
        </div>
      </div>
    </div>
  );
}
