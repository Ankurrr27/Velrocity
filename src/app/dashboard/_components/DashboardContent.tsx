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
}

export default function DashboardContent({
  loading,
  stats,
  timelineData,
  progressData,
  heatmapData,
  onDateClick,
}: DashboardContentProps) {
  return (
    <main className="custom-scrollbar relative h-full w-full flex-1 overflow-visible bg-transparent lg:overflow-y-auto">
      <div className="w-full space-y-4 px-3 py-3 pb-20 sm:p-4 lg:space-y-3 lg:p-5">
        <section className="space-y-3">
            <ProgressOverview stats={stats} loading={loading} />
          
          <div className="border-b border-slate-200 pb-3 dark:border-white/10 sm:surface-card sm:p-4 lg:overflow-visible">
            <HabitTimeline data={timelineData} loading={loading} />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 lg:gap-3">
          <div className="h-[240px] border-b border-slate-200 pb-3 dark:border-white/10 sm:surface-card sm:h-[300px] sm:p-4 lg:border-0">
            <ProgressChart loading={loading} data={progressData} />
          </div>

          <div className="overflow-hidden pb-3 sm:surface-card sm:p-4">
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
