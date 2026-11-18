'use client';

import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/teams")) return "Teams";
  if (pathname.startsWith("/users")) return "People";
  if (pathname.startsWith("/profile")) return "Profile";
  if (pathname.startsWith("/calendar")) return "Calendar";
  if (pathname.startsWith("/extension")) return "Extension";
  return "Velrocity";
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/82 px-4 backdrop-blur-xl transition-colors dark:border-white/5 dark:bg-[#111111]/82 sm:px-6">
      <div className="min-w-0">
        <h1 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-[rgb(var(--primary))] dark:hover:bg-white/[0.06]"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
