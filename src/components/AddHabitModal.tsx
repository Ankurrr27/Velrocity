'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Target, Zap, Clock, CheckCircle2 } from 'lucide-react';
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
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/55"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative max-h-[88dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900 sm:rounded-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/70 bg-white px-4 py-3 dark:border-white/5 dark:bg-zinc-900 sm:px-5">
              <div>
                <h2 className="text-base font-semibold text-slate-950 dark:text-white">New habit</h2>
              </div>
              <button 
                onClick={onClose} 
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white"
                aria-label="Close habit modal"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {success ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(var(--primary-rgb),0.1)] text-[rgb(var(--primary))]">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-base font-semibold text-slate-950 dark:text-white">Habit created</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 px-4 py-4 sm:px-5">
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Habit name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400/60 group-focus-within:text-[rgb(var(--primary))] transition-colors">
                      <Target size={14} />
                    </div>
                    <input
                      autoFocus
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Read for 20 minutes"
                      className={`input-shell pl-11 ${error ? 'border-rose-500' : ''}`}
                    />
                  </div>
                  {error && <p className="text-sm text-rose-500">{error}</p>}
                </div>

                {/* Grid Fields */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
                    <div className="relative">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="input-shell h-10 cursor-pointer appearance-none px-4 py-0 text-sm"
                      >
                        <option value="habit">Habit</option>
                        <option value="hobby">Hobby</option>
                      </select>
                      <Plus size={10} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 rotate-45" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Frequency</label>
                    <div className="segmented-control flex h-10 w-full">
                      {['daily', 'weekly', 'interval'].map(f => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFrequency(f)}
                          className={`segmented-tab flex-1 ${
                            frequency === f 
                              ? 'segmented-tab-active' 
                              : ''
                          }`}
                        >
                          {f === 'interval' ? 'Custom' : f[0].toUpperCase() + f.slice(1)}
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
                                  : 'bg-slate-100/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/5 text-slate-500 hover:border-blue-300 dark:hover:border-[rgba(var(--primary-rgb),0.4)]'
                              }`}
                            >
                              {d[0]}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tracking</label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="relative">
                      <select
                        value={rule}
                        onChange={(e) => setRule(e.target.value)}
                        className="input-shell h-10 cursor-pointer appearance-none px-4 py-0 text-sm"
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
                          className="input-shell h-10 cursor-pointer appearance-none px-4 py-0 text-sm"
                        >
                          <option value="">Choose platform</option>
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
                    className="btn-primary h-10 w-full disabled:opacity-30"
                  >
                    {loading ? 'Saving...' : 'Save habit'}
                  </button>
                </div>
              </form>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
