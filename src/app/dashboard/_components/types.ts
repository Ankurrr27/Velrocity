export type DashboardHabit = {
  _id: string;
  title: string;
  type: string;
  frequency: string;
  isCompletedToday: boolean;
};

export type DashboardTask = {
  _id: string;
  title: string;
  status: "pending" | "done";
  date: string;
  deadline?: string | null;
};

export type DashboardStats = {
  totalStreaks: number;
  credibilityScore: number;
  habitsCompletedToday: number;
};

export type TimelineData = {
  habits: Array<{ _id: string; title: string }>;
  logs: string[];
  expectedLogs?: string[];
  today: string;
};

export type ProgressPoint = {
  date: string;
  progress: number;
};
