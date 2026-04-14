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
      
      {/* LEFT: Weekly Breakdown Aside - Deep Zinc */}
      <aside className="w-full lg:w-[320px] lg:shrink-0 border-r border-white/5 flex flex-col bg-zinc-950 lg:h-full">
         <div className="p-8 border-b border-white/5">
            <div className="flex flex-col gap-8 mb-10">
               <div className="space-y-1">
                  <span className="label-elite text-[10px] text-zinc-500 tracking-[0.3em] uppercase opacity-80">Chronological Axis</span>
                  <h1 className="text-2xl font-bold uppercase tracking-tighter italic text-white flex items-center gap-2">
                    Weekly Loop
                  </h1>
               </div>

               <div className="flex items-center justify-between p-1 bg-zinc-900/50 rounded-2xl border border-white/5">
                  <button onClick={() => setWeekAnchor(addDays(weekAnchor, -7))} className="p-2.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setWeekAnchor(new Date())} className="px-4 label-elite uppercase text-zinc-500 hover:text-[rgb(var(--primary))] transition-all">Current</button>
                  <button onClick={() => setWeekAnchor(addDays(weekAnchor, 7))} className="p-2.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all">
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
                     className={`w-full group relative flex items-center gap-5 p-4 rounded-[1.5rem] transition-all duration-500 border-2 ${
                       isSelected 
                         ? 'bg-[rgba(var(--primary),0.08)] border-[rgba(var(--primary),0.25)] shadow-[0_0_30px_rgba(var(--primary),0.05)]' 
                         : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'
                     }`}
                   >
                     {isSelected && (
                       <motion.div 
                          layoutId="calendarActiveInd" 
                          className="absolute left-[-2px] top-4 bottom-4 w-1.5 bg-[rgb(var(--primary))] rounded-r-full shadow-[0_0_15px_rgba(var(--primary),0.8)]" 
                       />
                     )}
                     <div className="w-12 text-center">
                        <div className={`label-elite uppercase mb-1 ${isSelected ? 'text-[rgb(var(--primary))] opacity-100' : 'text-zinc-500 opacity-60'}`}>
                          {date.toLocaleDateString(undefined, { weekday: "short" })}
                        </div>
                        <div className={`text-2xl font-bold italic tracking-tighter leading-none ${isSelected ? 'text-white' : 'text-zinc-600'}`}>
                          {date.getDate()}
                        </div>
                     </div>
                     <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center pr-1">
                           <span className={`label-elite uppercase ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                             {count.completed}/{count.total} Unit
                           </span>
                           {isToday && (
                             <div className="relative">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                               <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[3px] animate-ping" />
                             </div>
                           )}
                        </div>
                        <div className="h-1 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className={`h-full ${isSelected ? 'bg-[rgb(var(--primary))] shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]' : 'bg-zinc-700'}`} />
                        </div>
                     </div>
                   </button>
                 );
               })}
            </div>
         </div>
      </aside>

      {/* MAIN: Details & Documentation - Subtle Gradient */}
      <main className="flex-1 w-full lg:h-full lg:overflow-y-auto bg-zinc-900 lg:bg-transparent page-shell relative overflow-hidden">
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgb(var(--primary))] opacity-5 blur-[150px] pointer-events-none" />
         
         <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-12 relative z-10">
            
            <header className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[rgb(var(--primary))] opacity-50" />
                  <span className="label-elite text-xs text-[rgb(var(--primary))] tracking-[0.4em] uppercase font-bold italic">Observation Phase</span>
               </div>
               <h2 className="text-5xl font-bold uppercase tracking-tighter italic text-white">
                 {selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
               </h2>
               <div className="flex items-center gap-2 label-elite uppercase text-zinc-500 italic max-w-lg leading-relaxed">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Temporal sector synchronized with global objective registry.
               </div>
            </header>

            {/* Daily Note Card - Elite Surface */}
            <div className="surface-card p-8 sm:p-10 space-y-8 glass border-white/5 shadow-2xl">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="p-4 bg-[rgb(var(--primary))] rounded-2xl text-white shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] border border-white/20">
                        <NotebookPen size={22} />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight italic text-white leading-tight">Mission Intelligence</h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.22em] mt-1 opacity-80">Private operational metadata</p>
                     </div>
                  </div>
                  <button 
                    onClick={handleSaveNote}
                    disabled={noteStatus === "saving"}
                    className="btn-primary min-w-[160px] relative overflow-hidden group"
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
                    className="w-full h-48 bg-zinc-950/40 border border-white/5 rounded-[2rem] p-8 text-base font-semibold text-zinc-300 placeholder:text-zinc-600 focus:bg-zinc-950 focus:border-[rgba(var(--primary),0.3)] transition-all outline-none resize-none custom-scrollbar italic tracking-tight leading-relaxed shadow-inner"
                  />
                  <div className="absolute top-4 right-4 label-elite uppercase text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">Encrypted</div>
               </div>
            </div>

            {/* Objectives List */}
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-[rgb(var(--primary))] rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                    <h3 className="text-xl font-bold uppercase tracking-[0.2em] italic text-zinc-200">Active Objectives</h3>
                 </div>
                 <div className="text-[9px] font-bold uppercase text-zinc-500 tracking-[0.3em] opacity-40">Section 04</div>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      Array(3).fill(0).map((_, i) => <div key={i} className="h-24 rounded-[2.2rem] bg-zinc-900 border border-white/5 animate-pulse" />)
                    ) : habits.length === 0 ? (
                      <div className="py-16 text-center border border-dashed border-white/10 rounded-[3rem] bg-zinc-950/20">
                         <p className="text-zinc-500 font-bold uppercase text-xs tracking-[0.3em] italic opacity-60">No objectives detected for this temporal coordinate.</p>
                      </div>
                    ) : habits.map((hb, i) => (
                      <motion.div
                        key={hb.habitId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`group flex items-center justify-between p-6 pl-8 rounded-[2.2rem] border transition-all duration-500 ${
                          hb.done 
                            ? 'bg-emerald-500/5 border-emerald-500/10' 
                            : 'bg-zinc-950/40 border-white/5 hover:border-white/10 hover:bg-zinc-950/60'
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
                               <div className={`text-[17px] font-bold uppercase tracking-tight transition-all duration-500 ${hb.done ? 'text-zinc-500 line-through opacity-70' : 'text-zinc-100 group-hover:text-white'}`}>{hb.title}</div>
                               <div className="flex items-center gap-2 mt-1">
                                  <div className={`w-1 h-1 rounded-full ${hb.done ? 'bg-emerald-500' : 'bg-[rgb(var(--primary))]'}`} />
                                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] italic opacity-80">{hb.frequency} Verification</div>
                               </div>
                            </div>
                         </div>
                         <div className="hidden sm:flex flex-col items-end gap-1 px-4">
                            <span className={`label-elite uppercase italic transition-colors ${hb.done ? 'text-emerald-500' : 'text-zinc-700'}`}>
                              {hb.done ? 'Unit Verified' : 'Awaiting Entry'}
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
