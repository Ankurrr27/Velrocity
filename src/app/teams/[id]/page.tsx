export const dynamic = 'force-dynamic';

import { fetchTeamById, fetchTeamTasks } from "@/app/actions/teamActions";
import { notFound } from "next/navigation";
import { Medal, CheckCircle2, Circle, Target, Users } from "lucide-react";
import Link from "next/link";

export default async function TeamDashboardPage({ params }: { params: { id: string } }) {
  const team = await fetchTeamById(params.id);
  const tasks = await fetchTeamTasks(params.id);

  if (!team) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6 lg:p-10 page-shell">
      <div className="max-w-6xl mx-auto space-y-8 page-stack">
        
        {/* Banner */}
        <div className="surface-card overflow-hidden relative p-8 pb-12 flex flex-col justify-end bg-gradient-to-tr from-[rgba(var(--primary),0.1)] to-transparent">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[rgb(var(--primary))] opacity-[0.03] blur-3xl rounded-full translate-x-1/2 -translate-y-1/4" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-zinc-950 rounded-full text-xs font-bold text-[rgb(var(--primary))] border border-[rgba(var(--primary),0.2)] mb-4">
              <Users size={14} /> Team Dashboard
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              {team.name}
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl mt-2">
              {team.description || "Building habits together."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Main Content: Tasks / Shared Goals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-[rgb(var(--primary))]" size={20} />
              <h2 className="text-xl font-bold">Project Tasks</h2>
            </div>
            
            {tasks.length === 0 ? (
               <div className="surface-card p-8 text-center text-zinc-500">
                 No active tasks. Start a project to collaborate!
               </div>
            ) : (
               <div className="space-y-3">
                 {tasks.map((task) => (
                   <div key={task._id} className="surface-card p-4 flex items-center justify-between hover:border-[rgba(var(--primary),0.3)] transition-colors cursor-pointer group">
                     <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${task.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-300 dark:border-zinc-700 text-transparent group-hover:border-[rgb(var(--primary))]'}`}>
                          {task.status === 'done' && <CheckCircle2 size={14} strokeWidth={3} />}
                        </div>
                        <div>
                          <p className={`font-semibold ${task.status === 'done' ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-zinc-100'}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-[rgb(var(--primary))] font-medium mt-0.5">
                            {task.projectName}
                          </p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-2">
                       {task.assignedTo.avatar ? (
                         <img src={task.assignedTo.avatar} alt="Assignee" className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900" title={task.assignedTo.name} />
                       ) : (
                         <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold" title={task.assignedTo.name}>
                           {task.assignedTo.name.charAt(0)}
                         </div>
                       )}
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </div>

          {/* Sidebar: Leaderboard */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Medal className="text-orange-500" size={20} />
              <h2 className="text-xl font-bold">Leaderboard</h2>
            </div>
            
            <div className="surface-card overflow-hidden">
               <div className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                 {team.members.map((member: any, index: number) => (
                    <Link href={`/profile/${member.username}`} key={member._id}>
                      <div className="p-4 flex items-center gap-3 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                        <div className={`w-6 text-center font-bold text-sm ${index === 0 ? 'text-orange-500' : index === 1 ? 'text-zinc-400' : index === 2 ? 'text-amber-700' : 'text-zinc-300 dark:text-zinc-700'}`}>
                          #{index + 1}
                        </div>
                        
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-zinc-900 shadow-sm shrink-0">
                          {member.avatar ? (
                             <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                             <div className="w-full h-full bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))] flex items-center justify-center font-bold uppercase text-xs">
                               {member.name.charAt(0)}
                             </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{member.name}</p>
                          <p className="text-xs text-zinc-500 capitalize">{member.role}</p>
                        </div>
                        
                        <div className="text-sm font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full shrink-0">
                          {member.credibilityScore} XP
                        </div>
                      </div>
                    </Link>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
