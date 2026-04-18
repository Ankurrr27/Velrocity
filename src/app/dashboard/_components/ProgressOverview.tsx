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
       <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 xl:w-auto xl:min-w-[600px]">
          {[1,2,3].map(i => (
            <div key={i} className="surface-card h-20 rounded-2xl animate-pulse bg-white/5 border-white/5" />
          ))}
       </div>
     );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 xl:w-auto xl:min-w-[600px]">
      <div className="glass-premium flex items-center gap-4 rounded-2xl px-5 py-4 relative group overflow-hidden border-white/5 hover:border-orange-500/20 transition-all">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
          <Flame size={20} fill="currentColor" className="opacity-80" />
        </div>
        <div className="relative z-10">
          <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">Momentum</span>
          <p className="text-2xl font-black text-white leading-none">
            {stats.totalStreaks} <span className="text-[10px] font-bold text-zinc-500">Days</span>
          </p>
        </div>
      </div>

      <div className="glass-premium flex items-center gap-4 rounded-2xl px-5 py-4 relative group overflow-hidden border-white/5 hover:border-indigo-500/20 transition-all">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shadow-[0_0_20px_rgba(79,70,229,0.15)]">
          <Star size={20} fill="currentColor" className="opacity-80" />
        </div>
        <div className="relative z-10">
          <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">Credibility</span>
          <p className="text-2xl font-black text-white leading-none">
            {stats.credibilityScore} <span className="text-[10px] font-bold text-zinc-500">XP</span>
          </p>
        </div>
      </div>

      <div className="glass-premium flex items-center gap-4 rounded-2xl px-5 py-4 relative group overflow-hidden border-white/5 hover:border-emerald-500/20 transition-all">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <CheckCircle2 size={20} className="text-emerald-500" />
        </div>
        <div className="relative z-10">
          <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">Velocity</span>
          <p className="text-2xl font-black text-white leading-none">
            {stats.habitsCompletedToday} <span className="text-[10px] font-bold text-zinc-500">Done</span>
          </p>
        </div>
      </div>
    </div>
  );
}
