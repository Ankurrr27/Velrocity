'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rise = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-10"
    >

      {/* ── BADGE ─────────────────────────────────────────── */}
      <motion.div variants={rise} className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 px-3 py-1.5
                         border border-orange-500/30 rounded-full
                         text-[9px] font-bold uppercase tracking-[0.22em] text-orange-400">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          The Professional Choice
        </span>
        <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-orange-500/30 to-transparent" />
      </motion.div>

      {/* ── HEADLINE ──────────────────────────────────────── */}
      <div className="space-y-3 overflow-hidden">

        {/* "Architecting" — large serif/display, white */}
        <motion.div variants={rise}>
          <h1 className="
            text-[clamp(3rem,8vw,5.5rem)]
            font-black leading-[0.88] tracking-[-0.03em]
            text-white
          ">
            Architecting
          </h1>
        </motion.div>

        {/* "Consistency." — outlined / stroked word for contrast */}
        <motion.div variants={rise}>
          <h1 className="
            text-[clamp(3rem,8vw,5.5rem)]
            font-black leading-[0.88] tracking-[-0.03em]
            text-transparent
            [-webkit-text-stroke:1.5px_theme(colors.orange.500)]
          ">
            Consistency.
          </h1>
        </motion.div>

      </div>

      {/* ── BODY ──────────────────────────────────────────── */}
      <motion.p
        variants={rise}
        className="text-zinc-400 text-base md:text-lg font-normal leading-[1.75] max-w-[420px]"
      >
        Automate your development metrics, sync with elite platforms,
        and build a legendary habit stack with the world's most precise
        productivity OS.
      </motion.p>

      {/* ── CTA ROW ───────────────────────────────────────── */}
      <motion.div variants={rise} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

        <Link
          href="/register"
          className="
            group relative overflow-hidden
            inline-flex items-center justify-center gap-2.5
            px-8 py-3.5
            bg-orange-500 hover:bg-orange-400
            text-black text-[11px] font-black uppercase tracking-[0.18em]
            rounded-lg transition-colors duration-200
            shadow-[0_0_40px_-8px_rgba(249,115,22,0.5)]
          "
        >
          {/* shimmer on hover */}
          <span className="
            absolute inset-0 -translate-x-full
            bg-gradient-to-r from-transparent via-white/20 to-transparent
            group-hover:translate-x-full transition-transform duration-500
          " />
          Initialize Experience
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/login"
          className="
            inline-flex items-center justify-center gap-2
            px-8 py-3.5
            border border-white/8 hover:border-white/20
            text-zinc-500 hover:text-zinc-200 text-[11px] font-bold uppercase tracking-[0.18em]
            rounded-lg transition-all duration-200
          "
        >
          Documentation
        </Link>

      </motion.div>

      {/* ── STATS ─────────────────────────────────────────── */}
      <motion.div
        variants={rise}
        className="pt-8 border-t border-white/[0.06]
                   grid grid-cols-3 gap-0 divide-x divide-white/[0.06]"
      >
        {[
          { label: "Uptime precision", val: "99.9%", sub: "SLA guaranteed" },
          { label: "Live integrations", val: "42+",  sub: "platforms synced" },
          { label: "Global ranking",   val: "Tier 1", sub: "top performers" },
        ].map((item, i) => (
          <div key={i} className={`space-y-1 ${i === 0 ? "pr-8" : i === 1 ? "px-8" : "pl-8"}`}>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              {item.label}
            </p>
            <p className="text-xl font-black text-white leading-none">
              {item.val}
            </p>
            <p className="text-[10px] text-zinc-600">{item.sub}</p>
          </div>
        ))}
      </motion.div>

    </motion.div>
  );
}