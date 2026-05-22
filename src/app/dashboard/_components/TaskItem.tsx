'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, CalendarClock, AlertCircle } from 'lucide-react';

interface TaskItemProps {
  task: {
    _id: string;
    title: string;
    status: 'pending' | 'done';
    date: string;
    deadline?: string | null;
  };
  isToday?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDeadline: (id: string, deadline: string | null) => void;
}

export default function TaskItem({ task, isToday = true, onToggle, onDelete, onSetDeadline }: TaskItemProps) {
  const isDone = task.status === 'done';
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Rollover Calculation
  const targetDate = new Date(task.date);
  targetDate.setUTCHours(0, 0, 0, 0);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - targetDate.getTime();
  const rolledOverDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const isRolledOver = !isDone && rolledOverDays > 0;

  // Deadline logic
  let isDeadlineNear = false;
  let isDeadlinePassed = false;
  if (task.deadline && !isDone) {
    const deadlineDate = new Date(task.deadline);
    deadlineDate.setUTCHours(0,0,0,0);
    const timeToDeadline = deadlineDate.getTime() - today.getTime();
    if (timeToDeadline < 0) isDeadlinePassed = true;
    else if (timeToDeadline === 0) isDeadlineNear = true;
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onSetDeadline(task._id, e.target.value);
    } else {
      onSetDeadline(task._id, null);
    }
    setShowDatePicker(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`
        group flex items-center justify-between px-3 py-3 transition-all duration-200 rounded-xl border
        ${isDeadlinePassed 
          ? "bg-rose-500/5 border-rose-500/20" 
          : "bg-white dark:bg-white/[0.03] border-slate-200/70 dark:border-white/5 hover:border-[rgba(var(--primary-rgb),0.24)]"
        }
      `}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={() => isToday && onToggle(task._id)}
          className={`
            w-8 h-8 shrink-0 rounded-xl border flex items-center justify-center transition-all duration-300
            ${isDone 
              ? "bg-[rgb(var(--primary))] border-[rgb(var(--primary))] shadow-lg shadow-blue-500/20" 
              : isDeadlinePassed 
                ? "border-rose-500/50 bg-rose-500/10" 
                : "border-slate-300 dark:border-white/10 group-hover:border-[rgb(var(--primary))] bg-transparent"
            }
            ${!isToday ? "cursor-not-allowed opacity-50" : ""}
          `}
        >
          {isDone && <Check size={14} className="text-white" strokeWidth={4} />}
        </button>

        <div className="flex flex-col flex-1 min-w-0">
          <span className={`text-[12px] font-black uppercase tracking-tight truncate transition-all duration-500 ${
            isDone 
              ? "text-slate-400 line-through" 
              : isDeadlinePassed 
                ? "text-rose-500"
                : "text-slate-950 dark:text-white"
          }`}>
            {task.title}
          </span>
          
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-500">Log</span>
            {isRolledOver && (
              <>
                <span className="w-1 h-1 rounded-full bg-orange-500" />
                <span className="text-[8px] font-black uppercase tracking-[0.15em] text-orange-500">
                  +{rolledOverDays}d rollover
                </span>
              </>
            )}
            {!isDone && task.deadline && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className={`flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.08em] ${isDeadlinePassed ? 'text-rose-500' : isDeadlineNear ? 'text-amber-500' : 'text-slate-500'}`}>
                   {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </>
            )}
          </div>
          
          {showDatePicker && (
            <input 
              type="date" 
              autoFocus
              className="input-shell mt-3 p-2 text-[11px]"
              defaultValue={task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''}
              onChange={handleDateChange}
              onBlur={() => setShowDatePicker(false)}
            />
          )}

        </div>
      </div>

      <div className="flex items-center gap-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
        {isToday && !isDone && (
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="p-2 text-slate-400 transition-all hover:text-[rgb(var(--primary))]"
            title="Set deadline"
          >
            <CalendarClock size={16} />
          </button>
        )}

        {isToday && !isDone && (
          <button 
            onClick={() => onDelete(task._id)}
            className="p-2 text-slate-400 transition-all hover:text-rose-500"
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
