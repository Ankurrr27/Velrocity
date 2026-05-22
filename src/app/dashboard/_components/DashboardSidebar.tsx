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
      className="relative flex shrink-0 flex-col overflow-hidden border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:bg-[#0b0f19]/84 dark:border-white/5
        h-[85vh] max-h-[85vh] w-full
        lg:h-full lg:max-h-full lg:w-[var(--sidebar-w)] lg:border-b-0 lg:border-r"
    >
      <div
        onMouseDown={onStartResizing}
        className={`absolute right-0 top-0 bottom-0 z-10 hidden w-1 cursor-col-resize transition-colors hover:bg-[rgb(var(--primary))] lg:block ${isResizing ? "bg-[rgb(var(--primary))]" : "bg-transparent"
          }`}
      />

      <div className="border-b border-slate-200/70 px-4 pb-3 pt-4 dark:border-white/5 lg:px-5 lg:pb-5 lg:pt-6">
        <div className="segmented-control flex">
          {(["habits", "tasks"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onSetActiveTab(tab)}
              className={`segmented-tab flex-1 ${activeTab === tab ? "segmented-tab-active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2 shrink-0 px-3 pt-3 lg:mb-5 lg:px-4">
        {loading ? (
          <div className="flex gap-2 overflow-hidden px-1 animate-pulse">
             {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="h-16 w-12 shrink-0 rounded-xl border border-slate-200/70 bg-slate-100 dark:border-white/5 dark:bg-white/5" />
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

      <div className="custom-scrollbar flex-1 overflow-y-auto px-3 pb-12 lg:px-4">
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
                   <div className="h-3 w-20 animate-pulse rounded-full bg-slate-100 dark:bg-white/5" />
                   <div className="h-3 w-10 animate-pulse rounded-full bg-slate-100 dark:bg-white/5" />
                </div>
                {[1,2,3,4,5].map(i => (
                   <div 
                     key={i} 
                     className="group flex animate-pulse items-center justify-between rounded-xl border border-slate-200/70 bg-white px-3 py-3 dark:border-white/5 dark:bg-white/[0.03]"
                     style={{ animationDelay: `${i * 100}ms` }}
                   >
                     <div className="flex items-center gap-4 flex-1">
                        <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-white/10" />
                        <div className="space-y-2">
                           <div className="h-3 w-24 rounded-full bg-slate-100 dark:bg-white/10" />
                           <div className="h-2 w-12 rounded-full bg-slate-100 dark:bg-white/5" />
                        </div>
                     </div>
                     <div className="h-8 w-20 rounded-xl bg-slate-100 dark:bg-white/10" />
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
                <span className="label-elite">Goals</span>
                <div className="stat-pill text-[10px] font-semibold text-[rgb(var(--primary))]">{habits.length} active</div>
              </div>
              <HabitList
                isToday={isToday}
                initialHabits={habits}
                key={habits.length + (habits[0]?.isCompletedToday ? 1 : 0) + (isToday ? 'today' : 'past')}
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
                    placeholder="Type task..."
                    className="input-shell py-3 pl-4 pr-12 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!newTaskTitle.trim()}
                    className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-[rgb(var(--primary))] text-white shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </form>
              )}

              <div className="space-y-2">
                <AnimatePresence initial={false}>
                  {[...tasks]
                    .sort((a, b) => (a.status === 'done' ? 1 : -1))
                    .map((task) => (
                      <TaskItem
                        key={task._id}
                        isToday={isToday}
                        task={task}
                        onToggle={onToggleTask}
                        onDelete={onDeleteTask}
                        onSetDeadline={onSetDeadline}
                      />
                    ))}
                </AnimatePresence>
                
                {tasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center gap-3 py-8 opacity-60">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-white/15">
                        <Plus size={20} className="text-slate-400" />
                      </div>
                      <p className="label-elite">No active tasks</p>
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
