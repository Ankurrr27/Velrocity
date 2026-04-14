'use client';

import { useState, useEffect, useRef, useMemo } from "react";
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
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  const selectedDate = weekDates[selectedIndex];
  const isToday = selectedIndex === 29;

  const fetchAllForDate = async (dateIso: string) => {
    const {
      fetchHabits,
      fetchUserProgress,
      fetchHabitTimelineData,
      fetchActivityFeed,
      fetchProgressHistory,
      fetchHeatmapData,
    } = await import("@/app/actions/habitActions");
    const { fetchTasks } = await import("@/app/actions/taskActions");

    try {
      const [habitData, statData, timeline, , progress, taskData, heatmap] =
        await Promise.all([
          fetchHabits(dateIso),
          fetchUserProgress(),
          fetchHabitTimelineData(),
          fetchActivityFeed(),
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

    const { createTask } = await import("@/app/actions/taskActions");
    const task = await createTask(newTaskTitle);
    if (!task.error) {
      setTasks([task, ...tasks]);
      setNewTaskTitle("");
    }
  };

  const handleToggleTask = async (id: string) => {
    const { toggleTask } = await import("@/app/actions/taskActions");
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
    const { deleteTask } = await import("@/app/actions/taskActions");
    setTasks(tasks.filter((task) => task._id !== id));
    await deleteTask(id);
  };

  const handleSetDeadline = async (id: string, deadline: string | null) => {
    const { setTaskDeadline } = await import("@/app/actions/taskActions");
    setTasks(tasks.map((task) => task._id === id ? { ...task, deadline } : task));
    await setTaskDeadline(id, deadline);
  };

  const isResizingRef = useRef(false);

  const startResizing = () => { setIsResizing(true); isResizingRef.current = true; };
  const stopResizing = () => { setIsResizing(false); isResizingRef.current = false; };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      const newWidth = e.clientX - 72;
      if (newWidth > 280 && newWidth < 600) setSidebarWidth(newWidth);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden lg:flex-row">
      <DashboardSidebar
        loading={loading}
        sidebarWidth={sidebarWidth}
        isResizing={isResizing}
        selectedDate={selectedDate}
        weekDates={weekDates}
        selectedIndex={selectedIndex}
        habits={habits}
        tasks={tasks}
        activeTab={activeTab}
        newTaskTitle={newTaskTitle}
        isToday={isToday}
        onStartResizing={startResizing}
        onSelectDate={setSelectedIndex}
        onSetActiveTab={setActiveTab}
        onTaskTitleChange={setNewTaskTitle}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onSetDeadline={handleSetDeadline}
      />

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

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => fetchAllForDate(selectedDate.toISOString())}
      />
    </div>
  );
}
