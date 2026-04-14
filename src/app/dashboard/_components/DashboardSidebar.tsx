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
        h-[65vh] max-h-[65vh] w-full
        lg:h-full lg:max-h-full lg:w-[var(--sidebar-w)] lg:border-b-0 lg:border-r"
    >
      <div
        onMouseDown={onStartResizing}
        className={`absolute right-0 top-0 bottom-0 z-10 hidden w-1 cursor-col-resize transition-colors hover:bg-[rgb(var(--primary))] lg:block ${isResizing ? "bg-[rgb(var(--primary))]" : "bg-transparent"
          }`}
      />

      <div className="border-b border-zinc-100 dark:border-white/5 px-6 pb-4 pt-6">

        <div className="flex items-center rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 p-1.5 shadow-inner">
          {(["habits", "tasks"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onSetActiveTab(tab)}
              className={`flex-1 rounded-xl px-4 py-2.5 text-[12px] font-bold capitalize tracking-wide transition-all duration-300 ${activeTab === tab
                  ? "bg-white dark:bg-zinc-100 text-zinc-900 dark:text-black shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 shrink-0 px-4 pt-4">
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
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-zinc-400">Habits</span>
                <div className="bg-zinc-100 dark:bg-white/5 px-2 py-1 rounded-lg text-zinc-500 dark:text-zinc-400 text-[10px] font-medium border border-zinc-200 dark:border-white/5">{habits.length} active</div>
              </div>
              <HabitList
                initialHabits={habits}
                key={habits.length + (habits[0]?.isCompletedToday ? 1 : 0)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="tasks-area"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="rounded-[24px] p-4 lg:p-5 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5">
                <div className="flex items-center justify-between px-1 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[rgb(var(--primary))] shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)] animate-pulse" />
                    <span className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">Tasks</span>
                  </div>
                </div>

                <div className="space-y-1">
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
                </div>

                {isToday && (
                  <form onSubmit={onAddTask} className="group relative pt-4">
                    <input
                      value={newTaskTitle}
                      onChange={(e) => onTaskTitleChange(e.target.value)}
                      placeholder="Add a task..."
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl py-3 pl-4 pr-10 text-[12px] font-bold text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-[rgb(var(--primary))] transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!newTaskTitle.trim()}
                      className="absolute right-3 top-[calc(50%+8px)] -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-transform hover:scale-110 disabled:opacity-30"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
