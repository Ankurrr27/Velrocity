'use client';

import { Users as UsersIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchTopUsers } from "@/app/actions/socialActions";

export default function UsersSidebar() {
  const [topUsers, setTopUsers] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchTopUsers();
      setTopUsers(data);
    };
    init();
  }, []);

  return (
    <aside className="w-full border-t border-zinc-100/80 bg-transparent px-4 py-6 dark:border-white/5 lg:w-[360px] lg:shrink-0 lg:border-l lg:border-t-0 lg:px-8 lg:py-8">
      <div className="space-y-10 lg:sticky lg:top-8">
        <div className="space-y-4">
          <span className="label-elite uppercase text-zinc-400 dark:text-zinc-500">
            Mission Intel
          </span>
          <div className="bg-zinc-50 dark:bg-zinc-900/30 rounded-[2rem] border border-zinc-100 dark:border-white/5 p-6 sm:p-8 space-y-5">
            <div className="text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 italic">
              &ldquo;Collective evolution is the only way to reach peak frequency. Build your sector today.&rdquo;
            </div>
            <div className="label-elite uppercase text-[rgb(var(--primary))] opacity-80">
              Global Matrix
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <span className="label-elite uppercase text-zinc-400 dark:text-zinc-500">
            Consistency Leaderboard
          </span>
          <div className="space-y-4 px-1">
            {topUsers.map((user: any, i: number) => (
              <Link href={`/profile/${user.username}`} key={user._id.toString()} className="flex items-center justify-between border-b border-zinc-50 dark:border-white/5 pb-3 last:border-0 group hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-zinc-300 dark:text-zinc-600 w-4 text-left">
                    {i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold">
                    {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.username[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[120px]">
                    {user.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="text-xs font-bold text-[rgb(var(--primary))]">
                     {user.credibilityScore || 0} XP
                   </div>
                </div>
              </Link>
            ))}
            {topUsers.length === 0 && (
              <div className="text-xs font-medium text-zinc-500 italic py-2">No public users found.</div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
