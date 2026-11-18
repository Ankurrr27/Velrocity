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
    <div className="grid w-full grid-cols-3 gap-3 border-b border-slate-200 pb-3 dark:border-white/10 sm:gap-4">
      <div className="flex min-w-0 flex-row items-center gap-2 sm:gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 sm:h-9 sm:w-9">
          <Flame size={16} fill="currentColor" className="opacity-80" />
        </div>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="block text-[10px] text-slate-500">Streak</span>
          <p className="text-base font-semibold leading-none text-slate-950 dark:text-white sm:text-xl">
            {stats.totalStreaks}<span className="ml-1 hidden text-[10px] font-medium text-slate-500 sm:inline-block">days</span>
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-row items-center gap-2 sm:gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(var(--primary-rgb),0.1)] text-[rgb(var(--primary))] sm:h-9 sm:w-9">
          <Star size={16} fill="currentColor" className="opacity-80" />
        </div>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="block text-[10px] text-slate-500">Points</span>
          <p className="text-base font-semibold leading-none text-slate-950 dark:text-white sm:text-xl">
            {stats.credibilityScore}<span className="ml-1 hidden text-[10px] font-medium text-slate-500 sm:inline-block">XP</span>
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-row items-center gap-2 sm:gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 sm:h-9 sm:w-9">
          <CheckCircle2 size={16} />
        </div>
        <div className="relative z-10 flex flex-col justify-center">
          <span className="block text-[10px] text-slate-500">Done today</span>
          <p className="text-base font-semibold leading-none text-slate-950 dark:text-white sm:text-xl">
            {stats.habitsCompletedToday}<span className="ml-1 hidden text-[10px] font-medium text-slate-500 sm:inline-block">done</span>
          </p>
        </div>
      </div>
    </div>
  );
}
