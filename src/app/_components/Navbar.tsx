'use client';

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] h-16 border-b border-zinc-200 bg-white/90 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111111]/90">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/" className="text-sm font-semibold text-zinc-900 transition-colors hover:text-orange-600 dark:text-white dark:hover:text-orange-400">
          Velrocity
        </Link>

        <div className="flex items-center gap-2 text-xs sm:gap-4 sm:text-sm">
          <Link href="#features" className="hidden text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white sm:block">
            Features
          </Link>
          <Link href="/login" className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white">
            Sign in
          </Link>
          <Link href="/register" className="rounded-lg bg-orange-500 px-3 py-2 font-semibold text-white transition-colors hover:bg-orange-400 sm:px-4">
            Create account
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-orange-400"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </nav>
  );
}