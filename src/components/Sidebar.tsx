'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  LogOut, 
  Plus, 
  Search, 
  Download,
  UserRound,
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
      <aside className="
        hidden md:fixed md:top-0 md:left-0 md:flex md:flex-col
        md:h-screen w-[72px] shrink-0 z-50
        bg-white/86 dark:bg-[#070b14]/92 border-r border-slate-200/80 dark:border-white/5
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
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--primary))] text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 active:scale-95"
            aria-label="Add habit"
            title="Add habit"
          >
            <Plus size={18} strokeWidth={3} />
          </button>

          <button
            onClick={() => router.push("/profile")}
            className={`
              flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl transition mx-auto border
              ${isActive("/profile")
                ? "border-[rgb(var(--primary))] ring-4 ring-[rgba(var(--primary-rgb),0.12)]"
                : "border-slate-200 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-400/30"
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
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-[10px] font-bold uppercase text-slate-600 dark:bg-slate-900 dark:text-slate-200">
                {userProfile?.name?.[0] || session?.user?.name?.[0] || 'ID'}
              </div>
            )}
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
        bg-white/88 dark:bg-[#070b14]/94 backdrop-blur-2xl
        border-t border-slate-200/80 dark:border-white/10
        px-4 pt-1 pb-1 sm:pb-2
        shadow-[0_-12px_32px_rgba(15,23,42,0.08)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.4)]
      ">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <MobileNavButton icon={<Home size={20} />} active={isActive("/dashboard")} onClick={() => router.push("/dashboard")} label="Home" />
          <MobileNavButton icon={<Search size={20} />} active={isActive("/users")} onClick={() => router.push("/users")} label="Search" />
          
          {/* FAB */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="-translate-y-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-white bg-[rgb(var(--primary))] text-white shadow-xl shadow-blue-500/25 hover:-translate-y-3.5 active:scale-95 dark:border-[#070b14]"
            aria-label="Add habit"
          >
            <Plus size={20} strokeWidth={3} />
          </button>

          <MobileNavButton icon={<Download size={20} />} active={isActive("/extension")} onClick={() => router.push("/extension")} label="Extension" />

          {/* Profile */}
            <button
            onClick={() => router.push("/profile")}
            className={`
              flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl transition border
              ${isActive("/profile")
                ? "border-[rgb(var(--primary))] ring-2 ring-[rgba(var(--primary-rgb),0.18)]"
                : "border-slate-300 dark:border-white/10 hover:border-blue-300"
              }
            `}
            aria-label="Profile"
          >
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-300">
                <UserRound size={15} />
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
        flex h-10 w-10 items-center justify-center rounded-xl transition
        ${active
          ? "bg-[rgba(var(--primary-rgb),0.12)] text-[rgb(var(--primary))]"
          : "text-slate-500 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
        }
      `}
    >
      {icon}
    </button>
  );
}
