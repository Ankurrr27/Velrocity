'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  LogOut, 
  Plus, 
  Search, 
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import AddHabitModal from "./AddHabitModal";
import { useSession, signOut } from "next-auth/react";
import { logout } from "@/app/actions/authActions";
import { fetchUserProfile } from "@/app/actions/habitActions";

export default function Sidebar() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUserProfile(profile);
      } catch (err) {
        console.error("Sidebar profile fetch error", err);
      }
    };
    if (session) loadProfile();
  }, [session]);

  const handleLogout = async () => {
    // 1. Clear custom JWT token via server action
    await logout();
    // 2. Clear legacy localStorage tokens if any
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.clear(); // Complete wipe for security
    }
    // 3. Clear NextAuth session (Google etc)
    await signOut({ callbackUrl: "/login" });
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/dashboard" },
    { icon: <Search size={20} />, label: "Search", path: "/users" },
    { icon: <Download size={20} />, label: "Extension", path: "/extension" },
  ];

  const profileImage = userProfile?.avatar || session?.user?.image;

  return (
    <>
      {/* DESKTOP SIDEBAR - FLUSH ZINC RAIL */}
      <aside className="
        hidden md:fixed md:top-0 md:left-0 md:flex md:flex-col
        md:h-screen w-[64px] shrink-0 z-50
        bg-zinc-950 border-r border-white/5
        px-2.5 py-6
        transition-colors
      ">
        {/* NAV */}
        <nav className="flex flex-1 flex-col gap-4">
          {navItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              active={isActive(item.path)}
              onClick={() => router.push(item.path)}
            />
          ))}
        </nav>

        {/* BOTTOM ACTIONS */}
        <div className="flex flex-col gap-4 pt-4">
          {/* Add Habit */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--primary))] text-white shadow-xl shadow-[rgba(var(--primary-rgb),0.3)] transition hover:opacity-90 active:scale-95 mx-auto"
            aria-label="Add habit"
          >
            <Plus size={18} strokeWidth={3} />
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => router.push("/profile")}
            className={`
              flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition mx-auto border-2
              ${isActive("/profile")
                ? "border-[rgb(var(--primary))] ring-4 ring-[rgba(var(--primary-rgb),0.1)]"
                : "border-transparent hover:border-white/20"
              }
            `}
            aria-label="Open profile"
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-[10px] font-black uppercase text-zinc-100 italic">
                {userProfile?.name?.[0] || session?.user?.name?.[0] || 'ID'}
              </div>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-zinc-400 transition hover:bg-rose-500/10 hover:text-rose-500 mx-auto"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <nav className="
        fixed inset-x-0 bottom-0 z-50 md:hidden
        bg-white/80 dark:bg-zinc-950/95 backdrop-blur-2xl
        border-t border-zinc-200 dark:border-white/10
        px-4 pt-1 pb-1 sm:pb-2
        shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.4)]
      ">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <MobileNavButton icon={<Home size={20} />} active={isActive("/dashboard")} onClick={() => router.push("/dashboard")} label="Home" />
          <MobileNavButton icon={<Search size={20} />} active={isActive("/users")} onClick={() => router.push("/users")} label="Search" />
          
          {/* FAB */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--primary))] text-white shadow-2xl shadow-[rgba(var(--primary-rgb),0.4)] transition hover:opacity-90 active:scale-90 -translate-y-3 border-[3px] border-white dark:border-zinc-950"
            aria-label="Add habit"
          >
            <Plus size={20} strokeWidth={3} />
          </button>

          <MobileNavButton icon={<Download size={20} />} active={isActive("/extension")} onClick={() => router.push("/extension")} label="Extension" />

          {/* Profile */}
            <button
            onClick={() => router.push("/profile")}
            className={`
              flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition border-2
              ${isActive("/profile")
                ? "border-[rgb(var(--primary))] ring-2 ring-[rgba(var(--primary-rgb),0.2)]"
                : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-500"
              }
            `}
            aria-label="Profile"
          >
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-700 text-[10px] font-bold uppercase text-zinc-100">
                {session?.user?.name?.[0] || session?.user?.email?.[0] || '?'}
              </div>
            )}
          </button>
        </div>
      </nav>

      <AddHabitModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}

function SidebarItem({ icon, label, onClick, active }: { icon: React.ReactNode, label: string, onClick: () => void, active: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-center justify-center rounded-full transition-all duration-300 w-10 h-10 mx-auto
        ${active
          ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
          : "text-zinc-400 hover:bg-zinc-700"
        }
      `}
      title={label}
    >
      {active && (
        <motion.div 
           layoutId="activeSide" 
           className="absolute left-[-12px] h-6 w-1.5 bg-[rgb(var(--primary))] rounded-r-full shadow-[0_0_15px_rgba(var(--primary),0.8)]"
        />
      )}
      <span className={`transition-transform duration-300 group-hover:scale-120 ${active ? "text-[rgb(var(--primary))]" : "text-zinc-200 group-hover:text-white"}`}>
        {icon}
      </span>
    </button>
  );
}

function MobileNavButton({ icon, onClick, active, label }: { icon: React.ReactNode, onClick: () => void, active: boolean, label?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`
        flex h-10 w-10 items-center justify-center rounded-xl transition
        ${active
          ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
          : "text-zinc-500 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white"
        }
      `}
    >
      {icon}
    </button>
  );
}
