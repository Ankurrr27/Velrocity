'use client';

import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-zinc-900 dark:text-zinc-50 font-sans selection:bg-[rgb(var(--primary))] selection:text-white flex-1">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5 h-12">
        <div className="mx-auto max-w-7xl px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex flex-col -space-y-0.5">
              <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[rgb(var(--primary))]">Velrocity</span>
              <span className="text-[9px] font-medium text-zinc-400">Build steady momentum</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/login" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all">Log in</Link>
            <Link href="/register" className="bg-[rgb(var(--primary))] text-white px-5 py-1.5 rounded-full text-xs font-bold hover:opacity-90 shadow-lg shadow-[rgba(var(--primary-rgb),0.3)] transition-all active:scale-[0.98]">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-24 pb-20 mx-auto max-w-6xl px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          
          {/* LEFT: CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-500 bg-white dark:bg-zinc-900/60">
               <span className="label-elite uppercase">⚡ Daily Habit System</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05]">
              Build habits that <br />
              <span className="text-[rgb(var(--primary))]">actually</span> <br />
              <span className="text-[rgb(var(--primary))]">stick.</span>
            </h1>

            <p className="max-w-xl text-xl font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
              One dashboard for daily habits, weekly missions, auto-tracked coding platforms, and progress you can actually see. Clear from day one.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link href="/register" className="bg-[rgb(var(--primary))] text-white px-10 py-5 rounded-full text-md font-bold hover:opacity-90 shadow-2xl shadow-[rgba(var(--primary-rgb),0.3)] transition-all flex items-center gap-3 group">
                Get started
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="px-10 py-5 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-300 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                Log in
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-16">
               {[
                 { val: "1 dashboard", sub: "Daily Clarity" },
                 { val: "6 months", sub: "Habit Density" },
                 { val: "5 platforms", sub: "Auto-Tracked" }
               ].map(s => (
                 <div key={s.val} className="surface-card p-8 rounded-[2.5rem] shadow-sm">
                    <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{s.val}</div>
                    <div className="label-elite uppercase text-zinc-400 mt-1.5">{s.sub}</div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* RIGHT: MOCK UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 lg:pl-10"
          >
            <div className="surface-card rounded-[3rem] p-10 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.08)] dark:shadow-[0_60px_120px_-30px_rgba(var(--primary-rgb),0.05)] relative overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                  <div>
                    <span className="label-elite uppercase text-zinc-400">Today</span>
                    <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">4 of 5 done</h2>
                  </div>
                  <div className="w-20 h-20 rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl font-bold border border-emerald-100 dark:border-emerald-500/20">
                    80%
                  </div>
               </div>

               <div className="space-y-4">
                  <LandingHabitRow title="Morning workout" meta="Daily habit" status="DONE" color="emerald" />
                  <LandingHabitRow title="LeetCode daily" meta="Auto-tracked · Codeforces" status="DONE" color="emerald" />
                  <LandingHabitRow title="Read 30 pages" meta="Daily habit" status="PENDING" color="zinc" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="surface-card p-8 rounded-[2.5rem] shadow-sm space-y-3">
                  <Flame className="text-orange-500" size={32} />
                  <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">14</div>
                  <div className="label-elite uppercase text-zinc-400">Day Streak</div>
               </div>
               <div className="surface-card p-8 rounded-[2.5rem] shadow-sm space-y-3">
                  <Layers className="text-[rgb(var(--primary))]" size={32} />
                  <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">92%</div>
                  <div className="label-elite uppercase text-zinc-400">Weekly Rate</div>
               </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* GRADIENT BLOBS */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[rgba(var(--primary-rgb),0.08)] rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none" />
    </div>
  );
}

function LandingHabitRow({ title, meta, status, color }: any) {
  const isDone = status === "DONE";
  return (
    <div className={`p-4 rounded-2xl flex items-center justify-between border transition-all ${
      isDone ? 'bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20' : 'bg-zinc-50 dark:bg-white/5 border-zinc-100 dark:border-white/10'
    }`}>
      <div>
        <div className={`text-md font-bold ${isDone ? 'text-emerald-900 dark:text-emerald-400' : 'text-zinc-900 dark:text-zinc-100'}`}>{title}</div>
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">{meta}</div>
      </div>
      <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] ${
        isDone ? 'bg-emerald-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
      }`}>
        {status}
      </div>
    </div>
  );
}
