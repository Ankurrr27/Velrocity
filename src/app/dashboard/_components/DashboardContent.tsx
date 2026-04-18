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
  return (
    <main className="custom-scrollbar h-full w-full flex-1 overflow-y-auto bg-transparent relative">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none -z-10" />

      <div className="w-full space-y-10 pt-16 pb-6 md:p-6 lg:p-10">
        {/* TOP SECTION: Header & Stats */}
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-6 xl:flex-row xl:items-end px-4 md:px-0">
              <div className="space-y-1">
                <span className="section-kicker uppercase tracking-[0.2em] text-indigo-500/80 font-black">Architecture</span>
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white decoration-zinc-800 underline-offset-8">Performance <span className="text-zinc-500">Matrix</span></h2>
                  <button 
                    onClick={onShare}
                    className="p-3 bg-white/5 border border-white/5 rounded-2xl text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all hover:scale-110 active:scale-95"
                    title="Share Plan"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <ProgressOverview stats={stats} loading={loading} />
            </div>
          
          <div className="surface-card rounded-[2rem] border-white/5 bg-zinc-900/40 p-6 md:p-8 shadow-2xl overflow-visible">
            <HabitTimeline data={timelineData} loading={loading} />
          </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* BOTTOM SECTION: Charts */}
        <div className="grid grid-cols-1 gap-10">
          <div className="surface-card h-[450px] rounded-[2rem] border-white/5 bg-zinc-900/20 p-8 md:p-12">
            <ProgressChart loading={loading} data={progressData} />
          </div>

          <div className="surface-card overflow-hidden rounded-[2rem] border-white/5 bg-zinc-900/20 p-8 md:p-12">
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
