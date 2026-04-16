'use client';

import { motion } from "framer-motion";

export default function PhoneMockup({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative flex justify-center items-center"
    >
      {/* GLOW BEHIND */}
      <div className="absolute w-[340px] h-[680px] bg-[rgba(var(--primary-rgb),0.2)] blur-[120px] rounded-full" />

      {/* PHONE BODY */}
      <div className="relative w-[300px] h-[620px] rounded-[3.2rem] bg-gradient-to-b from-zinc-800 to-black shadow-[0_60px_150px_-20px_rgba(0,0,0,0.9)] border border-white/10 p-[6px]">

        {/* SIDE BUTTONS */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-16 bg-zinc-700 rounded-full" />
        <div className="absolute -left-[3px] top-44 w-[3px] h-10 bg-zinc-700 rounded-full" />
        <div className="absolute -right-[3px] top-32 w-[3px] h-20 bg-zinc-700 rounded-full" />

        {/* SCREEN */}
        <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden bg-black">

          {/* NOTCH */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-center">
            <div className="w-2 h-2 bg-zinc-700 rounded-full mr-2" />
            <div className="w-10 h-1 bg-zinc-700 rounded-full" />
          </div>

          {/* STATUS BAR FAKE */}
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-5 text-[10px] text-zinc-400 z-10">
            <span>9:41</span>
            <span>⚡︎ ●●●</span>
          </div>

          {/* CONTENT */}
          <div className="w-full h-full overflow-y-auto pt-8">
            {children}
          </div>

          {/* GLASS REFLECTION */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

        </div>
      </div>
    </motion.div>
  );
}