'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { fetchUserProfile } from "@/app/actions/habitActions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [accentColor, setAccentColor] = useState('indigo');
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/";

  useEffect(() => {
    if (isAuthPage) return;
    
    async function syncTheme() {
      try {
        const profile = await fetchUserProfile();
        if (profile?.accentColor) {
           setAccentColor(profile.accentColor);
        }
      } catch (error) {
        console.error("Theme sync failed:", error);
      }
    }
    
    syncTheme();
  }, [pathname, isAuthPage]);

  if (isAuthPage) {
    return (
      <div className={`theme-${accentColor} relative flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative flex h-full min-h-screen w-full overflow-hidden bg-transparent text-zinc-900 dark:text-zinc-50 transition-colors theme-${accentColor}`}>
      {/* Sidebar always mounts — the desktop rail shows on md+, the mobile bottom nav shows below md */}
      <Sidebar />
      
      <div className="flex min-w-0 flex-1 flex-col md:ml-[72px]">
        <Navbar />
        {/* pb-20 ensures content isn't hidden behind the mobile bottom nav */}
        <main className="no-scrollbar flex h-full min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden border-l border-white/10 pb-20 md:pb-0 dark:border-white/5">
          <div className="flex h-full min-h-0 w-full flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
