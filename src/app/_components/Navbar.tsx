'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-20 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/[0.03]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-full flex items-center justify-between">

        {/* BRAND */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-black uppercase tracking-[0.3em] text-white group-hover:text-indigo-400 transition-colors">
                Velrocity
              </span>
              <div className="px-1.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                <span className="text-[8px] font-black text-indigo-500 uppercase tracking-tighter">v1.2</span>
              </div>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-600">
              Kinetic OS
            </span>
          </div>
        </Link>

        {/* LINKS — center */}
        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.25em]">
          {[
            { label: "Features",  href: "#features"    },
            { label: "Platform",   href: "#how-it-works"},
            { label: "Engine",    href: "#preview"     },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-zinc-500 hover:text-white transition-all duration-300 relative group/link"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover/link:w-full" />
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-8">
          <Link
            href="/login"
            className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em]
                       text-zinc-500 hover:text-white transition-colors duration-200"
          >
            Operator Login
          </Link>

          <Link
            href="/register"
            className="
              group relative overflow-hidden
              px-8 py-3 rounded-xl
              bg-white text-black
              text-[10px] font-black uppercase tracking-[0.2em]
              transition-all duration-300 hover:scale-105 active:scale-95
              shadow-[0_15px_30px_-10px_rgba(255,255,255,0.2)]
            "
          >
            <span className="relative z-10">Initialize</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}