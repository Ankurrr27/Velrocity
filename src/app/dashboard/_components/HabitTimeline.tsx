'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const habits = [
  "CodeChef Contest",
  "Leetcode",
  "GFG",
  "Leetcode Contest",
  "Gym",
  "DSA",
  "Github"
];

const daysHeader = [
  { day: 'Tue', date: 7 },
  { day: 'Wed', date: 8 },
  { day: 'Thu', date: 9 },
  { day: 'Fri', date: 10 },
  { day: 'Sat', date: 11 },
  { day: 'Sun', date: 12, isSelected: true },
  { day: 'Mon', date: 13 },
  { day: 'Tue', date: 14 },
  { day: 'Wed', date: 15 },
  { day: 'Thu', date: 16 },
  { day: 'Fri', date: 17 },
  { day: 'Sat', date: 18 },
  { day: 'Sun', date: 19 },
  { day: 'Mon', date: 20 },
  { day: 'Tue', date: 21 },
  { day: 'Wed', date: 22 },
];

interface HabitTimelineProps {
  loading?: boolean;
  data: {
    habits: { _id: string; title: string }[];
    logs: string[];
    expectedLogs?: string[];
    today: string;
  };
}

export default function HabitTimeline({ data, loading }: HabitTimelineProps) {
  const { habits, logs, expectedLogs = [], today: todayStr } = data;
  const todayDate = new Date(todayStr);

  const daysHeader = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const d = new Date(todayDate);
      d.setDate(todayDate.getDate() - 10 + i);
      return {
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.getDate(),
        dateStr: d.toISOString().split('T')[0],
        isSelected: i === 10
      };
    });
  }, [todayStr]);

  const gridData = useMemo(() => {
    return habits.map(habit => {
      return daysHeader.map(d => {
        const key = `${habit._id}-${d.dateStr}`;
        return { 
          isActive: logs.includes(key),
          isScheduled: expectedLogs.includes(key)
        };
      });
    });
  }, [habits, logs, expectedLogs, daysHeader]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-4 w-32 bg-zinc-100 dark:bg-white/5 rounded" />
        <div className="space-y-3">
           {[1,2,3,4,5].map(i => (
             <div key={i} className="flex gap-4">
                <div className="w-40 h-6 bg-zinc-50 dark:bg-white/5 rounded" />
                <div className="flex-1 flex justify-between gap-2">
                   {[1,2,3,4,5,6,7,8,9,10,11,12].map(j => (
                     <div key={j} className="w-5 h-5 bg-zinc-50 dark:bg-white/5 rounded" />
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1.5 px-1">
        <span className="text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">Habit Timeline</span>
      </div>

      <div className="overflow-x-auto no-scrollbar pb-6">
        <div className="w-full">
          {/* Header Row */}
          <div className="flex mb-4">
            <div className="w-32 sm:w-40 shrink-0" />
            <div className="flex flex-1 justify-between gap-1 sm:gap-2">
              {daysHeader.map((d, i) => {
                const isMobileSpecial = i >= 8 && i <= 12;
                return (
                  <div 
                    key={i} 
                    className={`
                      flex flex-col items-center w-full max-w-[32px] 
                      ${isMobileSpecial ? 'flex' : 'hidden lg:flex'}
                      ${d.isSelected ? 'relative' : ''}
                    `}
                  >
                    <span className="text-[9px] font-medium text-zinc-400 mb-1">{d.day}</span>
                    <span className={`text-[10px] font-bold ${d.isSelected ? 'text-[rgb(var(--primary))]' : 'text-zinc-500'}`}>{d.date}</span>
                    {d.isSelected && (
                      <div className="absolute -top-4 inset-x-0 flex justify-center">
                         <div className="w-px h-60 bg-zinc-200/50 dark:bg-zinc-800/50 absolute top-10 pointer-events-none" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Habit Rows */}
          <div className="space-y-1">
            {habits.map((habit, habitIdx) => (
              <div key={habit._id} className="group flex items-center hover:bg-zinc-50/50 dark:hover:bg-white/5 rounded-xl transition-colors py-1">
                <div className="w-32 sm:w-40 shrink-0 text-[10px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-300 px-2 truncate">
                  {habit.title}
                </div>
                <div className="flex flex-1 justify-between gap-1 sm:gap-2">
                  {gridData[habitIdx].map((cell, dayIdx) => {
                    const isMobileSpecial = dayIdx >= 8 && dayIdx <= 12;
                    return (
                      <div 
                        key={dayIdx} 
                        className={`
                          w-full max-w-[32px] flex justify-center
                          ${isMobileSpecial ? 'flex' : 'hidden lg:flex'}
                        `}
                      >
                         {cell.isScheduled || cell.isActive ? (
                           <motion.div 
                             initial={{ scale: 0.8, opacity: 0 }}
                             animate={{ scale: 1, opacity: 1 }}
                             transition={{ delay: (habitIdx * 0.02) + (dayIdx * 0.01) }}
                             className={`
                               w-5 h-5 rounded-[6px] transition-all duration-300
                               ${cell.isActive 
                                 ? 'bg-[rgb(var(--primary))] shadow-sm'
                                 : 'bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200/20 dark:border-white/5'
                               }
                               ${daysHeader[dayIdx].isSelected ? 'ring-2 ring-[rgba(var(--primary),0.1)] ring-offset-2 dark:ring-offset-zinc-950' : ''}
                             `}
                           />
                         ) : (
                           <div className="w-5 h-5" />
                         )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
