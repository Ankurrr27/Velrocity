import { useState } from "react";
import { Link2, Share2 } from "lucide-react";
import ProgressOverview from "./ProgressOverview";
import ProgressChart from "./ProgressChart";
import HabitHeatmap from "./HabitHeatmap";
import HabitTimeline from "./HabitTimeline";
import type { DashboardStats, ProgressPoint, TimelineData } from "./types";

interface DashboardContentProps {
  loading: boolean;
  stats: DashboardStats;
  timelineData: TimelineData;
  progressData: ProgressPoint[];
  heatmapData: unknown[];
  onDateClick: (date: string) => void;
  onShare: () => void;
}

export default function DashboardContent({
  loading,
  stats,
  timelineData,
  progressData,
  heatmapData,
  onDateClick,
  onShare,
}: DashboardContentProps) {
  const [dashboardScope, setDashboardScope] = useState<'global' | 'college'>('global');
  return (
    <main className="custom-scrollbar h-full w-full flex-1 overflow-y-auto bg-transparent relative">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none -z-10" />

      <div className="w-full space-y-10 pt-24 pb-20 md:p-6 lg:p-10">
        {/* TOP SECTION: Header & Stats */}
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-0">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white italic tracking-tighter shrink-0">Progress <span className="text-zinc-500 hidden sm:inline">Dashboard</span></h1>
                    
                    {/* SCOPE SWITCHER */}
                    <div className="flex items-center p-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl shrink-0">
                       {['global', 'college'].map((scope) => (
                         <button
                           key={scope}
                           onClick={() => setDashboardScope(scope as any)}
                           className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                             dashboardScope === scope 
                               ? 'bg-[rgb(var(--primary))] text-white shadow-lg shadow-[rgba(var(--primary-rgb),0.2)]' 
                               : 'text-zinc-500 hover:text-zinc-300'
                           }`}
                         >
                           {scope}
                         </button>
                       ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                   {dashboardScope === 'college' && (
                      <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl flex items-center gap-2">
                         <div className="w-1 h-1 rounded-full bg-[rgb(var(--primary))] animate-pulse" />
                         <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest italic">College <span className="text-zinc-900 dark:text-white hidden sm:inline">Active</span></span>
                      </div>
                   )}
                   <button 
                     onClick={onShare}
                     className="h-10 px-4 rounded-xl bg-white dark:bg-white text-zinc-900 dark:text-black border border-zinc-200 dark:border-none flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl"
                   >
                      <Share2 size={14} />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">Share</span>
                   </button>
                </div>
            </div>
            <ProgressOverview stats={stats} loading={loading} />
          
          <div className="surface-card rounded-[2rem] border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 p-6 md:p-8 shadow-2xl overflow-visible">
            <HabitTimeline data={timelineData} loading={loading} />
          </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* BOTTOM SECTION: Charts */}
        <div className="grid grid-cols-1 gap-10">
          <div className="surface-card h-[450px] rounded-[2rem] border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/20 p-8 md:p-12 shadow-xl shadow-black/5">
            <ProgressChart loading={loading} data={progressData} />
          </div>

          <div className="surface-card overflow-hidden rounded-[2rem] border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/20 p-8 md:p-12 shadow-xl shadow-black/5">
            <HabitHeatmap
              data={heatmapData}
              loading={loading}
              onDateClick={onDateClick}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
