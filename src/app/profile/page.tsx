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

  if (loading) return <div className="p-12 text-zinc-500 font-bold uppercase tracking-widest text-center py-40 italic animate-pulse">Establishing Secure Profile Sync...</div>;
  if (!profile) return <div className="p-12 text-red-500 font-bold uppercase tracking-widest text-center py-40">Access Denied: Sector Integrity Compromised</div>;

  return <ProfileView initialProfile={profile} isOwnProfile={true} />;
}
