'use client';

import { Flame, Sparkles } from "lucide-react";
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
      className="group border-y border-slate-200 bg-white px-5 py-4 transition-all duration-200 hover:border-[rgba(var(--primary-rgb),0.35)] dark:border-white/5 dark:bg-white/[0.03] md:rounded-2xl md:border-x"
    >
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="h-11 w-11 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/10 dark:bg-white/5">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-400">
                {user.username?.[0] || user.name?.[0]}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm dark:border-[#0b0f19]" />
        </div>

        {/* Identity & Small Data */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                {user.name}
              </h3>
              <p className="truncate text-xs font-medium text-slate-400">
                @{user.username || "anonymous"}
              </p>
            </div>
            
            <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 dark:border-white/5 sm:flex">
              <div className="flex items-center gap-1.5">
                <Flame size={10} className="text-orange-500" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span className="text-slate-950 dark:text-slate-200">{(user.currentStreak || user.streak || 0)}</span>d
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles size={10} className="text-[rgb(var(--primary))]" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span className="text-slate-950 dark:text-slate-200">{user.credibilityScore || 0}</span> XP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="shrink-0">
          <button
            onClick={() => onToggleFollow(user.id)}
            className={`h-9 rounded-xl px-5 text-xs font-semibold transition-all ${
              user.isFollowing
                ? "border border-slate-200 bg-slate-100 text-slate-500 dark:border-white/5 dark:bg-white/5 dark:text-slate-400"
                : "bg-slate-950 text-white shadow-lg shadow-black/10 dark:bg-white dark:text-slate-950"
            }`}
          >
            {user.isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
