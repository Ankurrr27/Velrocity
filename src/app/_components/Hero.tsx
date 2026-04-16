'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 md:space-y-8"
    >

      {/* 🔥 TAGS (UPGRADED) */}
      <div className="flex flex-wrap gap-2">
        {["LeetCode", "GitHub", "Habits"].map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full text-[10px] md:text-xs 
            bg-white/10 backdrop-blur border border-white/10 
            text-zinc-400 hover:text-white hover:border-white/20 transition"
          >
            {t}
          </span>
        ))}
      </div>

      {/* 🔥 HEADLINE (RESPONSIVE + TIGHT) */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
        Stop guessing your progress.
        <br />
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">
          Track it. Improve it.
        </span>
      </h1>

      {/* 🔥 SUBTEXT (SHORTER + CLEAN) */}
      <p className="text-sm md:text-base text-zinc-500 max-w-md">
        Track coding platforms, habits, and consistency —
        all in one place, automatically.
      </p>

      {/* 🔥 CTA (COMPACT + STRONG) */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/register"
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold 
          text-white bg-gradient-to-r from-blue-500 to-purple-500 
          shadow-lg shadow-blue-500/30 
          hover:scale-105 active:scale-[0.98] transition"
        >
          Start tracking
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/login"
          className="px-6 py-3 rounded-full text-sm 
          border border-white/10 text-zinc-400 
          hover:text-white hover:bg-white/5 transition"
        >
          Log in
        </Link>
      </div>

      {/* 🔥 STATS (COMPACT GRID) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
        {[
          { val: "Auto-track", sub: "No effort" },
          { val: "Insights", sub: "Real data" },
          { val: "Consistency", sub: "Built-in" }
        ].map((s) => (
          <div
            key={s.val}
            className="p-4 rounded-xl bg-white/5 backdrop-blur 
            border border-white/10 hover:border-white/20 
            transition hover:scale-[1.03]"
          >
            <div className="text-sm font-bold">{s.val}</div>
            <div className="text-[10px] text-zinc-500">{s.sub}</div>
          </div>
        ))}
      </div>

    </motion.div>
  );
}