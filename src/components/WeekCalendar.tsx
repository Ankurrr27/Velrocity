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
                relative flex h-[60px] min-w-[46px] flex-col items-center justify-center rounded-2xl transition-all
                ${isMobileVisible ? 'flex' : 'hidden md:flex'}
                ${isSelected 
                  ? 'z-10 scale-[1.02] border border-[rgba(var(--primary),0.18)] bg-white shadow-lg shadow-[rgba(var(--primary),0.12)] dark:border-white/10 dark:bg-slate-900/90' 
                  : 'border border-transparent bg-white/45 hover:border-zinc-200 hover:bg-white/80 dark:bg-white/4 dark:hover:border-white/10 dark:hover:bg-white/8'
                }
              `}
            >
              <span className={`mb-1 label-elite uppercase ${isSelected ? 'text-[rgb(var(--primary))]' : 'text-zinc-400'}`}>
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className={`text-sm font-bold ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300'}`}>
                {date.getDate()}
              </span>
              {hasHabit && !isSelected && (
                <div className="absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))] opacity-60" />
              )}
              {isSelected && (
                <motion.div 
                  layoutId="calendar-indicator-elite"
                  className="absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full bg-[rgb(var(--primary))]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
