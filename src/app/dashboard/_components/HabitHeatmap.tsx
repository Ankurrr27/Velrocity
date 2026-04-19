'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HabitHeatmap({ 
  data = [], 
  loading = false, 
  onDateClick 
}: { 
  data: any[], 
  loading: boolean, 
  onDateClick?: (date: string) => void 
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  if (loading) {
    return (
      <div className="surface-card p-6 h-[200px] flex flex-col gap-4">
        <div className="h-4 w-40 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
        <div className="flex-1 w-full bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 bg-[length:200%_100%] animate-shimmer rounded-xl" />
      </div>
    );
  }

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-zinc-200/50 dark:bg-zinc-800/40 border-zinc-300/20 dark:border-white/5';
      case 1: return 'bg-[rgba(var(--primary-rgb),0.2)]';
      case 2: return 'bg-[rgba(var(--primary-rgb),0.45)]';
      case 3: return 'bg-[rgba(var(--primary-rgb),0.75)]';
      case 4: return 'bg-[rgb(var(--primary-rgb))]';
      default: return 'bg-zinc-200/50 dark:bg-zinc-800/40';
    }
  };

  // Calculate month labels positions
  const displayData = isMobile ? data.slice(-91) : data;
  let paddedData = [...displayData];
  if (paddedData.length > 0) {
    const firstDay = new Date(paddedData[0].date);
    const padding = firstDay.getUTCDay(); // 0 is Sun
    paddedData = [...Array(padding).fill({ isEmpty: true }), ...paddedData];
  }
  const monthLabels: { label: string, index: number }[] = [];
  paddedData.forEach((day, i) => {
    if (day.isEmpty) return;
    if (i % 7 === 0) { // Check beginning of each week
      const d = new Date(day.date);
      const monthName = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      if (monthLabels.length === 0 || monthLabels[monthLabels.length - 1].label !== monthName) {
        monthLabels.push({ label: monthName, index: Math.floor(i / 7) });
      }
    }
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8 px-1">
        <span className="text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">Activity Heatmap</span>
        <div className="flex items-center gap-2 opacity-60">
           <span className="text-[10px] text-zinc-400">Less</span>
           <div className="flex gap-1.5">
             {[0, 1, 2, 3, 4].map(i => (
               <div key={i} className={`w-3 h-3 rounded-[3px] ${getIntensityColor(i)}`} />
             ))}
           </div>
           <span className="text-[10px] text-zinc-400">More</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Y-AXIS DAYS */}
        <div className="flex flex-col justify-between py-2 text-[9px] font-medium text-zinc-400 h-[115px] pr-2">
           <span>Sun</span>
           <span className="opacity-0">Mon</span>
           <span>Tue</span>
           <span className="opacity-0">Wed</span>
           <span>Thu</span>
           <span className="opacity-0">Fri</span>
           <span>Sat</span>
        </div>

        <div className="flex-1 overflow-hidden">
           <div className="flex justify-end">
             <div className="relative" style={{ width: `${Math.ceil(paddedData.length / 7) * 17}px` }}>
                {/* MONTH LABELS */}
                <div className="absolute -top-6 left-0 right-0 flex text-[9px] font-black uppercase tracking-widest text-zinc-500/80 pointer-events-none h-6">
                   {monthLabels.map((m, i) => (
                     <div key={i} style={{ 
                       position: 'absolute',
                       left: `${m.index * 17}px`
                     }}>
                        {m.label}
                     </div>
                   ))}
                </div>

                <div className="grid grid-flow-col grid-rows-7 gap-[4px] pt-1">
                  {paddedData.map((day: any, i: number) => {
                    if (day.isEmpty) {
                       return <div key={i} className="w-[13px] h-[13px]" />;
                    }
                    const intensity = day.intensity;
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: (displayData.length - (i - (paddedData.length - displayData.length))) * 0.001 
                        }}
                        title={`${day.count || 0} done`}
                        className={`
                          w-[13px] h-[13px] rounded-[3px] relative group
                          ${intensity === 0 ? getIntensityColor(0) : getIntensityColor(intensity)}
                          transition-all duration-300 hover:scale-150 hover:z-20
                          ${intensity >= 3 ? 'shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]' : ''}
                        `}
                      >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 rounded-[3px] bg-[rgb(var(--primary))] opacity-0 group-hover:opacity-20 blur-[2px] transition-opacity" />
                      </motion.div>
                    );
                  })}
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
