'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-xl bg-white/60 dark:bg-zinc-950/60 border-b border-zinc-200/50 dark:border-white/5">
      
      <div className="mx-auto max-w-7xl px-10 h-full flex items-center justify-between">

        {/* 🔥 BRAND */}
        <div className="flex items-center gap-3">

          {/* LOGO ICON */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-lg">V</span>
          </div>

          {/* NAME */}
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-wide text-zinc-900 dark:text-white">
              Velrocity
            </span>
            <span className="text-xs text-zinc-400">
              Build momentum
            </span>
          </div>

        </div>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-500">
          <Link href="#" className="hover:text-zinc-900 dark:hover:text-white transition">
            Features
          </Link>
          <Link href="#" className="hover:text-zinc-900 dark:hover:text-white transition">
            How it works
          </Link>
          <Link href="#" className="hover:text-zinc-900 dark:hover:text-white transition">
            Preview
          </Link>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-5">
          <Link href="/login" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            Log in
          </Link>

          <Link
            href="/register"
            className="px-7 py-2.5 rounded-full text-sm font-semibold text-white bg-[rgb(var(--primary))] shadow-xl shadow-[rgba(var(--primary-rgb),0.4)] hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}