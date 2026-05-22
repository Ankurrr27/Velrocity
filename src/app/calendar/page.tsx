'use client';

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  NotebookPen,
  Save,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDayStatus, fetchNote, saveNote as saveNoteAction } from "@/app/actions/calendarActions";

// Date helpers
const toDateKey = (date: Date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const startOfWeek = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  result.setDate(diff);
  result.setHours(0,0,0,0);
  return result;
};

const getWeekDates = (anchor: Date) => {
  const start = startOfWeek(anchor);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export default function CalendarPage() {
  const [weekAnchor, setWeekAnchor] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [habits, setHabits] = useState<any[]>([]);
  const [weeklyCounts, setWeeklyCounts] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [savedNote, setSavedNote] = useState("");
  const [noteStatus, setNoteStatus] = useState("idle");

  const weekDates = useMemo(() => getWeekDates(weekAnchor), [weekAnchor]);
  const todayKey = toDateKey(new Date());
  const selectedKey = toDateKey(selectedDate);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [h, n, ...counts] = await Promise.all([
        fetchDayStatus(selectedDate.toISOString()),
        fetchNote(selectedKey),
        ...weekDates.map(d => fetchDayStatus(d.toISOString()))
      ]);
      
      setHabits(h);
      setSavedNote(n?.content || "");
      
      const newCounts: Record<string, any> = {};
      counts.forEach((dayHabits, i) => {
        const key = toDateKey(weekDates[i]);
        newCounts[key] = {
          total: dayHabits.length,
          completed: dayHabits.filter((hb: any) => hb.done).length
        };
      });
      setWeeklyCounts(newCounts);
      setLoading(false);
    };
    load();
  }, [selectedKey, weekAnchor]);

  const handleSaveNote = async () => {
    setNoteStatus("saving");
    await saveNoteAction(selectedKey, savedNote);
    setNoteStatus("saved");
    setTimeout(() => setNoteStatus("idle"), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-transparent lg:overflow-hidden font-sans">
      
      <aside className="flex w-full flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/5 dark:bg-[#0b0f19]/86 lg:h-full lg:w-[320px] lg:shrink-0">
         <div className="border-b border-slate-200/70 p-6 dark:border-white/5 lg:p-8">
            <div className="flex flex-col gap-8 mb-10">
               <div className="space-y-1">
                  <span className="label-elite">Chronological axis</span>
                  <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-950 dark:text-white">
                    Weekly Loop
                  </h1>
               </div>

               <div className="segmented-control flex items-center justify-between">
                  <button onClick={() => setWeekAnchor(addDays(weekAnchor, -7))} className="rounded-xl p-2.5 text-slate-400 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:text-white">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setWeekAnchor(new Date())} className="label-elite px-4 hover:text-[rgb(var(--primary))]">Current</button>
                  <button onClick={() => setWeekAnchor(addDays(weekAnchor, 7))} className="rounded-xl p-2.5 text-slate-400 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:text-white">
                    <ChevronRight size={18} />
                  </button>
               </div>
            </div>

            <div className="space-y-2.5">
               {weekDates.map((date) => {
                 const key = toDateKey(date);
                 const isSelected = key === selectedKey;
                 const isToday = key === todayKey;
                 const count = weeklyCounts[key] || { total: 0, completed: 0 };
                 const percentage = count.total > 0 ? (count.completed / count.total) * 100 : 0;

                 return (
                   <button
                     key={key}
                     onClick={() => setSelectedDate(date)}
                     className={`group relative flex w-full items-center gap-5 rounded-xl border p-4 transition-all duration-200 ${
                       isSelected 
                         ? 'bg-[rgba(var(--primary-rgb),0.08)] border-[rgba(var(--primary-rgb),0.25)]' 
                         : 'border-transparent bg-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-white/5 dark:hover:bg-white/5'
                     }`}
                   >
                     {isSelected && (
                       <motion.div 
                          layoutId="calendarActiveInd" 
                          className="absolute bottom-4 left-[-1px] top-4 w-1 rounded-r-full bg-[rgb(var(--primary))] shadow-[0_0_14px_rgba(var(--primary-rgb),0.7)]" 
                       />
                     )}
                     <div className="w-12 text-center">
                        <div className={`label-elite mb-1 ${isSelected ? 'text-[rgb(var(--primary))] opacity-100' : 'text-slate-500 opacity-70'}`}>
                          {date.toLocaleDateString(undefined, { weekday: "short" })}
                        </div>
                        <div className={`text-2xl font-semibold leading-none ${isSelected ? 'text-slate-950 dark:text-white' : 'text-slate-500'}`}>
                          {date.getDate()}
                        </div>
                     </div>
                     <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center pr-1">
                           <span className={`label-elite ${isSelected ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500'}`}>
                             {count.completed}/{count.total} Unit
                           </span>
                           {isToday && (
                             <div className="relative">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                               <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[3px] animate-ping" />
                             </div>
                           )}
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className={`h-full ${isSelected ? 'bg-[rgb(var(--primary))]' : 'bg-slate-300 dark:bg-slate-700'}`} />
                        </div>
                     </div>
                   </button>
                 );
               })}
            </div>
         </div>
      </aside>

      <main className="page-shell relative w-full flex-1 overflow-hidden lg:h-full lg:overflow-y-auto">
         <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-12 relative z-10">
            
            <header className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[rgb(var(--primary))] opacity-50" />
                  <span className="label-elite text-[rgb(var(--primary))]">Observation phase</span>
               </div>
               <h2 className="text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
                 {selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
               </h2>
               <div className="label-elite flex max-w-lg items-center gap-2 leading-relaxed">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Temporal sector synchronized with global objective registry.
               </div>
            </header>

            <div className="surface-card space-y-6 p-6 sm:p-8">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="rounded-xl border border-white/20 bg-[rgb(var(--primary))] p-3 text-white shadow-lg shadow-blue-500/20">
                        <NotebookPen size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-semibold leading-tight text-slate-950 dark:text-white">Daily note</h3>
                        <p className="mt-1 text-xs font-medium text-slate-500">Private operational metadata</p>
                     </div>
                  </div>
                  <button 
                    onClick={handleSaveNote}
                    disabled={noteStatus === "saving"}
                    className="btn-primary relative min-w-[150px] overflow-hidden"
                  >
                    <Save size={14} className="relative z-10" />
                    <span className="relative z-10 text-[10px]">
                      {noteStatus === "saving" ? "Syncing..." : noteStatus === "saved" ? "Verified" : "Sync Data"}
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
               </div>
               <div className="relative group">
                  <textarea
                    value={savedNote}
                    onChange={(e) => setSavedNote(e.target.value)}
                    placeholder="Begin intelligence entry..."
                    className="custom-scrollbar input-shell h-48 resize-none p-5 text-base leading-relaxed"
                  />
               </div>
            </div>

            {/* Objectives List */}
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="h-8 w-1.5 rounded-full bg-[rgb(var(--primary))] shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Active objectives</h3>
                 </div>
                 <div className="label-elite opacity-70">Section 04</div>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      Array(3).fill(0).map((_, i) => <div key={i} className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-white/5 dark:bg-white/[0.03]" />)
                    ) : habits.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center dark:border-white/10">
                         <p className="text-sm font-medium text-slate-500">No objectives detected for this date.</p>
                      </div>
                    ) : habits.map((hb, i) => (
                      <motion.div
                        key={hb.habitId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`group flex items-center justify-between rounded-2xl border p-5 transition-all duration-200 ${
                          hb.done 
                            ? 'bg-emerald-500/5 border-emerald-500/10' 
                            : 'bg-white border-slate-200 hover:border-[rgba(var(--primary-rgb),0.24)] dark:bg-white/[0.03] dark:border-white/5'
                        }`}
                      >
                         <div className="flex items-center gap-6">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                              hb.done 
                                ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-white' 
                                : 'border-zinc-800 text-transparent group-hover:border-zinc-700'
                            }`}>
                               <CheckCircle2 size={18} strokeWidth={4} />
                            </div>
                            <div>
                               <div className={`text-base font-semibold transition-all duration-300 ${hb.done ? 'text-slate-400 line-through' : 'text-slate-950 dark:text-white'}`}>{hb.title}</div>
                               <div className="flex items-center gap-2 mt-1">
                                  <div className={`w-1 h-1 rounded-full ${hb.done ? 'bg-emerald-500' : 'bg-[rgb(var(--primary))]'}`} />
                                  <div className="text-xs font-medium text-slate-500">{hb.frequency} verification</div>
                               </div>
                            </div>
                         </div>
                         <div className="hidden sm:flex flex-col items-end gap-1 px-4">
                            <span className={`label-elite transition-colors ${hb.done ? 'text-emerald-500' : 'text-slate-500'}`}>
                              {hb.done ? 'Verified' : 'Awaiting entry'}
                            </span>
                            <div className={`w-12 h-1 rounded-full ${hb.done ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                               <div className={`h-full transition-all duration-700 ${hb.done ? 'w-full bg-emerald-500' : 'w-0'}`} />
                            </div>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>
            </div>

         </div>
      </main>
    </div>
  );
}
