import { fetchUserByUsername } from "@/app/actions/userActions";
import { notFound } from "next/navigation";
import { Flame, Star, GitBranch, Code, ExternalLink } from "lucide-react";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await fetchUserByUsername(username);

  if (!user) {
    notFound();
  }

  const platforms = [];
  if (user.externalProfiles) {
    if (user.externalProfiles.github) platforms.push({ name: 'GitHub', icon: GitBranch, value: user.externalProfiles.github });
    if (user.externalProfiles.leetcode) platforms.push({ name: 'LeetCode', icon: Code, value: user.externalProfiles.leetcode });
    if (user.externalProfiles.codeforces) platforms.push({ name: 'CodeForces', icon: ExternalLink, value: user.externalProfiles.codeforces });
  }

  return (
    <main className="min-h-screen pb-16">
      {/* Immersive Cover */}
      <div className="h-64 lg:h-80 w-full bg-[rgb(var(--primary))] bg-gradient-to-tr from-[rgba(var(--primary),0.8)] to-[rgba(var(--primary),0.3)] relative overflow-hidden">
         <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="relative -mt-24 sm:-mt-32 flex flex-col sm:flex-row items-center sm:items-end gap-6 pb-6">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-[2rem] border-[6px] border-white dark:border-zinc-950 overflow-hidden bg-white dark:bg-zinc-900 shadow-xl shrink-0">
            {user.avatar ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))] flex items-center justify-center text-5xl font-bold uppercase">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center sm:text-left space-y-1 mt-4 sm:mt-0">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              {user.name}
            </h1>
            <p className="text-lg font-medium text-[rgb(var(--primary))]">
              @{user.username}
            </p>
          </div>
          
          <div className="flex gap-3">
             <button className="btn-primary px-8">Follow</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
          <div className="space-y-6 lg:col-span-1">
            <div className="surface-card p-6 space-y-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                {user.bio || user.tagline || 'No bio provided yet.'}
              </p>
              
              <div className="flex items-center gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col items-center flex-1">
                  <span className="font-bold text-xl">{user.followersCount}</span>
                  <span className="text-xs uppercase tracking-wider text-zinc-500">Followers</span>
                </div>
                <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex flex-col items-center flex-1">
                  <span className="font-bold text-xl">{user.followingCount}</span>
                  <span className="text-xs uppercase tracking-wider text-zinc-500">Following</span>
                </div>
              </div>
            </div>

            <div className="surface-card p-6">
              <h3 className="font-bold text-lg mb-4">Linked Accounts</h3>
              {platforms.length > 0 ? (
                <div className="space-y-3">
                  {platforms.map((p, i) => (
                    <a key={i} href="#" className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <p.icon size={18} className="text-zinc-500" />
                        <span className="font-medium text-sm">{p.name}</span>
                      </div>
                      <ExternalLink size={14} className="text-zinc-400" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">No platforms linked.</p>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="surface-card p-6 flex flex-col items-center text-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <Flame size={28} />
                </div>
                <span className="text-3xl font-extrabold">{user.streak}</span>
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Active Streak</span>
              </div>
              <div className="surface-card p-6 flex flex-col items-center text-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Star size={28} />
                </div>
                <span className="text-3xl font-extrabold">{user.credibilityScore}</span>
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Credibility XP</span>
              </div>
            </div>
            
            <div className="surface-card p-6 flex flex-col items-center justify-center py-20 text-center">
               <h3 className="text-xl font-bold text-zinc-400 dark:text-zinc-600">Habit History Hidden</h3>
               <p className="text-sm mt-2 text-zinc-500 max-w-sm mx-auto">
                 User has chosen to keep their detailed daily habits private.
               </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
