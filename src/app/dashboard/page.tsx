'use client';

import { useState, useEffect, useMemo } from "react";
import AddHabitModal from "@/components/AddHabitModal";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardContent from "./_components/DashboardContent";
import type {
  DashboardHabit,
  DashboardStats,
  DashboardTask,
  ProgressPoint,
  TimelineData,
} from "./_components/types";
import { 
  fetchHabits, 
  fetchUserProgress, 
  fetchHabitTimelineData, 
  fetchProgressHistory, 
  fetchHeatmapData,
} from "@/app/actions/habitActions";
import { 
  fetchTasks, 
  createTask, 
  toggleTask, 
  deleteTask, 
  setTaskDeadline 
} from "@/app/actions/taskActions";


const getNDays = (past: number, future: number) => {
  const dates = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  for (let i = -past + 1; i <= future; i++) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() + i);
    dates.push(d);
  }
  return dates;
};

export default function DashboardPage() {
  const weekDates = useMemo(() => getNDays(30, 2), []);
  const [selectedIndex, setSelectedIndex] = useState(29);
  const [habits, setHabits] = useState<DashboardHabit[]>([]);
  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalStreaks: 0,
    credibilityScore: 0,
    habitsCompletedToday: 0,
  });
  const [timelineData, setTimelineData] = useState<TimelineData>({
    habits: [],
    logs: [],
    today: new Date().toISOString(),
  });
  const [activeTab, setActiveTab] = useState<"habits" | "tasks">("habits");
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [progressData, setProgressData] = useState<ProgressPoint[]>([]);
  const [heatmapData, setHeatmapData] = useState<unknown[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const selectedDate = weekDates[selectedIndex];
  const isToday = selectedIndex === 29;

  const fetchAllForDate = async (dateIso: string) => {

    try {
      const [habitData, statData, timeline, progress, taskData, heatmap] =
        await Promise.all([
          fetchHabits(dateIso),
          fetchUserProgress(),
          fetchHabitTimelineData(),
          fetchProgressHistory(),
          fetchTasks(dateIso),
          fetchHeatmapData(),
        ]);

      setHabits(habitData);
      setStats(statData);
      setTimelineData(timeline);
      setProgressData(progress);
      setTasks(taskData);
      setHeatmapData(heatmap);
    } catch (error) {
      console.error("[Dashboard] Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const activeDate = selectedDate.toISOString();
    setLoading(true);
    void fetchAllForDate(activeDate);
  }, [selectedDate]);

  const handleAddTask = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task = await createTask(newTaskTitle);
    if (!task.error) {
      setTasks([task, ...tasks]);
      setNewTaskTitle("");
    }
  };

  const handleToggleTask = async (id: string) => {
    setTasks(
      tasks.map((task) =>
        task._id === id
          ? { ...task, status: task.status === "done" ? "pending" : "done" }
          : task
      )
    );
    await toggleTask(id);
  };

  const handleDeleteTask = async (id: string) => {
    setTasks(tasks.filter((task) => task._id !== id));
    await deleteTask(id);
  };

  const handleSetDeadline = async (id: string, deadline: string | null) => {
    setTasks(tasks.map((task) => task._id === id ? { ...task, deadline } : task));
    await setTaskDeadline(id, deadline);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col lg:h-full lg:flex-row lg:overflow-hidden">
      <DashboardSidebar
        loading={loading}
        selectedDate={selectedDate}
        weekDates={weekDates}
        selectedIndex={selectedIndex}
        habits={habits}
        tasks={tasks}
        activeTab={activeTab}
        newTaskTitle={newTaskTitle}
        isToday={isToday}
        onAddHabit={() => setIsAddModalOpen(true)}
        onSelectDate={setSelectedIndex}
        onSetActiveTab={setActiveTab}
        onTaskTitleChange={setNewTaskTitle}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onSetDeadline={handleSetDeadline}
      />

      <div className="flex-1 relative">
         <DashboardContent
          loading={loading}
          stats={stats}
          timelineData={timelineData}
          progressData={progressData}
          heatmapData={heatmapData}
          onDateClick={(dateStr) => {
            const index = weekDates.findIndex(
              (date) => date.toISOString().split("T")[0] === dateStr
            );
            if (index !== -1) setSelectedIndex(index);
          }}
        />
      </div>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => fetchAllForDate(selectedDate.toISOString())}
      />

    </div>
  );
}
