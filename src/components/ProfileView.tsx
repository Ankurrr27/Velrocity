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
import { getOptimizedCloudinaryImage, uploadProfileImageToCloudinary } from "@/utils/cloudinaryUpload";

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
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("Please choose an image under 8MB.");
        return;
      }
      setUploadError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setShowCropModal(true);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCrop = async () => {
    if (!tempImage) return;
    setUploadingAvatar(true);
    setUploadError("");
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = tempImage;
    img.onload = async () => {
      const size = 1024;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        const displayWidth = 300;
        const naturalWidth = img.width;
        const baseScale = naturalWidth / displayWidth;
        const sx = (-position.x / zoom) * baseScale;
        const sy = (-position.y / zoom) * baseScale;
        const sWidth = (displayWidth / zoom) * baseScale;
        const sHeight = (displayWidth / zoom) * baseScale;

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, size, size);
        canvas.toBlob(async (blob) => {
          if (!blob) {
            setUploadError("Could not process this image.");
            setUploadingAvatar(false);
            return;
          }

          try {
            const cloudinaryUrl = await uploadProfileImageToCloudinary(blob);
            setAvatar(cloudinaryUrl);
            const result = await updateProfile({ avatar: cloudinaryUrl });
            if (result.success) {
              setProfile((current: any) => ({ ...current, avatar: cloudinaryUrl }));
              setMessage("Profile photo updated.");
              setTimeout(() => setMessage(""), 3000);
            }
            setShowCropModal(false);
            setTempImage(null);
          } catch (error: any) {
            setUploadError(error.message || "Cloudinary upload failed.");
          } finally {
            setUploadingAvatar(false);
          }
        }, "image/jpeg", 0.96);
      }
    };
    img.onerror = () => {
      setUploadError("Could not read this image.");
      setUploadingAvatar(false);
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
      
      <div className="relative -mx-6 h-24 overflow-hidden bg-zinc-100 shadow-sm dark:bg-zinc-900 lg:-mx-12">
         {banner && (
            <img src={banner} alt="Cover Banner" className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity" />
         )}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-3 sm:px-4">
        <div className="relative -mt-10 mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="group relative h-24 w-24 shrink-0 rounded-2xl border border-slate-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-zinc-900"
          >
             <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-100 text-3xl font-semibold uppercase text-zinc-500 dark:bg-zinc-800 dark:text-white">
                {avatar || profile.avatar ? (
                  <img src={getOptimizedCloudinaryImage(avatar || profile.avatar, 900)} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-white">
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
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-black shadow-md dark:bg-zinc-100">
                 Level {profile.credibilityScore > 1000 ? '99' : '12'}
              </div>
          </motion.div>

          <div className="flex-1 space-y-2 pb-2 text-center sm:text-left">
             <div className="space-y-1">
               <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 mb-2">
                 <h1 className="text-2xl font-semibold leading-tight text-zinc-900 dark:text-white sm:text-3xl">
                   {profile.name}
                 </h1>
                 <div className="rounded-full border border-[rgba(var(--primary-rgb),0.2)] bg-[rgba(var(--primary-rgb),0.1)] px-2.5 py-1 text-xs font-medium text-[rgb(var(--primary))]">
                   Profile
                 </div>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-3 text-zinc-500 sm:justify-start">
                  <span className="text-sm font-medium">@{profile.username}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-zinc-500" />
                    {profile.location && <span className="text-sm">{profile.location}</span>}
                  </div>
               </div>
             </div>

             {(profile.currentFocus || profile.college) && (
               <div className="flex flex-wrap gap-2">
                 {profile.currentFocus && <div className="inline-flex items-center gap-2 rounded-lg border border-[rgba(var(--primary-rgb),0.2)] bg-[rgb(var(--primary-soft))] px-3 py-1.5">
                    <Target size={14} className="text-[rgb(var(--primary))]" />
                    <span className="text-sm text-zinc-900 dark:text-white">Focus: <span className="text-[rgb(var(--primary))]">{profile.currentFocus}</span></span>
                 </div>}
                 {profile.college && (
                    <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-500/10 bg-zinc-500/10 px-3 py-1.5">
                       <ShieldCheck size={14} className="text-zinc-500" />
                       <span className="text-sm text-zinc-500">{profile.college}</span>
                    </div>
                 )}
               </div>
             )}
          </div>

          <div className="flex w-full shrink-0 justify-center sm:w-auto">
             {isOwnProfile ? (
               <div className="flex gap-2">
                 <button 
                  onClick={() => setActiveTab('settings')} 
                  className="
                    flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-white
                  "
                 >
                   <SettingsIcon size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                   <span className="text-sm font-medium">Edit profile</span>
                 </button>
                 <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-500 shadow-sm transition hover:bg-zinc-200 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300" aria-label="Share profile">
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
                   h-10 rounded-lg px-4 flex items-center gap-2 transition shadow-sm
                   ${profile.isFollowing 
                     ? 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-500' 
                     : 'bg-[rgb(var(--primary))] text-white'
                   }
                 `}
               >
                  <Users size={16} />
                  <span className="text-sm font-medium">
                    {profile.isFollowing ? 'Unfollow' : 'Follow'}
                  </span>
               </button>
             )}
          </div>
        </div>

        {/* OPERATIONS STRIP */}
        {(profile.tagline || profile.bio || profile.stats?.totalTicks || profile.stats?.habitCount) && (
          <section className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-zinc-200 py-3 dark:border-white/10">
            {(profile.tagline || profile.bio) && (
              <div className="min-w-0 flex-1">
                {profile.tagline && <p className="font-medium text-zinc-800 dark:text-zinc-200">{profile.tagline}</p>}
                {profile.bio && <p className="mt-1 text-sm">{profile.bio}</p>}
              </div>
            )}
            <div className="flex items-center gap-5">
              <div>
                <span className="block text-xs text-zinc-500">Completions</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{profile.stats?.totalTicks || 0}</span>
              </div>
              <div>
                <span className="block text-xs text-zinc-500">Habits</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{profile.stats?.habitCount || 0}</span>
              </div>
            </div>
          </section>
        )}

        {/* NAVIGATION */}
        <div className="mb-6 flex justify-center overflow-x-auto border-b border-zinc-100 px-2 no-scrollbar dark:border-white/5 sm:justify-start">
             <div className="flex gap-6">
               {tabs.map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`relative whitespace-nowrap py-3 text-sm font-medium transition-all ${
                     activeTab === tab.id ? 'text-[rgb(var(--primary))]' : 'text-zinc-500 hover:text-zinc-300'
                   }`}
                 >
                   {tab.label}
                   {activeTab === tab.id && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[rgb(var(--primary))]" />}
                 </button>
               ))}
            </div>
        </div>

        {/* TAB CONTENT */}
        <div className="w-full">
               <AnimatePresence mode="wait">
                  {activeTab === 'stats' && (
                    <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                       <div className="grid grid-cols-1 divide-y divide-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/10">
                          {[
                            { label: 'Success Rate', val: `${profile.stats?.successRate || 0}%`, icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                            { label: 'Matrix Score', val: profile.credibilityScore, icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            { label: 'Global Rank', val: `#${profile.stats?.rank || '---'}`, icon: Trophy, color: 'text-[rgb(var(--primary))]', bg: 'bg-[rgb(var(--primary-soft))]' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 py-3 sm:justify-center sm:px-3">
                               <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.bg} ${item.color}`}>
                                  <item.icon size={18} />
                               </div>
                               <div>
                                  <div className="text-lg font-semibold leading-tight text-zinc-900 dark:text-white">{item.val}</div>
                                  <div className="text-xs text-zinc-500">{item.label}</div>
                                </div>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'links' && (
                    <motion.div key="links" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-4">
                       <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {profileFields.map((field) => {
                             const val = externalProfiles[field.key];
                             if (!isOwnProfile && !val) return null;
                             return (
                               <div key={field.key} className="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5 rounded-3xl p-6 space-y-4 hover:border-[rgba(var(--primary-rgb),0.2)] transition-all shadow-xl shadow-black/5">
                                  <div className="flex items-center justify-between px-1">
                                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{field.label}</span>
                                     <Link2 size={14} className="text-zinc-600" />
                                  </div>
                                  {isOwnProfile ? (
                                    <input 
                                      value={val || ""}
                                      onChange={(e) => setExternalProfiles({...externalProfiles, [field.key]: e.target.value})}
                                      className="w-full bg-zinc-50 dark:bg-black/60 border border-zinc-200 dark:border-white/5 rounded-2xl px-5 py-4 text-xs font-bold focus:border-[rgb(var(--primary))] outline-none transition-all placeholder:text-zinc-700"
                                      placeholder={`@username...`}
                                    />
                                  ) : (
                                    <div className="flex items-center justify-between bg-zinc-50 dark:bg-black/60 rounded-2xl p-4 border border-zinc-200 dark:border-white/5">
                                       <span className="text-sm font-black text-zinc-700 dark:text-zinc-200 truncate pr-4">{val || "REDACTED"}</span>
                                       <ExternalLink size={16} className="text-[rgb(var(--primary))] hover:scale-110 cursor-pointer transition-all" />
                                    </div>
                                  )}
                               </div>
                             );
                          })}
                       </div>
                       
                       {isOwnProfile && (
                         <div className="pt-6">
                            <button onClick={handleSave} disabled={saving} className="w-full py-5 rounded-3xl bg-[rgb(var(--primary))] text-white text-[11px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_24px_48px_-12px_rgba(var(--primary-rgb),0.3)] disabled:opacity-50">
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
                               <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary))]" />
                               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">My Profile</div>
                             </div>
                             <div className="space-y-6">
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">College/University</label>
                                  <input 
                                    value={college} 
                                    onChange={(e) => setCollege(e.target.value)} 
                                    placeholder="Which college are you in?"
                                    className="w-full bg-indigo-50/50 dark:bg-[rgba(var(--primary-rgb),0.05)] border border-indigo-200 dark:border-[rgba(var(--primary-rgb),0.2)] rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-[rgb(var(--primary))] outline-none transition-all placeholder:text-zinc-400"
                                  />
                               </div>
                               <div className="space-y-2 border-t border-zinc-100 dark:border-white/5 pt-4">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">Display Name</label>
                                  <input 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Assign handle..."
                                    className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-[rgb(var(--primary))] outline-none transition-all"
                                  />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">What are you building?</label>
                                  <input 
                                    value={currentFocus} 
                                    onChange={(e) => setCurrentFocus(e.target.value)} 
                                    placeholder="e.g. Master React, Grind 500 LeetCode"
                                    className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-[rgb(var(--primary))] outline-none transition-all placeholder:text-zinc-400"
                                  />
                               </div>
                             </div>
                          </div>
                          
                          <div className="bg-white dark:bg-zinc-950/40 border border-zinc-100 dark:border-white/5 rounded-[2.5rem] p-10 space-y-6 shadow-xl">
                             <div className="flex items-center gap-3 mb-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary))]" />
                               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Location & Bio</div>
                             </div>
                             <div className="space-y-6">
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">Geographic Sector</label>
                                  <input 
                                    value={location} 
                                    onChange={(e) => setLocation(e.target.value)} 
                                    placeholder="Set geographic coordinates..."
                                    className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-[rgb(var(--primary))] outline-none transition-all"
                                  />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-1">My Motto</label>
                                  <input 
                                    value={tagline} 
                                    onChange={(e) => setTagline(e.target.value)} 
                                    placeholder="Your motto..."
                                    className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-sm font-black truncate focus:border-[rgb(var(--primary))] outline-none transition-all"
                                  />
                               </div>
                             </div>
                          </div>

                          <div className="bg-white dark:bg-zinc-950/40 border border-zinc-100 dark:border-white/5 rounded-[2.5rem] p-10 space-y-4 md:col-span-2 shadow-xl">
                             <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary))]" />
                                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Design Settings</div>
                                </div>
                                <div className="text-[8px] font-black uppercase text-[rgb(var(--primary))]">Visual Enhancement Area</div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-2">Profile Assets</label>
                                    <div className="flex gap-2">
                                       <input 
                                         value={avatar} 
                                         onChange={(e) => setAvatar(e.target.value)} 
                                         placeholder="Avatar Image URL..."
                                         className="flex-1 bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-xs font-black focus:border-[rgb(var(--primary))] outline-none transition-all"
                                       />
                                       <button 
                                         onClick={() => fileInputRef.current?.click()}
                                         type="button"
                                         className="w-12 h-12 shrink-0 bg-[rgb(var(--primary-soft))] border border-[rgba(var(--primary-rgb),0.2)] rounded-2xl flex items-center justify-center text-[rgb(var(--primary))] hover:bg-[rgba(var(--primary-rgb),0.2)] transition-all"
                                         title="Upload Local File"
                                       >
                                          <Users size={16} />
                                       </button>
                                    </div>
                                   <input 
                                     value={banner} 
                                     onChange={(e) => setBanner(e.target.value)} 
                                     placeholder="Custom Banner URL..."
                                     className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-xs font-black focus:border-[rgb(var(--primary))] outline-none transition-all"
                                   />
                                </div>
                                <div className="space-y-4">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 pl-2">Banner Presets</label>
                                   <div className="grid grid-cols-3 gap-3">
                                      {bannerPresets.map(preset => (
                                        <button 
                                          key={preset.id}
                                          onClick={() => setBanner(preset.url)}
                                          className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all ${banner === preset.url ? 'border-[rgb(var(--primary))]' : 'border-transparent opacity-60 hover:opacity-100'}`}
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
                               <button onClick={() => setProfilePublic(!profilePublic)} className={`w-14 h-7 rounded-full transition-all flex items-center px-1.5 ${profilePublic ? 'bg-[rgb(var(--primary))] justify-end shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]' : 'bg-zinc-200 dark:bg-zinc-800 justify-start'}`}>
                                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                                </button>
                             </div>
                             <p className="text-[10px] font-medium text-zinc-500">{profilePublic ? 'Your profile is visible to everyone in the network.' : 'Your profile is hidden from the public network.'}</p>
                          </div>
                       </div>
  
                       <div className="pt-6">
                           <button onClick={handleSave} disabled={saving} className="w-full py-6 rounded-[2.5rem] bg-[rgb(var(--primary))] text-white text-[12px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_24px_48px_-12px_rgba(var(--primary-rgb),0.3)]">
                              <ArrowRight size={20} />
                              {saving ? "Deploying Changes..." : "Save All Changes"}
                           </button>
                           {message && <div className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.5em] text-[rgb(var(--primary))] animate-pulse">{message}</div>}
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur-xl"
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0b0f19]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200/70 p-6 dark:border-white/5">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Crop profile photo</h3>
                  <p className="mt-1 text-sm text-slate-500">Uploaded to Cloudinary at high quality.</p>
                </div>
                <button onClick={() => setShowCropModal(false)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-all hover:text-slate-950 dark:bg-white/5 dark:hover:text-white">
                   <Target size={18} />
                </button>
              </div>

              <div className="space-y-6 p-6">
                <div className="relative mx-auto h-[300px] w-[300px] cursor-move overflow-hidden rounded-2xl border border-[rgba(var(--primary-rgb),0.3)] bg-slate-950"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                >
                  <img 
                    src={tempImage} 
                    alt="Crop Preview" 
                    draggable={false}
                    className="pointer-events-none absolute origin-top-left select-none shadow-2xl transition-transform duration-75"
                    style={{ 
                      transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                      width: '300px',
                      maxWidth: 'none'
                    }} 
                  />
                  <div className="pointer-events-none absolute inset-0 border-[40px] border-black/35" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <span className="label-elite">Zoom</span>
                    <span className="text-xs font-semibold text-[rgb(var(--primary))]">{Math.round(zoom * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    step="0.01" 
                    value={zoom} 
                    onChange={e => setZoom(parseFloat(e.target.value))}
                    className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[rgb(var(--primary))] dark:bg-white/10"
                  />
                </div>

                {uploadError && (
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-500">
                    {uploadError}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowCropModal(false)}
                    disabled={uploadingAvatar}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                    <button 
                      onClick={handleApplyCrop}
                      disabled={uploadingAvatar}
                      className="btn-primary flex-1 disabled:opacity-60"
                    >
                      {uploadingAvatar ? "Uploading..." : "Apply photo"}
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
