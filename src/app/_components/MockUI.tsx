'use client';

import { useState } from "react";
import PhoneMockup from "./PhoneMockup";

type Habit = {
  id: number;
  title: string;
  done: boolean;
};

export default function MockUI() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, title: "LeetCode", done: true },
    { id: 2, title: "Gym", done: true },
    { id: 3, title: "Reading", done: false },
  ]);

  const toggleHabit = (id: number) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === id ? { ...h, done: !h.done } : h
      )
    );
  };

  const completed = habits.filter(h => h.done).length;
  const percentage = Math.round((completed / habits.length) * 100);

  return (
    <PhoneMockup>
      <div className="bg-zinc-950 text-white min-h-full">

        {/* 🔥 HEADER (UPGRADED) */}
        <div className="px-4 pt-4 pb-3 border-b border-white/5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* LOGO */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md shadow-blue-500/30">
              <span className="text-white font-bold text-sm">V</span>
            </div>

            {/* NAME */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-wide text-white">
                Velrocity
              </span>
              <span className="text-[10px] text-zinc-500">
                Track your momentum
              </span>
            </div>

          </div>

          {/* PROFILE */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-md" />
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-5">

          {/* TODAY BLOCK */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Today</h2>
              <p className="text-xs text-zinc-400">
                {completed} of {habits.length} completed
              </p>
            </div>

            {/* 🔥 CIRCULAR PROGRESS */}
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-400">
              {percentage}%
            </div>
          </div>

          {/* HABITS */}
          <div className="space-y-3">
            {habits.map(habit => (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  habit.done
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-white/5 border border-white/5"
                } hover:scale-[1.03] active:scale-[0.98]`}
              >
                <div className="flex items-center gap-3">

                  {/* STATUS DOT */}
                  <div className={`w-3 h-3 rounded-full ${
                    habit.done ? "bg-emerald-400" : "bg-zinc-500"
                  }`} />

                  <span className="font-medium">{habit.title}</span>
                </div>

                <span className={`text-xs font-bold tracking-wide ${
                  habit.done ? "text-emerald-400" : "text-zinc-400"
                }`}>
                  {habit.done ? "DONE" : "PENDING"}
                </span>
              </div>
            ))}
          </div>

          {/* 🔥 PROGRESS BAR (UPGRADED) */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Consistency</span>
              <span>{percentage}%</span>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </PhoneMockup>
  );
}