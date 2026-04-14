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
    <main className="custom-scrollbar h-full w-full flex-1 overflow-y-auto bg-transparent">
      <div className="w-full space-y-8 py-4 md:p-5 lg:p-8 overflow-hidden">
        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center px-4 md:px-0">
            <div className="space-y-2">
              <span className="section-kicker">Performance View</span>

            </div>
            <ProgressOverview stats={stats} loading={loading} />
          </div>
          <div className="surface-card rounded-none border-x-0 md:border-x md:rounded-[24px] p-4 md:p-5">
            <HabitTimeline data={timelineData} loading={loading} />
          </div>
        </section>

        <div className="h-px w-full bg-zinc-200/70 dark:bg-white/5" />

        <div className="flex flex-col gap-8">
          <div className="surface-card h-[400px] rounded-none border-x-0 md:border-x md:rounded-[28px] p-6 md:p-8">
            <ProgressChart loading={loading} data={progressData} />
          </div>

          <div className="surface-card overflow-hidden rounded-none border-x-0 md:border-x md:rounded-[28px] p-6 md:p-8">
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
