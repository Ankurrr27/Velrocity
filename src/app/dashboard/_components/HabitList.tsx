'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Zap } from 'lucide-react';
import { checkInHabit, deleteHabit } from '@/app/actions/habitActions';

type Habit = {
  _id: string;
  title: string;
  type: string;
  frequency: string;
  isCompletedToday: boolean;
};

export default function HabitList({ initialHabits, isToday = true }: { initialHabits: Habit[], isToday?: boolean }) {
  const [habits, setHabits] = useState(initialHabits);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggle = async (habitId: string) => {
    if (!isToday) return;
    setHabits(current => 
      current.map(h => 
        h._id === habitId ? { ...h, isCompletedToday: !h.isCompletedToday } : h
      )
    );
    
    setLoadingId(habitId);
    await checkInHabit(habitId);
    setLoadingId(null);
  };

  const handleDelete = async (habit: Habit) => {
    if (!isToday) return;
    const confirmation = window.confirm(`Delete habit "${habit.title}"?`);
    if (confirmation) {
      setHabits(current => current.filter(h => h._id !== habit._id));
      await deleteHabit(habit._id);
    }
  };

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 py-16 text-center">
        <div className="space-y-1">
           <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No habits yet</p>
           <p className="text-xs text-slate-400">Add a habit to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {[...habits]
          .sort((a, b) => (a.isCompletedToday ? 1 : -1))
          .map((habit) => (
            <motion.div
              key={habit._id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            className={`
              group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 border
              ${habit.isCompletedToday 
                ? 'bg-[rgba(var(--primary-rgb),0.06)] border-[rgba(var(--primary-rgb),0.18)] opacity-90' 
                : 'bg-white dark:bg-white/[0.03] border-slate-200/80 dark:border-white/5 hover:border-[rgba(var(--primary-rgb),0.26)] shadow-sm'}
            `}
          >
             <div className="flex items-center gap-4 flex-1 min-w-0">
               <motion.button
                 onClick={() => handleToggle(habit._id)}
                 disabled={loadingId === habit._id}
                 whileTap={{ scale: 0.8 }}
                 whileHover={{ scale: 1.1, rotate: habit.isCompletedToday ? -10 : 10 }}
                 className={`
                   w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 focus:outline-none shrink-0
                   ${habit.isCompletedToday
                     ? "bg-[rgb(var(--primary))] border-[rgb(var(--primary))] shadow-lg shadow-blue-500/20"
                     : "border-slate-300 dark:border-white/10 group-hover:border-[rgb(var(--primary))] bg-transparent"
                   }
                    ${loadingId === habit._id || !isToday ? "opacity-30 cursor-not-allowed" : ""}
                  `}
               >
                 <AnimatePresence mode="wait">
                   {habit.isCompletedToday ? (
                     <motion.div 
                       key="check" 
                       initial={{ scale: 0, rotate: -90 }} 
                       animate={{ scale: 1, rotate: 0 }} 
                       className="text-white"
                     >
                        <Check size={18} strokeWidth={4} />
                     </motion.div>
                   ) : (
                     <motion.div 
                       key="empty" 
                       initial={{ opacity: 0 }} 
                       animate={{ opacity: 1 }}
                       className="text-zinc-500"
                     >
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.button>
 
               <div className="flex flex-col min-w-0">
                 <span className={`text-[13px] font-black uppercase tracking-tight truncate transition-all duration-500 ${
                    habit.isCompletedToday ? "text-slate-400 line-through" : "text-slate-950 dark:text-white"
                  }`}>
                    {habit.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[rgb(var(--primary))]">
                      {habit.type}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.06em] text-slate-500">
                      {habit.frequency}
                    </span>
                  </div>
               </div>
             </div>
              {isToday && !habit.isCompletedToday && (
                <div className="flex items-center gap-3">
                   <button 
                     onClick={() => handleDelete(habit)}
                     className="p-2 text-slate-400 transition-all hover:text-rose-500 lg:opacity-0 lg:group-hover:opacity-100"
                     title="Delete habit"
                   >
                      <Trash2 size={16} />
                   </button>
                </div>
              )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
