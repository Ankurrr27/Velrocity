'use client';

import { CalendarDays, CheckSquare, Flame, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Habits",
    description: "Set routines and mark them complete each day.",
    icon: Flame,
  },
  {
    title: "Tasks",
    description: "Keep one-time tasks alongside your habits.",
    icon: CheckSquare,
  },
  {
    title: "Calendar",
    description: "Review daily activity and write private notes.",
    icon: CalendarDays,
  },
  {
    title: "Progress",
    description: "See your streaks and activity over time.",
    icon: TrendingUp,
  }
];

export default function Features() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-6xl py-12 sm:py-16">
      <div className="mb-5 sm:mb-7">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-white sm:text-2xl">Everything in one place</h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="rounded-xl border border-zinc-200 bg-white p-3.5 sm:p-4 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 sm:mb-3 sm:h-9 sm:w-9">
              <feature.icon size={18} />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 sm:text-base">{feature.title}</h3>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
