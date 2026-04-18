'use client';

import React from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HabitList from "./HabitList";
import WeekCalendar from "@/components/WeekCalendar";
import TaskItem from "./TaskItem";
import type { DashboardHabit, DashboardTask } from "./types";

interface DashboardSidebarProps {
  loading: boolean;
  sidebarWidth: number;
  isResizing: boolean;
  selectedDate: Date;
  weekDates: Date[];
  selectedIndex: number;
  habits: DashboardHabit[];
  tasks: DashboardTask[];
  activeTab: "habits" | "tasks";
  newTaskTitle: string;
  isToday: boolean;
  onStartResizing: () => void;
  onSelectDate: (index: number) => void;
  onSetActiveTab: (tab: "habits" | "tasks") => void;
  onTaskTitleChange: (value: string) => void;
  onAddTask: (e?: React.FormEvent) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onSetDeadline: (id: string, deadline: string | null) => void;
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
  const {
    loading,
    sidebarWidth,
    isResizing,
    selectedDate,
    weekDates,
    selectedIndex,
    habits,
    tasks,
    activeTab,
    newTaskTitle,
    isToday,
    onStartResizing,
    onSelectDate,
    onSetActiveTab,
    onTaskTitleChange,
    onAddTask,
    onToggleTask,
    onDeleteTask,
    onSetDeadline,
  } = props;

  return (
    <aside
      style={{ ['--sidebar-w' as string]: `${sidebarWidth}px` } as React.CSSProperties}
      className="relative flex shrink-0 flex-col overflow-hidden border-b border-zinc-200 bg-white dark:bg-zinc-950 dark:border-white/5
        h-[72vh] max-h-[72vh] w-full
        lg:h-full lg:max-h-full lg:w-[var(--sidebar-w)] lg:border-b-0 lg:border-r"
    >
      <div
        onMouseDown={onStartResizing}
        className={`absolute right-0 top-0 bottom-0 z-10 hidden w-1 cursor-col-resize transition-colors hover:bg-[rgb(var(--primary))] lg:block ${isResizing ? "bg-[rgb(var(--primary))]" : "bg-transparent"
          }`}
      />

      <div className="border-b border-zinc-100 dark:border-white/5 px-6 pb-2 pt-4 lg:pb-6 lg:pt-8">
        <div className="flex items-center rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5 p-1 lg:p-1.5 shadow-inner backdrop-blur-sm">
          {(["habits", "tasks"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onSetActiveTab(tab)}
              className={`flex-1 rounded-xl px-2 py-2 sm:px-4 sm:py-3 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${activeTab === tab
                  ? "bg-white dark:bg-zinc-100 text-zinc-900 dark:text-black shadow-[0_4px_20px_rgba(0,0,0,0.1)] scale-[1.02]"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2 lg:mb-6 shrink-0 px-4 pt-2">
        {loading ? (
          <div className="flex gap-2 overflow-hidden px-1 animate-pulse">
             {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="h-16 w-12 shrink-0 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/10 dark:border-white/5" />
             ))}
          </div>
        ) : (
          <WeekCalendar
            weekDates={weekDates}
            selectedIndex={selectedIndex}
            onSelect={onSelectDate}
            habitCounts={weekDates.map((_, i) => (i === 29 ? habits.length : 0))}
          />
        )}
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          {loading ? (
             <motion.div 
               key="skeleton-loading-state"
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="space-y-4 pt-2"
             >
                <div className="flex justify-between px-2">
                   <div className="h-3 w-20 bg-zinc-100 dark:bg-white/5 rounded-full animate-pulse" />
                   <div className="h-3 w-10 bg-zinc-100 dark:bg-white/5 rounded-full animate-pulse" />
                </div>
                {[1,2,3,4,5].map(i => (
                   <div 
                     key={i} 
                     className="group flex items-center justify-between px-3 py-3 rounded-[1.25rem] bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5 animate-pulse"
                     style={{ animationDelay: `${i * 100}ms` }}
                   >
                     <div className="flex items-center gap-4 flex-1">
                        <div className="w-8 h-8 rounded-2xl bg-zinc-100 dark:bg-white/10" />
                        <div className="space-y-2">
                           <div className="h-3 w-24 bg-zinc-100 dark:bg-white/10 rounded-full" />
                           <div className="h-2 w-12 bg-zinc-100 dark:bg-white/5 rounded-full" />
                        </div>
                     </div>
                     <div className="h-8 w-20 bg-zinc-100 dark:bg-white/10 rounded-xl" />
                   </div>
                ))}
             </motion.div>
          ) : activeTab === "habits" ? (
            <motion.div
              key="habits-area"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Objectives</span>
                <div className="bg-indigo-500/10 px-2 py-1 rounded-lg text-indigo-500 text-[10px] font-black uppercase tracking-wider border border-indigo-500/20">{habits.length} Active</div>
              </div>
              <HabitList
                initialHabits={habits}
                key={habits.length + (habits[0]?.isCompletedToday ? 1 : 0)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="tasks-area"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              {isToday && (
                <form onSubmit={onAddTask} className="group relative">
                  <input
                    value={newTaskTitle}
                    onChange={(e) => onTaskTitleChange(e.target.value)}
                    placeholder="Capture objective..."
                    className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl py-4 pl-5 pr-12 text-[12px] font-black text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-indigo-500/50 shadow-inner transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newTaskTitle.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-lg"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </form>
              )}

              <div className="space-y-2">
                <AnimatePresence initial={false}>
                  {tasks.map((task) => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onToggle={onToggleTask}
                      onDelete={onDeleteTask}
                      onSetDeadline={onSetDeadline}
                    />
                  ))}
                </AnimatePresence>
                
                {tasks.length === 0 && (
                  <div className="py-8 flex flex-col items-center justify-center gap-3 opacity-30">
                      <div className="w-12 h-12 rounded-2xl border border-dashed border-zinc-400 dark:border-zinc-100 flex items-center justify-center">
                        <Plus size={20} className="text-zinc-400 dark:text-zinc-100" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-100">No active tasks</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
