'use client';

import { useState, useEffect, useMemo } from "react";
import { 
  Flame, Star, Users, ExternalLink, 
  Settings as SettingsIcon, Share2, ShieldCheck, Trophy, 
  Target, Calendar, MapPin, Eye, EyeOff, Palette, Quote,
  ArrowRight, Check, Save, Link2, UserRound
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfile } from "@/app/actions/profileActions";

const accentSwatches: Record<string, string> = {
  indigo: "bg-indigo-500",
  sky: "bg-sky-400",
  rose: "bg-rose-400",
  emerald: "bg-emerald-500",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
  violet: "bg-violet-500",
};

const profileFields = [
  { key: "github", label: "GitHub" },
  { key: "leetcode", label: "LeetCode" },
  { key: "codeforces", label: "Codeforces" },
  { key: "codechef", label: "CodeChef" },
  { key: "gfg", label: "GFG" },
  { key: "codolio", label: "Codolio" },
];

interface ProfileViewProps {
  initialProfile: any;
  isOwnProfile: boolean;
}

export default function ProfileView({ initialProfile, isOwnProfile }: ProfileViewProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [activeTab, setActiveTab] = useState("stats");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Edit states
  const [name, setName] = useState(profile.name || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [tagline, setTagline] = useState(profile.tagline || "");
  const [location, setLocation] = useState(profile.location || "");
  const [accentColor, setAccentColor] = useState(profile.accentColor || "indigo");
  const [profilePublic, setProfilePublic] = useState(profile.profilePublic || false);
  const [externalProfiles, setExternalProfiles] = useState(profile.externalProfiles || {});
  const [banner, setBanner] = useState(profile.banner || "");
  const [avatar, setAvatar] = useState(profile.avatar || "");

  const tabs = useMemo(() => {
    const base = [
      { id: "stats", label: "Stats" },
      { id: "links", label: "Links" },
    ];
    if (isOwnProfile) base.push({ id: "settings", label: "Settings" });
    return base;
  }, [isOwnProfile]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    const result = await updateProfile({
      name, bio, tagline, location, accentColor, profilePublic, externalProfiles, banner, avatar
    });
    
    if (result.success) {
      setProfile({ ...profile, ...result.user });
      setMessage("Profile synchronized.");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Sync failed.");
    }
    setSaving(false);
  };

  return (
    <main className={`min-h-screen pb-20 page-shell overflow-x-hidden theme-${accentColor}`}>
      
      {/* ENHANCED COVER SECTION */}
      <div className="relative h-48 lg:h-64 -mx-6 lg:-mx-12 overflow-hidden bg-zinc-100 dark:bg-zinc-950">
         {banner ? (
            <img src={banner} alt="Cover Banner" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity duration-700 hover:scale-105 transition-all" />
         ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[rgba(var(--primary-rgb),0.5)] via-transparent to-transparent opacity-80" />
         )}
         <div className="absolute inset-0 bg-gradient-to-r from-[rgba(var(--primary-rgb),0.2)] to-transparent mix-blend-overlay" />
         <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[rgb(var(--bg-middle))] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 z-10">
        {/* COMPACT HEADER BAR */}
        <div className="relative -mt-20 sm:-mt-32 flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 mb-12">
          {/* Avatar - Elegant Dynamic Ring */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-40 h-40 sm:w-52 sm:h-52 rounded-[2.5rem] p-1.5 bg-gradient-to-br from-[rgba(var(--primary-rgb),1)] via-[rgba(var(--primary-rgb),0.3)] to-transparent shadow-[0_0_60px_-15px_rgba(var(--primary-rgb),0.6)] shrink-0 relative group"
          >
             <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-zinc-950 border-4 border-zinc-950 flex items-center justify-center text-5xl font-black uppercase shadow-inner relative">
                {profile.avatar ? (
                  <img src={profile.avatar} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center text-white italic tracking-tighter">
                    {profile.username[0]}
                  </div>
                )}
                {isOwnProfile && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 cursor-pointer">
                      <UserRound size={32} className="text-white" />
                  </div>
                )}
             </div>
          </motion.div>

          <div className="flex-1 text-center sm:text-left pb-2 space-y-3 sm:space-y-4">
             <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-4">
               <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                 {profile.name}
               </h1>
               <div className="bg-[rgba(var(--primary-rgb),0.1)] text-[rgb(var(--primary))] border border-[rgba(var(--primary-rgb),0.2)] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                 Sector Leader
               </div>
             </div>
             <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-6">
               <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 tracking-tight">@{profile.username}</p>
               <div className="flex items-center gap-6 opacity-60 sm:opacity-100">
                 <div className="flex items-center gap-1.5">
                    <Users size={12} className="text-zinc-400" />
                    <span className="label-elite text-zinc-500">{profile.followersCount} LINKED</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-[rgb(var(--primary))]" />
                    <span className="label-elite text-[rgb(var(--primary))]">{profile.credibilityScore} XP</span>
                 </div>
               </div>
             </div>
          </div>

          <div className="shrink-0 pb-2 flex justify-center w-full sm:w-auto">
             {isOwnProfile ? (
               <button 
                onClick={() => setActiveTab('settings')} 
                className="
                  group h-12 px-10 rounded-full bg-white dark:bg-white text-zinc-900 dark:text-zinc-950 
                  flex items-center gap-3 shadow-2xl shadow-black/20 
                  hover:scale-[1.05] active:scale-[0.95] transition-all duration-500
                "
               >
                 <SettingsIcon size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                 <span className="text-[11px] font-black uppercase tracking-[0.2em]">Settings</span>
               </button>
             ) : (
               <button 
                 onClick={async () => {
                   const { toggleFollow } = await import("@/app/actions/socialActions");
                   const res = await toggleFollow(profile.id);
                   if (res.success) {
                     setProfile((p: any) => ({ ...p, isFollowing: res.isFollowing }));
                   }
                 }}
                 className={`
                   h-11 px-8 rounded-2xl flex items-center gap-2 transition-all
                   ${profile.isFollowing 
                     ? 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-500' 
                     : 'bg-[rgb(var(--primary))] text-white shadow-lg'
                   }
                 `}
               >
                  <Users size={14} />
                  <span className="text-[11px] font-extrabold tracking-[0.15em] uppercase">
                    {profile.isFollowing ? 'Unlink' : 'Connect'}
                  </span>
               </button>
             )}
          </div>
        </div>

        {/* OPERATIONS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-4 mb-10">
           <div className="bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-2xl p-6 flex items-center gap-4 -mx-4 md:mx-0">
              <Quote size={18} className="text-[rgb(var(--primary))] shrink-0" />
              <div>
                 <div className="label-elite uppercase text-zinc-400 mb-1">Personal Directive</div>
                 <div className="text-sm font-bold italic text-zinc-700 dark:text-zinc-200 truncate truncate-2-lines leading-snug">
                   "{profile.tagline || "Mission in progress."}"
                 </div>
              </div>
           </div>
           <div className="md:col-span-2 bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6 -mx-4 md:mx-0">
              <div className="space-y-1">
                 <div className="label-elite uppercase text-zinc-400">Operational Log</div>
                 <p className="text-xs font-medium text-zinc-500 truncate max-w-[400px]">{profile.bio || "No historical logs captured."}</p>
              </div>
              <div className="flex items-center gap-10 shrink-0">
                 <div className="text-right">
                    <div className="label-elite uppercase text-zinc-400 mb-0.5">Total Syncs</div>
                    <div className="text-lg font-bold text-zinc-900 dark:text-white leading-none">{profile.stats.totalTicks}</div>
                 </div>
                 <div className="text-right">
                    <div className="label-elite uppercase text-zinc-400 mb-0.5">Objectives</div>
                    <div className="text-lg font-bold text-[rgb(var(--primary))] leading-none">{profile.stats.habitCount}</div>
                 </div>
              </div>
           </div>
        </div>

        {/* NAVIGATION */}
        <div className="border-b border-zinc-100 dark:border-white/5 mb-10">
             <div className="flex gap-10">
               {tabs.map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`pb-4 label-elite uppercase transition-all relative ${
                     activeTab === tab.id ? 'text-[rgb(var(--primary))]' : 'text-zinc-400 hover:text-zinc-600'
                   }`}
                 >
                   {tab.label}
                   {activeTab === tab.id && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--primary))] rounded-full" />}
                 </button>
               ))}
            </div>
        </div>

        {/* TAB CONTENT (Now Full Width Grid) */}
        <div className="w-full">
               <AnimatePresence mode="wait">
                  {activeTab === 'stats' && (
                    <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {[
                            { label: 'Success Rate', val: '94%', icon: Star, color: 'text-amber-500' },
                            { label: 'Matrix Score', val: profile.credibilityScore, icon: ShieldCheck, color: 'text-emerald-500' },
                            { label: 'Global Rank', val: '#12', icon: Trophy, color: 'text-indigo-500' }
                          ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 transition-all hover:border-[rgb(var(--primary))] group -mx-4 md:mx-0">
                               <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-center text-zinc-400 group-hover:text-[rgb(var(--primary))] transition-all">
                                  <item.icon size={20} />
                               </div>
                               <div className="space-y-1">
                                  <div className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{item.val}</div>
                                  <div className="label-elite uppercase text-zinc-400">{item.label}</div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'links' && (
                    <motion.div key="links" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {profileFields.map((field) => {
                             const val = externalProfiles[field.key];
                             if (!isOwnProfile && !val) return null;
                             return (
                               <div key={field.key} className="bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-2xl p-5 space-y-3 -mx-4 md:mx-0">
                                  <div className="flex items-center justify-between px-1">
                                     <span className="label-elite uppercase text-zinc-400">{field.label}</span>
                                     <Link2 size={12} className="text-zinc-300" />
                                  </div>
                                  {isOwnProfile ? (
                                    <input 
                                      value={val || ""}
                                      onChange={(e) => setExternalProfiles({...externalProfiles, [field.key]: e.target.value})}
                                      className="w-full bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-[rgb(var(--primary))] outline-none transition-all"
                                      placeholder={`Enter ${field.label} ID...`}
                                    />
                                  ) : (
                                    <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60 rounded-xl p-3 border border-zinc-100 dark:border-white/5">
                                       <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 truncate pr-4">{val || "REDACTED"}</span>
                                       <ExternalLink size={14} className="text-[rgb(var(--primary))] hover:scale-110 cursor-pointer transition-all" />
                                    </div>
                                  )}
                               </div>
                             );
                          })}
                       </div>
                       
                       {isOwnProfile && (
                         <div className="pt-4">
                            <button onClick={handleSave} className="w-full py-4 rounded-[2rem] bg-zinc-950 dark:bg-[rgb(var(--primary))] text-white text-[11px] font-extrabold tracking-[0.15em] uppercase flex items-center justify-center gap-3 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-[rgba(var(--primary-rgb),0.2)] border border-transparent dark:border-white/10">
                               <Save size={16} />
                               Synchronize Links
                            </button>
                         </div>
                       )}
                    </motion.div>
                  )}

                 {activeTab === 'settings' && isOwnProfile && (
                    <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-[2rem] p-8 space-y-4 -mx-4 md:mx-0">
                             <div className="label-elite uppercase text-zinc-400">Identity Tag</div>
                             <input 
                               value={name} 
                               onChange={(e) => setName(e.target.value)} 
                               placeholder="Assign name..."
                               className="w-full bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:border-[rgb(var(--primary))] outline-none transition-all" 
                             />
                          </div>
                          
                          <div className="bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-[2rem] p-8 space-y-4 -mx-4 md:mx-0">
                             <div className="label-elite uppercase text-zinc-400">Geographic Sector</div>
                             <input 
                               value={location} 
                               onChange={(e) => setLocation(e.target.value)} 
                               placeholder="Set location..."
                               className="w-full bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:border-[rgb(var(--primary))] outline-none transition-all" 
                             />
                          </div>

                          <div className="bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-[2rem] p-8 space-y-4 md:col-span-2 -mx-4 md:mx-0">
                             <div className="label-elite uppercase text-zinc-400">Avatar URL</div>
                             <input 
                               value={avatar} 
                               onChange={(e) => setAvatar(e.target.value)} 
                               placeholder="Set profile photo URL..."
                               className="w-full bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:border-[rgb(var(--primary))] outline-none transition-all" 
                             />
                          </div>

                          <div className="bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-[2rem] p-8 space-y-4 md:col-span-2 -mx-4 md:mx-0">
                             <div className="label-elite uppercase text-zinc-400">Banner URL</div>
                             <input 
                               value={banner} 
                               onChange={(e) => setBanner(e.target.value)} 
                               placeholder="Enhance aesthetics with an image URL..."
                               className="w-full bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:border-[rgb(var(--primary))] outline-none transition-all" 
                             />
                          </div>
                          
                          <div className="bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-[2rem] p-8 space-y-6 -mx-4 md:mx-0">
                             <div className="label-elite uppercase text-zinc-400">Spectrum Calibration</div>
                             <div className="flex flex-wrap gap-3">
                                {Object.keys(accentSwatches).map(color => (
                                  <button 
                                    key={color} 
                                    onClick={() => setAccentColor(color)}
                                    className={`w-9 h-9 rounded-xl transition-all ${accentSwatches[color]} ${accentColor === color ? 'scale-110 ring-4 ring-white shadow-xl z-10' : 'scale-90 opacity-40 hover:opacity-100'}`}
                                  />
                                ))}
                             </div>
                          </div>
 
                          <div className="bg-white dark:bg-zinc-900/40 border-y md:border-x border-zinc-200 dark:border-white/5 rounded-none md:rounded-[2rem] p-8 flex items-center justify-between -mx-4 md:mx-0">
                             <div className="space-y-1">
                                <div className="label-elite uppercase text-zinc-400">Sector Visibility</div>
                                <div className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">{profilePublic ? 'Operational' : 'Stealth'}</div>
                             </div>
                             <button onClick={() => setProfilePublic(!profilePublic)} className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${profilePublic ? 'bg-emerald-500 justify-end' : 'bg-zinc-200 dark:bg-zinc-800 justify-start'}`}>
                                <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                             </button>
                          </div>
                       </div>
 
                       <div className="pt-4">
                          <button onClick={handleSave} className="w-full py-5 rounded-[2rem] bg-zinc-950 dark:bg-[rgb(var(--primary))] text-white text-[11px] font-extrabold tracking-[0.15em] uppercase flex items-center justify-center gap-4 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-[rgba(var(--primary-rgb),0.2)] border border-transparent dark:border-white/10">
                             <ArrowRight size={18} />
                             Synchronize Matrix
                          </button>
                          {message && <div className="mt-6 text-center label-elite uppercase text-[rgb(var(--primary))] animate-pulse">{message}</div>}
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </main>
  );
}

function CheckCircle(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
