'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-14 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-6 h-full flex items-center justify-between">

        {/* BRAND */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* wordmark-style logo: orange slash accent */}
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white">
            Velrocity
          </span>
          <span className="text-[11px] font-black text-orange-500 select-none">/</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            OS
          </span>
        </Link>

        {/* LINKS — center */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.18em]">
          {[
            { label: "Features",  href: "#features"    },
            { label: "Utility",   href: "#how-it-works"},
            { label: "Matrix",    href: "#preview"     },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-zinc-500 hover:text-white transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.18em]
                       text-zinc-500 hover:text-white transition-colors duration-150"
          >
            Log in
          </Link>

          {/* pill CTA — thin border, no fill, inverts on hover */}
          <Link
            href="/register"
            className="
              group relative overflow-hidden
              px-5 py-2 rounded-full
              border border-orange-500/60 hover:border-orange-500
              text-[9px] font-black uppercase tracking-[0.2em]
              text-orange-400 hover:text-black
              transition-colors duration-200
            "
          >
            {/* fill slides in from left on hover */}
            <span className="
              absolute inset-0
              bg-orange-500
              -translate-x-full group-hover:translate-x-0
              transition-transform duration-200 ease-out
            " />
            <span className="relative">Join Elite</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}