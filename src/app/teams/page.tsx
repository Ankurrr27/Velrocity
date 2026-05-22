export const dynamic = 'force-dynamic';

import { fetchUserTeams } from "@/app/actions/teamActions";
import Link from "next/link";
import { Users, Plus, Shield } from "lucide-react";

export default async function TeamsListPage() {
  const teams = await fetchUserTeams();

  return (
    <main className="page-shell min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="page-stack mx-auto max-w-6xl">
        
        <header className="flex flex-col justify-between gap-5 border-b border-slate-200/70 pb-6 dark:border-white/5 sm:flex-row sm:items-end">
          <div className="space-y-1">
            <span className="section-kicker">Network</span>
            <h1 className="text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Teams
            </h1>
            <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
              Collaborate on shared goals and compete on the global leaderboards.
            </p>
          </div>
          
          <button className="btn-primary group h-12 px-8">
            <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
            <span>Forge Team</span>
          </button>
        </header>

        {teams.length === 0 ? (
          <div className="surface-card flex flex-col items-center p-12 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-white/5">
              <Users size={32} />
            </div>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">No active teams</h2>
            <p className="mt-3 max-w-sm text-sm text-slate-500">
              You haven't joined any teams yet. Create one to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team) => (
              <Link key={team._id} href={`/teams/${team._id}`}>
                <div className="surface-card group flex h-full cursor-pointer flex-col p-6 hover:border-[rgb(var(--primary))]">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-xl font-semibold text-white shadow-sm dark:bg-white dark:text-slate-950">
                      {team.name.charAt(0).toUpperCase()}
                    </div>
                    {team.isPrivate && (
                      <div className="stat-pill border-zinc-200 dark:border-white/10">
                        <Shield size={14} className="text-zinc-400" />
                        <span className="label-elite uppercase ml-1">Secure</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="truncate text-lg font-semibold leading-tight text-slate-950 transition-colors group-hover:text-[rgb(var(--primary))] dark:text-white">
                    {team.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 min-h-[44px] text-sm text-slate-500 dark:text-slate-400">
                    {team.description || 'No operational briefing provided.'}
                  </p>
                  
                  <div className="mt-6 flex items-center justify-between border-t border-slate-200/70 pt-5 dark:border-white/5">
                    <div className="label-elite flex items-center gap-2 text-[rgb(var(--primary))]">
                      <Users size={14} />
                      {team.memberCount} members
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-all group-hover:bg-[rgb(var(--primary))] group-hover:text-white dark:bg-white/5">
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
