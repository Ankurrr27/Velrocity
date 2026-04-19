'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import { Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  fetchActivityFeed, 
  fetchProgressHistory, 
  fetchHeatmapData,
  fetchUserProfile
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
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  const selectedDate = weekDates[selectedIndex];
  const isToday = selectedIndex === 29;

  const fetchAllForDate = async (dateIso: string) => {

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

  const [userData, setUserData] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const fetchUserData = async () => {
     const data = await fetchUserProfile();
     setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
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
          onShare={() => setShowShareModal(true)}
        />
      </div>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => fetchAllForDate(selectedDate.toISOString())}
      />

      {/* SHARE MODAL */}
      <AnimatePresence>
        {showShareModal && userData && (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
             onClick={() => setShowShareModal(false)}
           >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl space-y-8"
                onClick={e => e.stopPropagation()}
              >
                 <div className="space-y-1 text-center">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center text-indigo-500 mx-auto mb-4 border border-indigo-500/20">
                       <Link2 size={24} />
                    </div>
                    <h3 className="text-xl font-black text-white italic tracking-tighter">Deploy Plan</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Global sync ready</p>
                 </div>

                 <div className="bg-black/60 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                    <input 
                      readOnly 
                      value={`${window.location.origin}/profile/${userData.username}`} 
                      className="flex-1 bg-transparent text-[10px] font-black tracking-widest text-zinc-400 outline-none"
                    />
                 </div>

                 <button 
                   onClick={() => {
                     navigator.clipboard.writeText(`${window.location.origin}/profile/${userData.username}`);
                     alert("Vector copied to clipboard.");
                     setShowShareModal(false);
                   }}
                   className="w-full py-5 rounded-2xl bg-indigo-500 text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                 >
                    Copy Access Key
                 </button>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

