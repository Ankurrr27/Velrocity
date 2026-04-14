'use client';

import { useEffect, useState } from "react";
import { fetchUsers, toggleFollow } from "@/app/actions/socialActions";
import UsersGrid from "./_components/UsersGrid";
import UsersHeader from "./_components/UsersHeader";
import UsersSidebar from "./_components/UsersSidebar";
import type { CommunityUser } from "./_components/types";

export default function UsersPage() {
  const [users, setUsers] = useState<CommunityUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };
    init();
  }, []);

  const handleSearch = async (value: string) => {
    setSearch(value);
    const data = await fetchUsers(value);
    setUsers(data);
  };

  const handleToggleFollow = async (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
    await toggleFollow(id);
  };

  const overviewStats = [
    { label: "Users", value: `${users.length || 0}` },
    {
      label: "High Credibility",
      value: `${users.filter((user) => (user.credibilityScore || 0) >= 50).length}`,
    },
    {
      label: "Following",
      value: `${users.filter((user) => user.isFollowing).length}`,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-transparent lg:flex-row lg:overflow-hidden">
      <main className="w-full flex-1 bg-transparent lg:h-full lg:overflow-y-auto">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <UsersHeader
            search={search}
            onSearch={handleSearch}
            overviewStats={overviewStats}
          />
          <UsersGrid
            loading={loading}
            users={users}
            onToggleFollow={handleToggleFollow}
          />
        </div>
      </main>
      <UsersSidebar />
    </div>
  );
}
