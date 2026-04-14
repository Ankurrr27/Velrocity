'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Zap } from 'lucide-react';
import { checkInHabit } from '@/app/actions/habitActions';

type Habit = {
  _id: string;
  title: string;
  type: string;
  frequency: string;
  isCompletedToday: boolean;
};

export default function HabitList({ initialHabits }: { initialHabits: Habit[] }) {
  const [habits, setHabits] = useState(initialHabits);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggle = async (habitId: string) => {
    setHabits(current => 
      current.map(h => 
        h._id === habitId ? { ...h, isCompletedToday: !h.isCompletedToday } : h
      )
    );
    
    setLoadingId(habitId);
    await checkInHabit(habitId);
    setLoadingId(null);
  };

  const handleDelete = (habit: Habit) => {
    const confirmation = window.confirm(`Delete habit "${habit.title}"?`);
    if (confirmation) {
      setHabits(current => current.filter(h => h._id !== habit._id));
      // Call delete action here if implemented
    }
  };

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="space-y-1">
           <p className="text-zinc-500 dark:text-zinc-400 text-[12px] font-semibold">No habits yet</p>
           <p className="text-xs text-zinc-400 dark:text-zinc-500">Add a habit to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {habits.map((habit) => (
          <motion.div
            key={habit._id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`
              group flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] transition-all duration-500 border border-transparent
              ${habit.isCompletedToday 
                ? 'bg-zinc-100/80 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-white/5 opacity-85' 
                : 'bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-black/5'}
            `}
          >
             <div className="flex items-center gap-4 flex-1 min-w-0">
               <button
                 onClick={() => handleToggle(habit._id)}
                 disabled={loadingId === habit._id}
                 className={`
                   w-8 h-8 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 focus:outline-none
                   ${habit.isCompletedToday
                     ? "bg-[rgb(var(--primary))] border-[rgb(var(--primary))] shadow-[0_4px_20px_rgba(var(--primary-rgb),0.5)] rotate-[360deg]"
                     : "border-zinc-200 group-hover:border-[rgb(var(--primary))] bg-transparent"
                   }
                   ${loadingId === habit._id ? "opacity-50" : ""}
                 `}
               >
                 {habit.isCompletedToday && <Check size={16} className="text-white" strokeWidth={4} />}
               </button>
 
               <div className="flex flex-col min-w-0">
                 <span className={`text-sm font-bold tracking-tight truncate transition-all duration-500 ${
                    habit.isCompletedToday ? "text-zinc-400 dark:text-zinc-600 line-through" : "text-zinc-900 dark:text-white"
                  }`}>
                    {habit.title}
                  </span>
                  <span className="text-[9px] font-semibold tracking-wide text-[rgb(var(--primary))] opacity-80 capitalize">
                    {habit.frequency}
                  </span>
               </div>
             </div>
 
             <div className="flex items-center gap-3">
                <div 
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-500
                    ${habit.isCompletedToday
                       ? "bg-[rgb(var(--primary))] text-white shadow-lg shadow-[rgba(var(--primary-rgb),0.3)] scale-105"
                       : "bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 opacity-70"
                    }
                   `}
                >
                   <Zap size={12} className={habit.isCompletedToday ? "text-white" : "text-zinc-400"} fill="currentColor" />
                   <span>+10 XP</span>
                </div>
                <button 
                  onClick={() => handleDelete(habit)}
                  className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-rose-500 transition-all p-2"
                >
                   <Trash2 size={15} />
                </button>
             </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
