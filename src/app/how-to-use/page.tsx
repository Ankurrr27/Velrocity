'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Info, Code2, Globe, ShieldCheck, HelpCircle, 
  Download, CheckCircle2, ArrowRight, Sparkles 
} from "lucide-react";

const SECTIONS = [
  { id: "about", label: "Sector Intelligence" },
  { id: "howto", label: "Operations Manual" },
];

const paradigms = [
  {
    icon: <Code2 size={20} />,
    title: "Apex UI",
    description: "A flush, glassmorphism design language that removes aesthetic friction, keeping visuals pristine.",
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  },
  {
    icon: <Globe size={20} />,
    title: "Matrix Sync",
    description: "Seamlessly connect your Codeforces, GitHub, LeetCode, and custom platforms automatically.",
    color: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Elite Core",
    description: "Built strictly for professionals aiming for absolute consistency and deep collaborative focus.",
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
];

const steps = [
  {
    id: 1,
    icon: <Download size={18} />,
    title: "Initialize Extension",
    description: "Interlink the browser extension. Inject your external profiles to establish the synchronization pipeline.",
  },
  {
    id: 2,
    icon: <CheckCircle2 size={18} />,
    title: "Log Core Rituals",
    description: "Navigate to the Primary Dashboard. Define habits to generate daily objectives. Metrics update in real-time.",
  },
  {
    id: 3,
    icon: <Sparkles size={18} />,
    title: "Monitor Flux",
    description: "Utilize the Density Heatmap and Velocity Chart to visualize your consistency frequency across the horizon.",
  },
  {
    id: 4,
    icon: <Globe size={18} />,
    title: "Synchronize Socials",
    description: "Execute Search protocols to locate other users. Monitor public streaks and credibility indices.",
  },
];

export default function HowToUsePage() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div className="flex flex-col w-full h-full lg:overflow-hidden bg-transparent">
      
      {/* TACTICAL NAVIGATION */}
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

      {/* INTELLIGENCE CONTENT */}
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
                     <span className="label-elite text-[rgb(var(--primary))]">Operational Protocol</span>
                     <h2 className="text-3xl italic">Engineered for <span className="text-[rgb(var(--primary))]">Zero Friction.</span></h2>
                  </div>
                  <p className="max-w-2xl">
                    A high-performance workspace designed to sync your focus, align your habits, and amplify your collective momentum in the global matrix.
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
                      <h3 className="text-lg font-bold uppercase tracking-tight italic text-zinc-900 dark:text-zinc-50">{item.title}</h3>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-500 italic">{item.description}</p>
                    </motion.div>
                  ))}
                </div>

                <footer className="pt-10 border-t border-zinc-100 dark:border-white/5 opacity-50">
                  <span className="label-elite uppercase text-zinc-400">
                    Velrocity Tactical Unit · Build 2.4.0 · Apex Edition
                  </span>
                </footer>
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
                    <span className="label-elite uppercase text-[rgb(var(--primary))]">System Manual</span>
                  </div>
                  <h1 className="text-4xl font-bold uppercase tracking-tighter italic">Sector Onboarding</h1>
                  <p className="text-lg font-bold leading-relaxed text-zinc-500 dark:text-zinc-400 italic">
                    Follow the tactical sequence to initialize your workspace and start tracking with maximum precision.
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
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primary))] mt-0.5" />
                        <div className="relative z-10">{step.icon}</div>
                      </div>
                      <div className="flex-1 py-1 space-y-1 group-hover:translate-x-1 transition-transform">
                        <div className="label-elite uppercase text-[rgb(var(--primary))]">Sequence 0{step.id}</div>
                        <h3 className="text-xl font-bold uppercase tracking-tight italic text-zinc-900 dark:text-zinc-50">{step.title}</h3>
                        <p className="text-sm font-bold leading-relaxed text-zinc-500 dark:text-zinc-400 italic">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="surface-card p-8 border-emerald-500/20 bg-emerald-500/5 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold uppercase tracking-tight italic text-emerald-600 dark:text-emerald-400">Sector Integrity Confirmed</p>
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest opacity-60">You are operational. Deploy to dashboard now.</p>
                  </div>
                  <ArrowRight size={20} className="text-emerald-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
