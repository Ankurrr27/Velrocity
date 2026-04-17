'use client';

import { motion } from "framer-motion";

export default function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 32, rotateX: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex justify-center items-center"
      style={{ perspective: "1200px" }}
    >

      {/* ── AMBIENT GLOW STACK ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* outer halo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[420px] h-[540px] rounded-full
                        bg-[radial-gradient(ellipse,rgba(139,92,246,0.18),transparent_65%)]
                        blur-[80px]" />
        {/* tight inner accent */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[220px] h-[360px] rounded-full
                        bg-[radial-gradient(ellipse,rgba(99,102,241,0.22),transparent_60%)]
                        blur-[40px]" />
      </div>

      {/* ── PHONE SHELL ────────────────────────────────────── */}
      <div className="relative w-[270px] sm:w-[290px] h-[560px] sm:h-[590px]">

        {/* Left: mute toggle + volume buttons */}
        <div className="absolute -left-[3px] top-[100px] w-[3px] h-[28px] rounded-l-full
                        bg-gradient-to-b from-zinc-600 to-zinc-700 shadow-[-1px_0_2px_rgba(0,0,0,0.6)]" />
        <div className="absolute -left-[3px] top-[148px] w-[3px] h-[52px] rounded-l-full
                        bg-gradient-to-b from-zinc-600 to-zinc-700 shadow-[-1px_0_2px_rgba(0,0,0,0.6)]" />
        <div className="absolute -left-[3px] top-[214px] w-[3px] h-[52px] rounded-l-full
                        bg-gradient-to-b from-zinc-600 to-zinc-700 shadow-[-1px_0_2px_rgba(0,0,0,0.6)]" />

        {/* Right: power / side button */}
        <div className="absolute -right-[3px] top-[168px] w-[3px] h-[72px] rounded-r-full
                        bg-gradient-to-b from-zinc-500 to-zinc-700 shadow-[1px_0_2px_rgba(0,0,0,0.6)]" />

        {/* Phone body */}
        <div className="
          relative w-full h-full rounded-[3rem]
          bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950
          shadow-[
            0_0_0_0.5px_rgba(255,255,255,0.08),
            0_50px_120px_-20px_rgba(0,0,0,0.95),
            0_20px_40px_-10px_rgba(0,0,0,0.6),
            inset_0_1px_0_rgba(255,255,255,0.12),
            inset_0_-1px_0_rgba(0,0,0,0.8)
          ]
          p-[7px]
        ">

          {/* Subtle brushed-metal rim highlight */}
          <div className="absolute inset-[1px] rounded-[2.85rem] pointer-events-none
                          bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />

          {/* ── SCREEN ───────────────────────────────────────── */}
          <div className="
            relative w-full h-full rounded-[2.5rem] overflow-hidden
            bg-[#080808]
            shadow-[inset_0_0_24px_rgba(0,0,0,0.9)]
          ">

            {/* Screen edge inner glow */}
            <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-20
                            shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.06)]" />

            {/* Dynamic Island */}
            <motion.div
              initial={{ scaleX: 1.15, opacity: 0.6 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute top-[14px] left-1/2 -translate-x-1/2 z-30
                         w-[90px] h-[28px] rounded-full bg-black
                         shadow-[0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.04)]
                         flex items-center justify-center gap-[10px] overflow-hidden"
            >
              {/* camera dot */}
              <div className="w-[8px] h-[8px] rounded-full
                              bg-radial bg-[radial-gradient(circle_at_35%_35%,#1a1a2e,#000)]
                              ring-[0.5px] ring-inset ring-white/10
                              shadow-[0_0_4px_rgba(99,102,241,0.3)]" />
              {/* face ID bar */}
              <div className="w-[20px] h-[3px] rounded-full bg-zinc-800" />
            </motion.div>

            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-14 flex items-end justify-between
                            px-7 pb-[6px] text-[9px] font-semibold tracking-wide text-zinc-300 z-20">
              <span>9:41</span>
              <div className="flex items-center gap-[5px]">
                {/* signal bars */}
                <div className="flex items-end gap-[2px] h-[8px]">
                  {[40, 60, 80, 100].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%`, opacity: i < 3 ? 1 : 0.35 }}
                      className="w-[2.5px] rounded-[1px] bg-zinc-300"
                    />
                  ))}
                </div>
                <span>5G</span>
                {/* battery */}
                <div className="relative flex items-center">
                  <div className="w-[17px] h-[9px] rounded-[2px] border border-zinc-500 relative overflow-hidden">
                    <div className="absolute inset-[1px] right-[3px] rounded-[1px] bg-emerald-400" />
                  </div>
                  <div className="absolute -right-[3px] w-[2px] h-[4px] bg-zinc-500 rounded-r-[1px]" />
                </div>
              </div>
            </div>

            {/* Scrollable children area */}
            <div className="
              absolute inset-0
              pt-14 pb-2
              overflow-y-auto overflow-x-hidden
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            ">
              <div className="min-h-full">{children}</div>
            </div>

            {/* Screen glare — top-left specular */}
            <div className="
              absolute inset-0 pointer-events-none z-10 rounded-[2.5rem]
              bg-gradient-to-br from-white/[0.045] via-transparent to-transparent
            " />

            {/* Bottom home indicator */}
            <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 z-30
                            w-[100px] h-[4px] rounded-full bg-white/20
                            shadow-[0_0_8px_rgba(255,255,255,0.08)]" />

          </div>
          {/* /SCREEN */}

        </div>
        {/* /PHONE BODY */}
      </div>
      {/* /PHONE SHELL */}

      {/* Ground shadow */}
      <div className="
        absolute -bottom-8 left-1/2 -translate-x-1/2
        w-[160px] h-[24px] rounded-full
        bg-black/50 blur-2xl -z-10
      " />

    </motion.div>
  );
}