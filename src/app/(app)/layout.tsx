import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full min-h-screen w-full overflow-hidden bg-transparent text-zinc-900 dark:text-zinc-50 transition-colors">
      <Sidebar />

      <main className="flex h-full min-h-screen min-w-0 flex-1 flex-col overflow-hidden border-l border-white/30 pb-24 md:ml-[72px] md:pb-0 dark:border-white/5">
        <div className="flex h-full min-h-0 w-full flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
