'use client';

import Link from "next/link";
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
      className="space-y-5"
    >

      <div>
        <motion.h1
          variants={rise}
          className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-zinc-950 dark:text-white sm:text-5xl md:text-6xl">
          Build better habits.
        </motion.h1>
      </div>

      <motion.p
        variants={rise}
        className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base"
      >
        Track daily habits, manage tasks, and see your progress in one place.
      </motion.p>

      <motion.div variants={rise} className="flex flex-wrap gap-2.5">
        <Link
          href="/register"
          className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          Create account
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-white"
        >
          Sign in
        </Link>
      </motion.div>
    </motion.div>
  );
}