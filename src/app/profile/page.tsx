'use client';

import { useState, useEffect } from "react";
import ProfileView from "@/components/ProfileView";
import { fetchUserProfile } from "@/app/actions/habitActions";

export default function MyProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const data = await fetchUserProfile();
      setProfile(data);
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="page-shell flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mb-5 flex items-center gap-4">
            <div className="h-14 w-14 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/10" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-36 animate-pulse rounded-full bg-slate-100 dark:bg-white/10" />
              <div className="h-3 w-24 animate-pulse rounded-full bg-slate-100 dark:bg-white/10" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
            <div className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
            <div className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return <div className="p-12 text-center text-sm font-semibold text-rose-500">Profile could not be loaded.</div>;

  return <ProfileView initialProfile={profile} isOwnProfile={true} />;
}
