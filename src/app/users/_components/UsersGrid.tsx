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
    <div className="flex flex-col gap-3 px-0 md:px-10 pb-20">
      <div className="flex items-center justify-between mb-4 px-4 md:px-1">
         <span className="label-elite uppercase text-zinc-400">Listed Users</span>
         <span className="label-elite uppercase text-zinc-400">{users.length} Users</span>
      </div>
      <AnimatePresence mode="popLayout">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5"
            />
          ))
        ) : users.length === 0 ? (
          <div className="space-y-4 rounded-3xl border-2 border-dashed border-zinc-100 dark:border-white/5 px-6 py-20 text-center">
            <UsersIcon size={48} className="mx-auto text-zinc-200 dark:text-zinc-800" />
            <p className="label-elite uppercase text-zinc-400">
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
