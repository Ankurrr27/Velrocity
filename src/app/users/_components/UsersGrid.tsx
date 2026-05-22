'use client';

import { AnimatePresence } from "framer-motion";
import { Users as UsersIcon } from "lucide-react";
import UserDiscoveryCard from "./UserDiscoveryCard";
import type { CommunityUser } from "./types";

interface UsersGridProps {
  loading: boolean;
  users: CommunityUser[];
  onToggleFollow: (id: string) => void;
}

export default function UsersGrid({
  loading,
  users,
  onToggleFollow,
}: UsersGridProps) {
  return (
    <div className="flex flex-col gap-3 px-0 pb-20 md:px-8">
      <div className="mb-2 flex items-center justify-between px-4 md:px-1">
         <span className="label-elite text-slate-400">Listed users</span>
         <span className="label-elite text-slate-400">{users.length} users</span>
      </div>
      <AnimatePresence mode="popLayout">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded-2xl border border-slate-200/70 bg-white dark:border-white/5 dark:bg-white/5"
            />
          ))
        ) : users.length === 0 ? (
          <div className="space-y-4 rounded-2xl border border-dashed border-slate-200 px-6 py-20 text-center dark:border-white/10">
            <UsersIcon size={44} className="mx-auto text-slate-300 dark:text-slate-700" />
            <p className="label-elite justify-center text-slate-400">
              No users found matching your search.
            </p>
          </div>
        ) : (
          users.map((user) => (
            <UserDiscoveryCard
              key={user.id}
              user={user}
              onToggleFollow={onToggleFollow}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
