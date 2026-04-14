'use client';

import { ArrowUpRight, Flame, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { CommunityUser } from "./types";

interface UserDiscoveryCardProps {
  user: CommunityUser;
  onToggleFollow: (id: string) => void;
}

export default function UserDiscoveryCard({
  user,
  onToggleFollow,
}: UserDiscoveryCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="group bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-2xl px-5 py-4 hover:border-[rgb(var(--primary))] transition-all duration-300"
    >
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-zinc-100 dark:bg-white/5 border border-zinc-100 dark:border-white/10 shadow-sm">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm font-bold text-zinc-400">
                {user.username?.[0] || user.name?.[0]}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 shadow-sm" />
        </div>

        {/* Identity & Small Data */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <div className="min-w-0">
              <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white truncate">
                {user.name}
              </h3>
              <p className="text-[10px] font-bold text-zinc-400 truncate tracking-tight">
                @{user.username || "anonymous"}
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-3 border-l border-zinc-100 dark:border-white/5 pl-4">
              <div className="flex items-center gap-1.5">
                <Flame size={10} className="text-orange-500" />
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                  <span className="text-zinc-900 dark:text-zinc-200">{(user.currentStreak || user.streak || 0)}</span>d
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles size={10} className="text-[rgb(var(--primary))]" />
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                  <span className="text-zinc-900 dark:text-zinc-200">{user.credibilityScore || 0}</span> XP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="shrink-0">
          <button
            onClick={() => onToggleFollow(user.id)}
            className={`h-9 px-6 rounded-xl text-[11px] font-extrabold tracking-[0.15em] uppercase transition-all ${
              user.isFollowing
                ? "bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/5"
                : "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-lg shadow-black/10"
            }`}
          >
            {user.isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
