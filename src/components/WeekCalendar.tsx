'use client';

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekCalendarProps {
  weekDates: Date[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  habitCounts?: number[];
}

export default function WeekCalendar({
  weekDates = [],
  selectedIndex = 0,
  onSelect,
  habitCounts = [],
}: WeekCalendarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (itemRefs.current[selectedIndex] && containerRef.current) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
      <div className="flex shrink-0 items-center gap-1">
        <button 
          onClick={() => onSelect(Math.max(0, selectedIndex - 5))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-white/8 dark:bg-white/5 dark:text-zinc-400 dark:hover:text-white"
        >
          <ChevronLeft size={14} strokeWidth={3} />
        </button>
        <button 
          onClick={() => onSelect(Math.min(weekDates.length - 1, selectedIndex + 5))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-white/8 dark:bg-white/5 dark:text-zinc-400 dark:hover:text-white"
        >
          <ChevronRight size={14} strokeWidth={3} />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="flex flex-1 gap-2 overflow-x-auto no-scrollbar scroll-smooth px-1"
      >
        {weekDates.map((date, i) => {
          const isSelected = i === selectedIndex;
          const hasHabit = (habitCounts[i] ?? 0) > 0;
          const offset = i - selectedIndex;
          const isMobileVisible = Math.abs(offset) <= 2;

          return (
            <button
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => onSelect(i)}
              className={`
                relative flex h-[56px] min-w-[44px] sm:h-[72px] sm:min-w-[50px] flex-col items-center justify-center rounded-2xl transition-all duration-300
                ${isMobileVisible ? 'flex' : 'hidden md:flex'}
                ${isSelected 
                  ? 'z-10 scale-[1.05] border border-indigo-500/30 bg-white dark:bg-zinc-800 shadow-[0_15px_30px_-10px_rgba(99,102,241,0.3)]' 
                  : 'border border-transparent bg-white/5 hover:bg-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]'
                }
              `}
            >
              <span className={`mb-0.5 sm:mb-1.5 text-[7px] sm:text-[8px] font-black uppercase tracking-[0.15em] ${isSelected ? 'text-indigo-500' : 'text-zinc-500'}`}>
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className={`text-sm sm:text-base font-black leading-none ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>
                {date.getDate()}
              </span>
              {hasHabit && !isSelected && (
                <div className="absolute bottom-2 h-1 w-1 rounded-full bg-indigo-500/40" />
              )}
              {isSelected && (
                <motion.div 
                  layoutId="calendar-indicator-elite"
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-indigo-500"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
