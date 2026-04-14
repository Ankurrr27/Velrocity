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
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDeadline: (id: string, deadline: string | null) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onSetDeadline }: TaskItemProps) {
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
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`
        group flex items-center justify-between px-2 py-2 transition-all duration-300 rounded-xl
        ${isDeadlinePassed ? "bg-red-50 dark:bg-red-950/20" : ""}
      `}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={() => onToggle(task._id)}
          className={`
            w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all
            ${isDone 
              ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)]" 
              : isDeadlinePassed 
                ? "border-red-500" 
                : "border-zinc-200 dark:border-zinc-800 group-hover:border-[rgb(var(--primary))]"
            }
          `}
        >
          {isDone && <Check size={12} className="text-white dark:text-black" strokeWidth={4} />}
        </button>

        <div className="flex flex-col flex-1 min-w-0">
          <span className={`text-sm font-bold uppercase tracking-tight truncate transition-all ${
            isDone 
              ? "text-zinc-400 dark:text-zinc-600 line-through" 
              : isDeadlinePassed 
                ? "text-red-600 dark:text-red-400"
                : "text-zinc-800 dark:text-zinc-200"
          }`}>
            {task.title}
          </span>
          
          <div className="flex items-center gap-2 mt-0.5">
            {isRolledOver && (
              <span className="text-[10px] font-bold text-orange-500 tracking-wider">
                +{rolledOverDays}d Rollover
              </span>
            )}
            {!isDone && task.deadline && (
              <span className={`text-[10px] font-bold tracking-wider flex items-center gap-1 ${isDeadlinePassed ? 'text-red-500' : isDeadlineNear ? 'text-amber-500' : 'text-zinc-400'}`}>
                {isDeadlinePassed ? <AlertCircle size={10} /> : <CalendarClock size={10} />}
                {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          
          {showDatePicker && (
            <input 
              type="date" 
              autoFocus
              className="mt-2 text-xs p-1 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none text-zinc-900 dark:text-zinc-100"
              defaultValue={task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''}
              onChange={handleDateChange}
              onBlur={() => setShowDatePicker(false)}
            />
          )}

        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="text-zinc-400 hover:text-[rgb(var(--primary))] transition-all p-1.5"
          title="Set deadline"
        >
          <CalendarClock size={14} />
        </button>

        <button 
          onClick={() => onDelete(task._id)}
          className="text-zinc-400 hover:text-rose-500 transition-all p-1.5"
          title="Delete task"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
}
