'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Target, Zap, Clock, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { createHabit } from '@/app/actions/habitActions';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddHabitModal({ isOpen, onClose, onSuccess }: AddHabitModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('habit');
  const [frequency, setFrequency] = useState('daily');
  const [days, setDays] = useState<string[]>([]);
  const [intervalDays, setIntervalDays] = useState(1);
  const [rule, setRule] = useState('manual');
  const [source, setSource] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleDay = (day: string) => {
    setDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError(null);
    setLoading(true);
    try {
      const result = await createHabit({
        title,
        type,
        frequency,
        days: frequency === 'weekly' ? days : [],
        intervalDays: frequency === 'interval' ? intervalDays : undefined,
        verificationRule: rule,
        platformSource: rule === 'platform' ? source : undefined,
      });

      if (result.success) {
        setSuccess(true);
        if (onSuccess) onSuccess();
        setTimeout(() => {
          setSuccess(false);
          setTitle('');
          setFrequency('daily');
          setDays([]);
          onClose();
        }, 1500);
      } else {
        setError(result.error || 'Initialization failed. Verify sector parameters.');
      }
    } catch (err) {
      setError('System Error: Communications pipeline compromised.');
    } finally {
      setLoading(false);
    }
  };

  const dayOptions = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-[3rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-white/5"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-zinc-100 dark:border-white/5">
              <div className="space-y-0.5">
                <div className="label-elite uppercase text-[rgb(var(--primary))] opacity-70">New Goal</div>
                <h2 className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white italic">SET UP HABIT</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-all outline-none"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {success ? (
              <div className="px-8 py-16 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-[rgba(var(--primary-rgb),0.1)] text-[rgb(var(--primary))] flex items-center justify-center mb-2 shadow-xl shadow-[rgba(var(--primary-rgb),0.05)]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tighter italic">Goal Created</h3>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Your tracking engine is now active.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-8 py-7 space-y-7">
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1">What is the goal?</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400/60 group-focus-within:text-[rgb(var(--primary))] transition-colors">
                      <Target size={14} />
                    </div>
                    <input
                      autoFocus
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title of your habit..."
                      className={`w-full bg-zinc-50 dark:bg-zinc-900/60 border ${error ? 'border-rose-500' : 'border-zinc-200 dark:border-white/10'} rounded-xl pl-12 pr-4 py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400/50 focus:border-[rgb(var(--primary))] outline-none transition-all shadow-sm`}
                    />
                  </div>
                </div>

                {/* Grid Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1">Goal Type</label>
                    <div className="relative">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full h-10 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-xl px-4 text-[12px] font-bold text-zinc-700 dark:text-zinc-300 appearance-none cursor-pointer focus:border-[rgb(var(--primary))] outline-none transition-all shadow-sm"
                      >
                        <option value="habit">Elite habit</option>
                        <option value="hobby">Hobby Flow</option>
                      </select>
                      <Plus size={10} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 rotate-45" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1">Frequency</label>
                    <div className="flex h-10 w-full bg-zinc-100/50 dark:bg-zinc-900/80 p-1 rounded-xl border border-zinc-200 dark:border-white/10">
                      {['daily', 'weekly', 'interval'].map(f => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFrequency(f)}
                          className={`flex-1 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${
                            frequency === f 
                              ? 'bg-white dark:bg-zinc-100 text-zinc-900 dark:text-black shadow-sm' 
                              : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Conditional Fields (Compressed) */}
                <AnimatePresence mode="wait">
                  {frequency !== 'daily' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {frequency === 'weekly' ? (
                        <div className="flex flex-wrap gap-1.5 justify-center py-1">
                          {dayOptions.map(d => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => toggleDay(d)}
                              className={`w-9 h-9 rounded-lg transition-all border font-bold text-[10px] uppercase ${
                                days.includes(d) 
                                  ? 'bg-[rgb(var(--primary))] border-[rgb(var(--primary))] text-white shadow-lg shadow-[rgba(var(--primary-rgb),0.2)]' 
                                  : 'bg-zinc-100/50 dark:bg-zinc-900/40 border-zinc-200 dark:border-white/5 text-zinc-400 hover:border-zinc-300'
                              }`}
                            >
                              {d[0]}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10">
                           <Clock size={16} className="text-[rgb(var(--primary))] ml-1" />
                           <input 
                             type="range" min="1" max="30" value={intervalDays} 
                             onChange={(e) => setIntervalDays(parseInt(e.target.value))}
                             className="flex-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[rgb(var(--primary))]" 
                           />
                           <div className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 min-w-[70px] text-right">EVERY {intervalDays}d</div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1">Tracking Mode</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <select
                        value={rule}
                        onChange={(e) => setRule(e.target.value)}
                        className="w-full h-10 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-xl px-4 text-[12px] font-bold text-zinc-700 dark:text-zinc-300 appearance-none cursor-pointer focus:border-[rgb(var(--primary))] outline-none transition-all shadow-sm"
                      >
                        <option value="manual">Manual</option>
                        <option value="platform">Platform</option>
                        <option value="github">GitHub</option>
                        <option value="link">Proof URL</option>
                      </select>
                      <CheckCircle2 size={12} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" />
                    </div>

                    {rule === 'platform' && (
                      <div className="relative">
                        <select
                          value={source}
                          onChange={(e) => setSource(e.target.value)}
                          className="w-full h-10 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-xl px-4 text-[12px] font-bold text-zinc-700 dark:text-zinc-300 appearance-none cursor-pointer focus:border-[rgb(var(--primary))] outline-none transition-all shadow-sm"
                        >
                          <option value="">Stream...</option>
                          <option value="github">GitHub</option>
                          <option value="leetcode">LeetCode</option>
                        </select>
                        <Zap size={10} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !title.trim()}
                    className="w-full py-3.5 rounded-xl bg-zinc-950 dark:bg-[rgb(var(--primary))] text-white label-elite uppercase shadow-lg hover:shadow-[rgba(var(--primary),0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-30"
                  >
                    {loading ? 'Starting...' : 'Start Tracking'}
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="px-8 py-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between opacity-60">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary))] animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Live Secure</span>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
