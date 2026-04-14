export const dynamic = 'force-dynamic';

import { fetchUserTeams } from "@/app/actions/teamActions";
import Link from "next/link";
import { Users, Plus, Shield } from "lucide-react";

export default async function TeamsListPage() {
  const teams = await fetchUserTeams();

  return (
    <main className="min-h-screen p-6 lg:p-10 page-shell">
      <div className="max-w-6xl mx-auto space-y-8 page-stack">
        
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/5">
          <div className="space-y-1">
            <span className="section-kicker">Network</span>
            <h1 className="text-4xl font-bold uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Operational Teams
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium max-w-xl">
              Collaborate on shared goals and compete on the global leaderboards.
            </p>
          </div>
          
          <button className="btn-primary group h-12 px-8">
            <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
            <span>Forge Team</span>
          </button>
        </header>

        {teams.length === 0 ? (
          <div className="surface-card p-16 text-center flex flex-col items-center group">
            <div className="w-20 h-20 rounded-[28px] bg-zinc-100 dark:bg-zinc-900 text-zinc-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Users size={32} />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter">No Active Cells</h2>
            <p className="text-zinc-500 max-w-sm mt-3 text-sm font-medium">
              You haven't joined any operational teams yet. Initiate a new cell to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team) => (
              <Link key={team._id} href={`/teams/${team._id}`}>
                <div className="surface-card group p-8 flex flex-col h-full cursor-pointer hover:border-[rgb(var(--primary))]">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-2xl shadow-xl">
                      {team.name.charAt(0).toUpperCase()}
                    </div>
                    {team.isPrivate && (
                      <div className="stat-pill border-zinc-200 dark:border-white/10">
                        <Shield size={14} className="text-zinc-400" />
                        <span className="label-elite uppercase ml-1">Secure</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold uppercase tracking-tighter text-zinc-900 dark:text-zinc-50 truncate leading-tight group-hover:text-[rgb(var(--primary))] transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 min-h-[44px]">
                    {team.description || 'No operational briefing provided.'}
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 label-elite uppercase text-[rgb(var(--primary))]">
                      <Users size={14} />
                      {team.memberCount} MBRS
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-[rgb(var(--primary))] group-hover:text-white transition-all">
                       <Plus size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
