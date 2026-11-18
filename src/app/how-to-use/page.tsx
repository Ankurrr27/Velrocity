'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  CalendarDays, CheckCircle2, HelpCircle, Plus, Sparkles, TrendingUp
} from "lucide-react";

const SECTIONS = [
  { id: "about", label: "Overview" },
  { id: "howto", label: "How to use" },
];

const paradigms = [
  {
    icon: <CheckCircle2 size={20} />,
    title: "Habits",
    description: "Create routines and track your daily completions.",
    color: "bg-indigo-50 text-indigo-600 dark:bg-[rgb(var(--primary-soft))] dark:text-[rgb(var(--primary))]",
  },
  {
    icon: <CalendarDays size={20} />,
    title: "Tasks",
    description: "Keep one-time tasks alongside your habits.",
    color: "bg-sky-50 text-sky-600 dark:bg-[rgb(var(--primary-soft))] dark:text-[rgb(var(--primary))]",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Progress",
    description: "Review your activity and streaks over time.",
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
];

const steps = [
  {
    id: 1,
    icon: <Plus size={18} />,
    title: "Add a habit",
    description: "Use the plus button to create a habit and choose how often you want to do it.",
  },
  {
    id: 2,
    icon: <CheckCircle2 size={18} />,
    title: "Track your day",
    description: "Open the dashboard and mark habits complete as you do them.",
  },
  {
    id: 3,
    icon: <Sparkles size={18} />,
    title: "Manage tasks",
    description: "Add tasks from the dashboard and mark them complete when finished.",
  },
  {
    id: 4,
    icon: <TrendingUp size={18} />,
    title: "Review progress",
    description: "Use the calendar and progress charts to look back on your activity.",
  },
];

export default function HowToUsePage() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div className="flex flex-col w-full h-full lg:overflow-hidden bg-transparent">
      
      <div className="flex border-b border-zinc-100 dark:border-white/5 bg-transparent shrink-0">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-1 flex flex-col items-center py-4 transition-all relative overflow-hidden group
              ${activeSection === s.id ? "" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/40"}
            `}
          >
            <span className={`label-elite transition-all ${
              activeSection === s.id ? "text-[rgb(var(--primary))]" : "text-zinc-400"
            }`}>
              {s.label}
            </span>
            {activeSection === s.id && (
              <motion.div layoutId="tabLineDoc" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--primary))] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto page-shell bg-transparent">
        <div className="max-w-4xl mx-auto p-4 lg:p-10">
          <AnimatePresence mode="wait">
            {activeSection === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-12"
              >
                <header className="space-y-6">
                  <div className="flex flex-col gap-1">
                     <h2 className="text-3xl font-semibold">A simple way to track your progress</h2>
                  </div>
                  <p className="max-w-2xl">
                    Track habits, tasks, and daily notes in one place.
                  </p>
                </header>

                <div className="grid gap-6 md:grid-cols-3">
                  {paradigms.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="surface-card p-8 group hover:border-[rgb(var(--primary))] transition-all cursor-default"
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${item.color} border-current border-opacity-10`}>
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-500">{item.description}</p>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            )}

            {activeSection === "howto" && (
              <motion.div
                key="howto"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-3xl space-y-12"
              >
                <header className="space-y-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={14} className="text-[rgb(var(--primary))]" />
                    <span className="label-elite uppercase text-[rgb(var(--primary))]">Quick guide</span>
                  </div>
                  <h1 className="text-3xl font-semibold">Getting started</h1>
                  <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
                    Four steps to get started.
                  </p>
                </header>

                <div className="relative space-y-4 pt-4">
                  {/* DEPTH LINE */}
                  <div className="absolute left-8 top-12 bottom-12 w-[2px] bg-[rgba(var(--primary),0.1)] z-0" />

                  {steps.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative z-10 flex gap-8 items-start group"
                    >
                      <div className="w-16 h-16 shrink-0 rounded-[1.5rem] bg-zinc-950 text-white flex items-center justify-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[rgb(var(--primary))] mt-0.5" />
                        <div className="relative z-10">{step.icon}</div>
                      </div>
                      <div className="flex-1 py-1 space-y-1 group-hover:translate-x-1 transition-transform">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
