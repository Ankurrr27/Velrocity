'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const rise = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-7"
    >

      {/* BADGE */}
      <motion.div variants={rise} className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 px-3 py-1.5
                         border border-indigo-500/30 rounded-full
                         text-[9px] font-bold uppercase tracking-[0.22em] text-indigo-400">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Professional Choice
        </span>
      </motion.div>

      {/* HEADLINE */}
      <div className="space-y-2">

        <motion.h1
          variants={rise}
          className="text-[clamp(3rem,8vw,5.2rem)]
                     font-black leading-[0.9] tracking-[-0.03em] text-white">
          Architecting
        </motion.h1>

        <motion.h1
          variants={rise}
          className="text-[clamp(3rem,8vw,5.2rem)]
                     font-black leading-[0.9] tracking-[-0.03em]
                     bg-gradient-to-r from-indigo-400 to-blue-500
                     bg-clip-text text-transparent">
          Consistency.
        </motion.h1>

      </div>

      {/* BODY */}
      <motion.p
        variants={rise}
        className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-[420px]"
      >
        Track your development, sync across platforms, and build
        unstoppable consistency with a precision-focused productivity OS.
      </motion.p>

      {/* CTA */}
      <motion.div variants={rise} className="flex gap-3 flex-wrap">

        <Link
          href="/register"
          className="group inline-flex items-center gap-2
                     px-7 py-3
                     bg-indigo-500 hover:bg-indigo-400
                     text-white text-[11px] font-black uppercase tracking-[0.18em]
                     rounded-lg transition shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
        >
          Get Started
          <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
        </Link>

        <Link
          href="/login"
          className="inline-flex items-center gap-2
                     px-7 py-3
                     border border-white/10 hover:border-white/20
                     text-zinc-400 hover:text-white text-[11px]
                     font-bold uppercase tracking-[0.18em]
                     rounded-lg transition"
        >
          View Docs
        </Link>

      </motion.div>

      {/* STATS */}
      <motion.div
        variants={rise}
        className="pt-6 flex gap-8 text-sm"
      >
        <div>
          <p className="text-zinc-500 text-[10px] uppercase">Uptime</p>
          <p className="text-white font-bold">99.9%</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] uppercase">Integrations</p>
          <p className="text-white font-bold">42+</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] uppercase">Rank</p>
          <p className="text-white font-bold">Tier 1</p>
        </div>
      </motion.div>

    </motion.div>
  );
}