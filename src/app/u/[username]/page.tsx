'use client';

import { useState, useEffect } from "react";
import ProfileView from "@/components/ProfileView";
import { fetchUserProfile } from "@/app/actions/habitActions";
import { useParams } from "next/navigation";

export default function ExternalProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const data = await fetchUserProfile(username);
      setProfile(data);
      setLoading(false);
    };
    init();
  }, [username]);

  if (loading) return <div className="p-12 text-zinc-500 font-bold uppercase tracking-widest text-center py-40 italic animate-pulse">Intercepting External Signal...</div>;
  if (!profile) return <div className="p-12 text-red-500 font-bold uppercase tracking-widest text-center py-40">Target Entity Not Found in Global Matrix</div>;

  return <ProfileView initialProfile={profile} isOwnProfile={false} />;
}
