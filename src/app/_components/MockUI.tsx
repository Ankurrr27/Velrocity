'use client';

import { useState } from "react";
import PhoneMockup from "./PhoneMockup";
import {
  CheckCircle2, Clock, LayoutGrid, User,
  Bell, BarChart3, Code2, Trophy, Play, Sparkles,
} from "lucide-react";

type Habit = {
  id: number;
  title: string;
  category: string;
  done: boolean;
};

const HABITS: Habit[] = [
  { id: 1, title: "Solve 2 LeetCode",      category: "Code",   done: true  },
  { id: 2, title: "Morning HIIT",           category: "Health", done: true  },
  { id: 3, title: "Deep Work: Project V",   category: "Work",   done: false },
  { id: 4, title: "10m Deep Breathing",     category: "Health", done: false },
];

const PLATFORMS = [
  { name: "LeetCode",    sub: "Knight · #12.4k",       val: "72.4%", Icon: Trophy   },
  { name: "GitHub",      sub: "Elite Contributor",      val: "45/wk", Icon: Code2    },
  { name: "Global Rank", sub: "Top 0.2%",               val: "P42",   Icon: Sparkles },
];

export default function MockUI() {
  const [activeTab, setActiveTab] = useState<"habits" | "platforms">("habits");
  const [habits, setHabits] = useState(HABITS);

  const toggle = (id: number) =>
    setHabits(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h));

  const completed  = habits.filter(h => h.done).length;
  const percentage = Math.round((completed / habits.length) * 100);

  return (
    <PhoneMockup>
      <div className="flex flex-col h-full bg-[#060606] text-white antialiased select-none overflow-hidden pb-[4px]">

        {/* ── HEADER ───────────────────────────────────── */}
        <div className="px-5 pt-6 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* wordmark matches Navbar */}
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white">Velrocity</span>
            <span className="text-[9px] font-black text-orange-500">/</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">OS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Bell size={11} className="text-zinc-500" />
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-orange-500 rounded-full" />
            </div>
            <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/8 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
            </div>
          </div>
        </div>

        {/* ── STATS ROW ────────────────────────────────── */}
        <div className="px-5 py-3 flex divide-x divide-white/[0.06]">
          {[
            { val: `${percentage}%`, label: "Rate",  accent: false },
            { val: "12",            label: "Streak", accent: true  },
            { val: "4.5h",          label: "Deep",   accent: false },
          ].map(({ val, label, accent }) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-0.5">
              <p className={`text-lg font-black leading-none ${accent ? "text-orange-500" : "text-white"}`}>
                {val}
              </p>
              <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-zinc-600">{label}</p>
            </div>
          ))}
        </div>

        {/* ── TAB SWITCHER ─────────────────────────────── */}
        <div className="px-5 pb-3">
          <div className="flex border border-white/[0.07] rounded-lg overflow-hidden">
            {(["habits", "platforms"] as const).map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 py-1.5 text-[8px] font-black uppercase tracking-[0.2em]
                  transition-colors duration-150
                  ${i === 0 ? "border-r border-white/[0.07]" : ""}
                  ${activeTab === tab
                    ? "bg-orange-500 text-black"
                    : "text-zinc-500 hover:text-zinc-300 bg-transparent"}
                `}
              >
                {tab === "habits" ? "Focus" : "Matrix"}
              </button>
            ))}
          </div>
        </div>

        {/* ── SCROLLABLE BODY ──────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 space-y-5">

          {activeTab === "habits" ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500">Today's objectives</p>
                <p className="text-[8px] font-black text-orange-500 whitespace-nowrap">{completed} / {habits.length}</p>
              </div>

              {habits.map(habit => (
                <div
                  key={habit.id}
                  onClick={() => toggle(habit.id)}
                  className="group flex items-center justify-between py-2.5
                             border-b border-white/[0.04] last:border-0 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* square checkbox — no rounded circle, feels sharper */}
                    <div className={`
                      w-[14px] h-[14px] rounded-[3px] border flex items-center justify-center
                      transition-colors duration-150 shrink-0
                      ${habit.done
                        ? "bg-orange-500 border-orange-500"
                        : "border-zinc-700 bg-transparent"}
                    `}>
                      {habit.done && <CheckCircle2 size={9} strokeWidth={3} className="text-black" />}
                    </div>
                    <span className={`text-[11px] font-medium leading-none transition-colors ${
                      habit.done ? "text-zinc-600 line-through decoration-zinc-700" : "text-zinc-200"
                    }`}>
                      {habit.title}
                    </span>
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wider
                                   text-zinc-700 group-hover:text-zinc-500 transition-colors">
                    {habit.category}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-0">
              <div className="pb-2 border-b border-white/[0.06]">
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500">Linked platforms</p>
              </div>
              {PLATFORMS.map(({ name, sub, val, Icon }) => (
                <div key={name}
                     className="group flex items-center justify-between py-3
                                border-b border-white/[0.04] last:border-0 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="
                      w-7 h-7 rounded-md
                      border border-white/[0.07] group-hover:border-orange-500/40
                      bg-zinc-900 group-hover:bg-orange-500/10
                      flex items-center justify-center
                      text-zinc-500 group-hover:text-orange-400
                      transition-all duration-150
                    ">
                      <Icon size={10} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-tight text-zinc-200
                                   group-hover:text-white transition-colors">
                        {name}
                      </p>
                      <p className="text-[7px] font-bold uppercase tracking-wider text-zinc-600">{sub}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-black text-zinc-400">{val}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── FOCUS SESSION CARD ───────────────────────── */}
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* outlined play circle — matches hero's outlined headline */}
              <div className="w-7 h-7 rounded-full border border-orange-500/60 flex items-center justify-center">
                <Play size={9} className="text-orange-400 ml-0.5" fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-tight text-white">Engine Active</p>
                <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-orange-500/70">Deep Focus</p>
              </div>
            </div>
            <span className="font-mono text-[10px] font-black text-zinc-300
                             px-2 py-1 rounded border border-white/[0.06] bg-black/40">
              01:22:45
            </span>
          </div>

        </div>

        {/* ── BOTTOM NAV ───────────────────────────────── */}
        <div className="px-7 pt-3 pb-5 border-t border-white/[0.06] flex items-center justify-between shrink-0 bg-[#060606] relative z-20">
          {[
            { Icon: LayoutGrid, active: activeTab === "habits" },
            { Icon: BarChart3,  active: false },
          ].map(({ Icon, active }, i) => (
            <div key={i} className={active ? "text-orange-500" : "text-zinc-600 hover:text-zinc-400"}>
              <Icon size={14} />
            </div>
          ))}

          {/* FAB — ghost outlined, matches CTA button style */}
          <button className="
            w-9 h-9 -mt-8 rounded-full
            border border-orange-500/70 hover:border-orange-500
            text-orange-400 hover:text-black hover:bg-orange-500
            flex items-center justify-center
            transition-colors duration-150
            shadow-[0_0_20px_-4px_rgba(249,115,22,0.35)]
          ">
            <span className="text-lg font-black leading-none">+</span>
          </button>

          {[
            { Icon: Clock, active: false },
            { Icon: User,  active: false },
          ].map(({ Icon, active }, i) => (
            <div key={i} className={active ? "text-orange-500" : "text-zinc-600 hover:text-zinc-400"}>
              <Icon size={14} />
            </div>
          ))}
        </div>

      </div>
    </PhoneMockup>
  );
}