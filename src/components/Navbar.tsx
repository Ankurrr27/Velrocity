'use client';

import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

function getPageMeta(pathname: string) {
  if (pathname.startsWith("/dashboard")) return { title: "Dashboard" };
  if (pathname.startsWith("/teams"))     return { title: "Teams" };
  if (pathname.startsWith("/users"))     return { title: "Discovery" };
  if (pathname.startsWith("/profile"))   return { title: "Profile" };
  if (pathname.startsWith("/calendar"))  return { title: "Calendar" };
  if (pathname.startsWith("/extension")) return { title: "Extension" };
  return { title: "Velrocity" };
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const pageMeta = getPageMeta(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center justify-between border-b border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 px-6 transition-colors">
      {/* Page title */}
      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
        {pageMeta.title}
      </span>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Sync indicator */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Synced</span>
        </div>

        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700" />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 dark:text-zinc-500 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}
