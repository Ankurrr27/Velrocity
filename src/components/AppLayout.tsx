'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { fetchUserProfile } from "@/app/actions/habitActions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [accentColor, setAccentColor] = useState("indigo");
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/";

  useEffect(() => {
    if (isAuthPage) return;

    async function syncTheme() {
      try {
        const profile = await fetchUserProfile();
        if (profile?.accentColor) setAccentColor(profile.accentColor);
      } catch (error) {
        console.error("Theme sync failed:", error);
      }
    }

    syncTheme();
  }, [pathname, isAuthPage]);

  if (isAuthPage) {
    return (
      <div className={`theme-${accentColor} relative flex min-h-screen w-full flex-col text-zinc-950 transition-colors dark:text-zinc-50`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`theme-${accentColor} relative flex h-full min-h-screen w-full overflow-hidden text-zinc-950 transition-colors dark:text-zinc-50`}>
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col md:ml-[72px]">
        <Navbar />
        <main className="no-scrollbar flex h-full min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden border-l border-slate-200/70 pb-20 dark:border-white/5 md:pb-0">
          <div className="flex h-full min-h-0 w-full flex-col">{children}</div>
        </main>
      </div>
    </div>
  );
}
