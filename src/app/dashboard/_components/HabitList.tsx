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

  const handleDelete = async (habit: Habit) => {
    const confirmation = window.confirm(`Delete habit "${habit.title}"?`);
    if (confirmation) {
      setHabits(current => current.filter(h => h._id !== habit._id));
      const { deleteHabit } = await import('@/app/actions/habitActions');
      await deleteHabit(habit._id);
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
              group flex items-center justify-between px-4 py-3.5 rounded-[2rem] transition-all duration-500 border
              ${habit.isCompletedToday 
                ? 'bg-indigo-500/5 border-indigo-500/20 opacity-80' 
                : 'bg-zinc-100 dark:bg-zinc-800/40 border-zinc-200 dark:border-white/5 hover:border-indigo-500/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 shadow-xl shadow-black/5'}
            `}
          >
             <div className="flex items-center gap-4 flex-1 min-w-0">
               <motion.button
                 onClick={() => handleToggle(habit._id)}
                 disabled={loadingId === habit._id}
                 whileTap={{ scale: 0.8 }}
                 whileHover={{ scale: 1.1, rotate: habit.isCompletedToday ? -10 : 10 }}
                 className={`
                   w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 focus:outline-none shrink-0
                   ${habit.isCompletedToday
                     ? "bg-indigo-500 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.6)]"
                     : "border-zinc-300 dark:border-zinc-700 group-hover:border-indigo-500 bg-transparent"
                   }
                   ${loadingId === habit._id ? "opacity-30" : ""}
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
                    habit.isCompletedToday ? "text-zinc-500 dark:text-zinc-600 line-through" : "text-zinc-900 dark:text-white"
                  }`}>
                    {habit.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 opacity-80 italic">
                      {habit.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                      {habit.frequency}
                    </span>
                  </div>
               </div>
             </div>
 
             <div className="flex items-center gap-3">
                <div 
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black tracking-[0.15em] transition-all duration-500
                    ${habit.isCompletedToday
                       ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105"
                       : "bg-white/5 text-zinc-500 dark:text-zinc-400 border border-white/5"
                    }
                   `}
                >
                   <Zap size={12} className={habit.isCompletedToday ? "text-white" : "text-zinc-500"} fill="currentColor" />
                   <span>+10</span>
                </div>
                <button 
                  onClick={() => handleDelete(habit)}
                  className="lg:opacity-0 lg:group-hover:opacity-100 text-zinc-500 hover:text-rose-500 transition-all p-2"
                  title="Delete habit"
                >
                   <Trash2 size={16} />
                </button>
             </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
