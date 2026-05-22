'use client';

import { usePathname } from "next/navigation";
import { Moon, Sun, Wifi } from "lucide-react";
import { useTheme } from "./ThemeProvider";

function getPageMeta(pathname: string) {
  if (pathname.startsWith("/dashboard")) return { title: "Dashboard", eyebrow: "Momentum workspace" };
  if (pathname.startsWith("/teams")) return { title: "Teams", eyebrow: "Shared goals" };
  if (pathname.startsWith("/users")) return { title: "Discovery", eyebrow: "Community signal" };
  if (pathname.startsWith("/profile")) return { title: "Profile", eyebrow: "Identity and settings" };
  if (pathname.startsWith("/calendar")) return { title: "Calendar", eyebrow: "Daily review" };
  if (pathname.startsWith("/extension")) return { title: "Extension", eyebrow: "Browser companion" };
  return { title: "Velrocity", eyebrow: "Focus operating system" };
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const pageMeta = getPageMeta(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/82 px-4 backdrop-blur-xl transition-colors dark:border-white/5 dark:bg-[#0b0f19]/82 sm:px-6">
      <div className="min-w-0">
        <p className="hidden text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400 sm:block">
          {pageMeta.eyebrow}
        </p>
        <h1 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
          {pageMeta.title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:flex">
          <Wifi size={13} className="text-blue-500" />
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Synced</span>
        </div>

        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-blue-200 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
