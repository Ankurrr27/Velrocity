'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

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
    <div className="space-y-3">
      <div className="px-1">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Habit activity</h2>
      </div>

      <div className="w-full min-w-0">
        <div className="mb-2 grid grid-cols-[minmax(0,5rem)_repeat(5,minmax(0,1fr))] gap-x-1 lg:grid-cols-[minmax(0,9rem)_repeat(16,minmax(0,1fr))] lg:gap-x-2">
          <div />
          {daysHeader.map((d, i) => {
            const isMobileSpecial = i >= 8 && i <= 12;
            return (
              <div
                key={i}
                className={`flex min-w-0 flex-col items-center ${isMobileSpecial ? '' : 'hidden lg:flex'}`}
              >
                <span className="mb-1 text-[9px] font-medium text-zinc-400">{d.day}</span>
                <span className={`text-[10px] font-bold ${d.isSelected ? 'text-[rgb(var(--primary))]' : 'text-zinc-500'}`}>{d.date}</span>
              </div>
            );
          })}
          </div>

        <div className="space-y-0.5">
          {habits.map((habit, habitIdx) => (
            <div
              key={habit._id}
              className="grid grid-cols-[minmax(0,5rem)_repeat(5,minmax(0,1fr))] items-center gap-x-1 py-0.5 lg:grid-cols-[minmax(0,9rem)_repeat(16,minmax(0,1fr))] lg:gap-x-2"
            >
              <div className="truncate px-1 text-[10px] font-medium text-zinc-600 dark:text-zinc-300 sm:text-xs">
                {habit.title}
              </div>
              {gridData[habitIdx].map((cell, dayIdx) => {
                const isMobileSpecial = dayIdx >= 8 && dayIdx <= 12;
                return (
                  <div
                    key={dayIdx}
                    className={`flex min-w-0 justify-center ${isMobileSpecial ? '' : 'hidden lg:flex'}`}
                  >
                    {cell.isScheduled || cell.isActive ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: (habitIdx * 0.02) + (dayIdx * 0.01) }}
                        className={`h-4 w-4 rounded-[4px] transition-all duration-300 sm:h-5 sm:w-5 sm:rounded-[6px] ${
                          cell.isActive
                            ? 'bg-[rgb(var(--primary))] shadow-sm'
                            : 'border border-zinc-200/20 bg-zinc-100 dark:border-white/5 dark:bg-zinc-900/40'
                        }`}
                      />
                    ) : (
                      <div className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
