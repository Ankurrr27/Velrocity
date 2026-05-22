import { useState } from "react";
import { Share2 } from "lucide-react";
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
    <main className="custom-scrollbar relative h-full w-full flex-1 overflow-y-auto bg-transparent">
      <div className="w-full space-y-6 p-4 pb-20 sm:p-6 lg:p-8">
        <section className="space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Today&apos;s execution signal</p>
                      <h1 className="text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">Progress dashboard</h1>
                    </div>

                    <div className="segmented-control flex w-full max-w-[240px] shrink-0">
                       {['global', 'college'].map((scope) => (
                         <button
                           key={scope}
                           onClick={() => setDashboardScope(scope as any)}
                           className={`segmented-tab flex-1 ${
                             dashboardScope === scope 
                               ? 'segmented-tab-active' 
                               : ''
                           }`}
                         >
                           {scope}
                         </button>
                       ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 md:justify-end">
                   {dashboardScope === 'college' && (
                      <div className="stat-pill hidden sm:flex">
                         <div className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" />
                         <span className="text-xs font-medium text-slate-500 dark:text-slate-400">College active</span>
                      </div>
                   )}
                   <button 
                     onClick={onShare}
                     className="btn-secondary h-10 px-4"
                   >
                      <Share2 size={14} />
                      <span className="hidden sm:inline">Share</span>
                   </button>
                </div>
            </div>
            <ProgressOverview stats={stats} loading={loading} />
          
          <div className="surface-card overflow-visible p-5 md:p-6">
            <HabitTimeline data={timelineData} loading={loading} />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5">
          <div className="surface-card h-[420px] p-5 md:p-6">
            <ProgressChart loading={loading} data={progressData} />
          </div>

          <div className="surface-card overflow-hidden p-5 md:p-6">
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
