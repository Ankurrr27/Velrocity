'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  LogOut, 
  Plus, 
  UserRound,
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
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <UserRound size={20} />, label: "Profile", path: "/profile" },
    { icon: <Download size={20} />, label: "Extension", path: "/extension" },
  ];

  const profileImage = userProfile?.avatar || session?.user?.image;

  return (
    <>
      <aside className="
        hidden md:fixed md:top-0 md:left-0 md:flex md:flex-col
        md:h-screen w-[72px] shrink-0 z-50
        bg-white dark:bg-[#111111] border-r border-slate-200/80 dark:border-white/10
        px-3 py-5 backdrop-blur-xl
        transition-colors
      ">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-7 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-sm dark:bg-white dark:text-slate-950"
          aria-label="Velrocity dashboard"
          title="Velrocity"
        >
          V
        </button>

        <nav className="flex flex-1 flex-col gap-2">
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

        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--primary))] text-white shadow-lg shadow-[rgba(var(--primary-rgb),0.2)] hover:-translate-y-0.5 active:scale-95"
            aria-label="Add habit"
            title="Add habit"
          >
            <Plus size={18} strokeWidth={3} />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-500"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <nav className="
        fixed inset-x-0 bottom-0 z-50 md:hidden
        bg-white dark:bg-zinc-950
        border-t border-slate-200/80 dark:border-white/10
        px-2 pb-[env(safe-area-inset-bottom)]
        shadow-[0_-2px_8px_rgba(15,23,42,0.06)] dark:shadow-[0_-2px_8px_rgba(0,0,0,0.2)]
      ">
        <div className="mx-auto flex h-14 max-w-sm items-center justify-around">
          <MobileNavButton icon={<Home size={19} />} active={isActive("/dashboard")} onClick={() => router.push("/dashboard")} label="Home" />
          
          {/* FAB */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--primary))] text-white shadow-sm active:scale-95"
            aria-label="Add habit"
            title="Add habit"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>

          <MobileNavButton icon={<Download size={19} />} active={isActive("/extension")} onClick={() => router.push("/extension")} label="Extension" />

          <button
            onClick={() => router.push("/profile")}
            className={`
              flex h-8 w-8 items-center justify-center overflow-hidden rounded-full transition
              ${isActive("/profile") ? "ring-2 ring-[rgb(var(--primary))] ring-offset-2 ring-offset-white dark:ring-offset-zinc-950" : ""}
            `}
            aria-label="Profile"
            title={userProfile?.name || "Profile"}
          >
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-[10px] font-semibold text-slate-500 dark:bg-zinc-800 dark:text-slate-300">
                {userProfile?.name?.[0] || session?.user?.name?.[0] || <UserRound size={15} />}
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
        group relative flex flex-col items-center justify-center rounded-xl transition-all duration-200 w-10 h-10 mx-auto
        ${active
          ? "bg-[rgba(var(--primary-rgb),0.12)] text-[rgb(var(--primary))]"
          : "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-slate-100"
        }
      `}
      title={label}
    >
      {active && (
        <motion.div 
           layoutId="activeSide" 
           className="absolute left-[-13px] h-5 w-1 rounded-r-full bg-[rgb(var(--primary))] shadow-[0_0_14px_rgba(var(--primary-rgb),0.7)]"
        />
      )}
      <span className={`transition-transform duration-200 group-hover:scale-105 ${active ? "text-[rgb(var(--primary))]" : ""}`}>
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
        flex h-10 min-w-12 flex-col items-center justify-center gap-0.5 px-1 text-[9px] transition
        ${active
          ? "text-[rgb(var(--primary))]"
          : "text-slate-500 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
