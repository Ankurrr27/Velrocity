'use client';

import { useState, useEffect, useMemo, useRef } from "react";
import { 
  Flame, Star, Users, ExternalLink, 
  Settings as SettingsIcon, Share2, ShieldCheck, Trophy, 
  Target, Calendar, MapPin, Eye, EyeOff, Palette, Quote,
  ArrowRight, Check, Save, Link2, UserRound
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfile } from "@/app/actions/profileActions";
import { toggleFollow } from "@/app/actions/socialActions";

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
  { key: "twitter", label: "Twitter/X" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "discord", label: "Discord" },
  { key: "codolio", label: "Codolio" },
];

const bannerPresets = [
  { id: 'none', label: 'Classic', url: '' },
  { id: 'grid', label: 'Cyber Grid', url: '/banners/cyber_grid.png' },
  { id: 'nebula', label: 'Deep Nebula', url: '/banners/nebula.png' },
  { id: 'glass', label: 'Abstract Glass', url: '/banners/glass.png' },
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
  const [currentFocus, setCurrentFocus] = useState(profile.currentFocus || "");
  const [college, setCollege] = useState(profile.college || "");
  const [accentColor, setAccentColor] = useState(profile.accentColor || "indigo");
  const [profilePublic, setProfilePublic] = useState(profile.profilePublic || false);
  const [externalProfiles, setExternalProfiles] = useState(profile.externalProfiles || {});
  const [banner, setBanner] = useState(profile.banner || "");
  const [avatar, setAvatar] = useState(profile.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Sector data too dense. Max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setShowCropModal(true);
        setZoom(1);
        setPosition({ x: 0, y: 0 }); // We'll center it in the modal via useEffect or initial state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCrop = () => {
    if (!tempImage) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = tempImage;
    img.onload = () => {
      const size = 400;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const displayWidth = 300;
        const naturalWidth = img.width;
        // Scale factor between natural pixels and display pixels (at zoom=1)
        const baseScale = naturalWidth / displayWidth;
        
        // sx/sy are the top-left coordinates in the natural image
        // position.x/y are the shifts applied to the image relative to the 300x300 box
        const sx = (-position.x / zoom) * baseScale;
        const sy = (-position.y / zoom) * baseScale;
        const sWidth = (displayWidth / zoom) * baseScale;
        const sHeight = (displayWidth / zoom) * baseScale;

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, size, size);
        setAvatar(canvas.toDataURL('image/jpeg', 0.9));
      }
      setShowCropModal(false);
      setTempImage(null);
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

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
      name, bio, tagline, location, currentFocus, college, accentColor, profilePublic, externalProfiles, banner, avatar
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
      <div className="relative h-40 lg:h-72 -mx-6 lg:-mx-12 overflow-hidden bg-zinc-900 dark:bg-black">
         {banner ? (
            <img src={banner} alt="Cover Banner" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity duration-700 hover:scale-105 transition-all" />
         ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[rgba(var(--primary-rgb),0.3)] via-transparent to-transparent opacity-80" />
         )}
         <div className="absolute inset-0 bg-gradient-to-r from-[rgba(var(--primary-rgb),0.1)] to-transparent mix-blend-overlay" />
         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgb(var(--bg-middle))] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        {/* COMPACT HEADER BAR */}
        <div className="relative -mt-16 sm:-mt-24 lg:-mt-32 flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-10 mb-16">
          {/* Avatar - Elegant Dynamic Ring */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-[2.5rem] p-1.5 bg-gradient-to-br from-[rgba(var(--primary-rgb),1)] via-[rgba(var(--primary-rgb),0.3)] to-transparent shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] shrink-0 relative group border-none"
          >
             <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-4 border-zinc-200 dark:border-zinc-950 flex items-center justify-center text-4xl sm:text-5xl font-black uppercase shadow-inner relative">
                {profile.avatar ? (
                  <img src={profile.avatar} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-950 flex items-center justify-center text-zinc-500 dark:text-white italic tracking-tighter">
                    {profile.username[0]}
                  </div>
                )}
                {/* ONLINE PULSE */}
                {(profile.lastActive && (new Date().getTime() - new Date(profile.lastActive).getTime()) < 5 * 60 * 1000) && (
                   <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </div>
                      <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-zinc-950/80 px-2 py-0.5 rounded-full border border-emerald-500/20 backdrop-blur-md">Online</span>
                   </div>
                )}
                {isOwnProfile && (
                  <>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 cursor-pointer z-10"
                    >
                        <UserRound size={32} className="text-white" />
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </>
                )}
             </div>
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-100 text-black px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] shadow-xl whitespace-nowrap">
                 Level {profile.credibilityScore > 1000 ? '99' : '12'}
              </div>
          </motion.div>

          <div className="flex-1 text-center sm:text-left pb-4 space-y-4">
             <div className="space-y-1">
               <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 mb-2">
                 <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                   {profile.name}
                 </h1>
                 <div className="bg-[rgba(var(--primary-rgb),0.1)] text-[rgb(var(--primary))] border border-[rgba(var(--primary-rgb),0.2)] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg">
                   Core Elite
                 </div>
               </div>
               <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-6 text-zinc-500">
                  <span className="text-sm font-black tracking-tighter uppercase opacity-80">@{profile.username}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-zinc-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{profile.location || 'Unknown Sector'}</span>
                  </div>
               </div>
             </div>

             {profile.currentFocus && (
               <div className="flex flex-wrap gap-2">
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <Target size={14} className="text-indigo-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-zinc-900 dark:text-white">Current Focus: <span className="text-indigo-600 dark:text-indigo-400 italic">{profile.currentFocus}</span></span>
                 </div>
                 {profile.college && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-500/10 border border-zinc-500/10 rounded-xl">
                       <ShieldCheck size={14} className="text-zinc-500" />
                       <span className="text-[10px] font-black uppercase tracking-[0.1em] text-zinc-400">{profile.college}</span>
                    </div>
                 )}
               </div>
             )}
          </div>

          <div className="shrink-0 pb-6 flex justify-center w-full sm:w-auto">
             {isOwnProfile ? (
               <div className="flex gap-2">
                 <button 
                  onClick={() => setActiveTab('settings')} 
                  className="
                    group h-12 px-8 rounded-2xl bg-white text-zinc-900 
                    flex items-center gap-3 shadow-2xl transition-all duration-500 border border-zinc-200 hover:scale-[1.05]
                  "
                 >
                   <SettingsIcon size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">Edit Profile</span>
                 </button>
                 <button className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all">
                    <Share2 size={16} />
                 </button>
               </div>
             ) : (
               <button 
                 onClick={async () => {
                   const res = await toggleFollow(profile.id);
                   if (res.success) {
                     setProfile((p: any) => ({ ...p, isFollowing: res.isFollowing }));
                   }
                 }}
                 className={`
                   h-14 px-10 rounded-2xl flex items-center gap-3 transition-all duration-500 hover:scale-105 shadow-2xl
                   ${profile.isFollowing 
                     ? 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-500' 
                     : 'bg-[rgb(var(--primary))] text-white'
                   }
                 `}
               >
                  <Users size={16} />
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase">
                    {profile.isFollowing ? 'Disconnect' : 'Sync Frequency'}
                  </span>
               </button>
             )}
          </div>
        </div>

        {/* OPERATIONS STRIP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
           <div className="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5 rounded-[2rem] p-8 flex items-start gap-6 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/60 shadow-xl shadow-black/5">
              <Quote size={24} className="text-indigo-500 shrink-0 mt-1 opacity-40" />
              <div className="space-y-2">
                 <div className="label-elite uppercase text-zinc-500 font-black tracking-[0.2em]">My Motto</div>
                 <p className="text-base font-medium italic text-zinc-800 dark:text-zinc-100 leading-relaxed">
                   "{profile.tagline || "Mission in progress. Architecting absolute consistency."}"
                 </p>
              </div>
           </div>
           <div className="lg:col-span-2 bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl shadow-black/5">
              <div className="space-y-3 w-full md:w-auto">
                 <div className="label-elite uppercase text-zinc-500 font-black tracking-[0.2em]">About Me</div>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed max-w-lg">{profile.bio || "No historical logs captured for this operative. Session initial."}</p>
              </div>
              <div className="flex items-center gap-12 shrink-0 w-full md:w-auto justify-between md:justify-end border-t border-zinc-100 dark:border-white/5 pt-6 md:pt-0 md:border-t-0">
                 <div className="text-center md:text-right">
                    <div className="label-elite uppercase text-zinc-500 mb-1">Total Syncs</div>
                    <div className="text-4xl font-black text-zinc-900 dark:text-white leading-none tracking-tighter">{profile.stats.totalTicks}</div>
                 </div>
                 <div className="text-center md:text-right">
                    <div className="label-elite uppercase text-zinc-500 mb-1">Objectives</div>
                    <div className="text-4xl font-black text-indigo-500 leading-none tracking-tighter">{profile.stats.habitCount}</div>
                 </div>
              </div>
           </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center sm:justify-start overflow-x-auto no-scrollbar border-b border-zinc-100 dark:border-white/5 px-2 mb-12">
             <div className="flex gap-12">
               {tabs.map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`pb-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative whitespace-nowrap ${
                     activeTab === tab.id ? 'text-indigo-500' : 'text-zinc-500 hover:text-zinc-300'
                   }`}
                 >
                   {tab.label}
                   {activeTab === tab.id && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 rounded-full" />}
                 </button>
               ))}
            </div>
        </div>

        {/* TAB CONTENT */}
        <div className="w-full">
               <AnimatePresence mode="wait">
                  {activeTab === 'stats' && (
                    <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="space-y-6">
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[
                            { label: 'Success Rate', val: `${profile.stats?.successRate || 0}%`, icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                            { label: 'Matrix Score', val: profile.credibilityScore, icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            { label: 'Global Rank', val: `#${profile.stats?.rank || '---'}`, icon: Trophy, color: 'text-indigo-500', bg: 'bg-indigo-500/10' }
                          ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center gap-6 transition-all hover:border-indigo-500/30 group shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
                               <div className={`w-16 h-16 rounded-[2rem] ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                                  <item.icon size={28} />
                               </div>
                               <div className="space-y-2">
                                  <div className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">{item.val}</div>
                                  <div className="label-elite uppercase text-zinc-500 font-bold tracking-[0.2em]">{item.label}</div>
                                </div>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'links' && (
                    <motion.div key="links" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {profileFields.map((field) => {
                             const val = externalProfiles[field.key];
                             if (!isOwnProfile && !val) return null;
                             return (
                               <div key={field.key} className="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5 rounded-3xl p-6 space-y-4 hover:border-indigo-500/20 transition-all shadow-xl shadow-black/5">
                                  <div className="flex items-center justify-between px-1">
                                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{field.label}</span>
                                     <Link2 size={14} className="text-zinc-600" />
                                  </div>
                                  {isOwnProfile ? (
                                    <input 
                                      value={val || ""}
                                      onChange={(e) => setExternalProfiles({...externalProfiles, [field.key]: e.target.value})}
                                      className="w-full bg-zinc-50 dark:bg-black/60 border border-zinc-200 dark:border-white/5 rounded-2xl px-5 py-4 text-xs font-bold focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-700"
                                      placeholder={`@username...`}
                                    />
                                  ) : (
                                    <div className="flex items-center justify-between bg-zinc-50 dark:bg-black/60 rounded-2xl p-4 border border-zinc-200 dark:border-white/5">
                                       <span className="text-sm font-black text-zinc-700 dark:text-zinc-200 truncate pr-4">{val || "REDACTED"}</span>
                                       <ExternalLink size={16} className="text-indigo-500 hover:scale-110 cursor-pointer transition-all" />
                                    </div>
                                  )}
                               </div>
                             );
                          })}
                       </div>
                       
                       {isOwnProfile && (
                         <div className="pt-6">
                            <button onClick={handleSave} disabled={saving} className="w-full py-5 rounded-3xl bg-indigo-600 text-white text-[11px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-indigo-500/30 disabled:opacity-50">
                               {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                               {saving ? "Deploying Changes..." : "Save Links"}
                            </button>
                         </div>
                       )}
                    </motion.div>
                  )}

                  {activeTab === 'settings' && isOwnProfile && (
                    <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="space-y-10">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="bg-white dark:bg-zinc-950/40 border border-zinc-100 dark:border-white/5 rounded-[2.5rem] p-10 space-y-6 shadow-xl">
                             <div className="flex items-center gap-3 mb-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">My Profile</div>
                             </div>
                             <div className="space-y-6">
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">College/University</label>
                                  <input 
                                    value={college} 
                                    onChange={(e) => setCollege(e.target.value)} 
                                    placeholder="Which college are you in?"
                                    className="w-full bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-400" 
                                  />
                               </div>
                               <div className="space-y-2 border-t border-zinc-100 dark:border-white/5 pt-4">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">Display Name</label>
                                  <input 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Assign handle..."
                                    className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-indigo-500 outline-none transition-all" 
                                  />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">What are you building?</label>
                                  <input 
                                    value={currentFocus} 
                                    onChange={(e) => setCurrentFocus(e.target.value)} 
                                    placeholder="e.g. Master React, Grind 500 LeetCode"
                                    className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-400" 
                                  />
                               </div>
                             </div>
                          </div>
                          
                          <div className="bg-white dark:bg-zinc-950/40 border border-zinc-100 dark:border-white/5 rounded-[2.5rem] p-10 space-y-6 shadow-xl">
                             <div className="flex items-center gap-3 mb-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Location & Bio</div>
                             </div>
                             <div className="space-y-6">
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">Geographic Sector</label>
                                  <input 
                                    value={location} 
                                    onChange={(e) => setLocation(e.target.value)} 
                                    placeholder="Set geographic coordinates..."
                                    className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-indigo-500 outline-none transition-all" 
                                  />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">My Motto</label>
                                  <input 
                                    value={tagline} 
                                    onChange={(e) => setTagline(e.target.value)} 
                                    placeholder="Your motto..."
                                    className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-indigo-500 outline-none transition-all" 
                                  />
                               </div>
                             </div>
                          </div>

                          <div className="bg-white dark:bg-zinc-950/40 border border-zinc-100 dark:border-white/5 rounded-[2.5rem] p-10 space-y-4 md:col-span-2 shadow-xl">
                             <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Design Settings</div>
                                </div>
                                <div className="text-[8px] font-black uppercase text-indigo-500">Visual Enhancement Area</div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-2">Profile Assets</label>
                                    <div className="flex gap-2">
                                       <input 
                                         value={avatar} 
                                         onChange={(e) => setAvatar(e.target.value)} 
                                         placeholder="Avatar Image URL..."
                                         className="flex-1 bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-xs font-black focus:border-indigo-500 outline-none transition-all" 
                                       />
                                       <button 
                                         onClick={() => fileInputRef.current?.click()}
                                         type="button"
                                         className="w-12 h-12 shrink-0 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-500 hover:bg-indigo-500/20 transition-all"
                                         title="Upload Local File"
                                       >
                                          <Users size={16} />
                                       </button>
                                    </div>
                                   <input 
                                     value={banner} 
                                     onChange={(e) => setBanner(e.target.value)} 
                                     placeholder="Custom Banner URL..."
                                     className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-xs font-black focus:border-indigo-500 outline-none transition-all" 
                                   />
                                </div>
                                <div className="space-y-4">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-2">Banner Presets</label>
                                   <div className="grid grid-cols-3 gap-3">
                                      {bannerPresets.map(preset => (
                                        <button 
                                          key={preset.id}
                                          onClick={() => setBanner(preset.url)}
                                          className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all ${banner === preset.url ? 'border-indigo-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        >
                                          {preset.url ? <img src={preset.url} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800" />}
                                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                             <span className="text-[7px] font-black uppercase text-white tracking-widest">{preset.label}</span>
                                          </div>
                                        </button>
                                      ))}
                                   </div>
                                </div>
                             </div>
                          </div>
                          
                          <div className="bg-white dark:bg-zinc-950/40 border border-zinc-100 dark:border-white/5 rounded-[2.5rem] p-10 space-y-6 shadow-xl">
                             <div className="label-elite uppercase text-zinc-600 font-black tracking-[0.2em]">Pick Color</div>
                             <div className="flex flex-wrap gap-4 justify-between lg:justify-start">
                                {Object.keys(accentSwatches).map(color => (
                                  <button 
                                    key={color} 
                                    onClick={() => setAccentColor(color)}
                                    className={`w-10 h-10 rounded-2xl transition-all ${accentSwatches[color]} ${accentColor === color ? 'scale-110 ring-4 ring-white dark:ring-white shadow-2xl z-10' : 'scale-90 opacity-40 hover:opacity-100'}`}
                                  />
                                ))}
                             </div>
                          </div>
  
                          <div className="bg-white dark:bg-zinc-950/40 border border-zinc-100 dark:border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between gap-6 shadow-xl">
                             <div className="flex items-center justify-between">
                               <div className="space-y-1">
                                  <div className="label-elite uppercase text-zinc-600 font-black tracking-[0.2em]">Profile Status</div>
                                  <div className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-tighter">{profilePublic ? 'Public Profile' : 'Private Profile'}</div>
                               </div>
                               <button onClick={() => setProfilePublic(!profilePublic)} className={`w-14 h-7 rounded-full transition-all flex items-center px-1.5 ${profilePublic ? 'bg-indigo-500 justify-end shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'bg-zinc-200 dark:bg-zinc-800 justify-start'}`}>
                                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                                </button>
                             </div>
                             <p className="text-[10px] font-medium text-zinc-500">{profilePublic ? 'Your profile is visible to everyone in the network.' : 'Your profile is hidden from the public network.'}</p>
                          </div>
                       </div>
  
                       <div className="pt-6">
                           <button onClick={handleSave} disabled={saving} className="w-full py-6 rounded-[2.5rem] bg-indigo-600 text-white text-[12px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-indigo-500/30">
                              <ArrowRight size={20} />
                              {saving ? "Deploying Changes..." : "Save All Changes"}
                           </button>
                           {message && <div className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500 animate-pulse">{message}</div>}
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
            </div>
         </div>
         {/* CROP MODAL */}
      <AnimatePresence>
        {showCropModal && tempImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white italic tracking-tighter">Calibrate Asset</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-1">Adjust framing parameter</p>
                </div>
                <button onClick={() => setShowCropModal(false)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all">
                   <Target size={18} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="relative w-[300px] h-[300px] mx-auto overflow-hidden rounded-[2rem] bg-black border-2 border-indigo-500/30 cursor-move"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                >
                  <img 
                    src={tempImage} 
                    alt="Crop Preview" 
                    draggable={false}
                    className="absolute pointer-events-none origin-top-left shadow-2xl transition-transform duration-75 select-none"
                    style={{ 
                      transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                      width: '300px',
                      maxWidth: 'none'
                    }} 
                  />
                  {/* Overlay for center guide */}
                  <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none" />
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Magnification</span>
                    <span className="text-[10px] font-black text-indigo-500">{Math.round(zoom * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    step="0.01" 
                    value={zoom} 
                    onChange={e => setZoom(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowCropModal(false)}
                    className="flex-1 py-4 rounded-2xl bg-white/5 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                  >
                    Abort
                  </button>
                    <button 
                      onClick={handleApplyCrop}
                      className="flex-2 py-4 px-10 rounded-2xl bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Apply Photo
                    </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
