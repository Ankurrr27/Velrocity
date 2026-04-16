'use client';

import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import MockUI from "@/app/_components/MockUI";



export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />

      <Navbar />

      <main className="pt-28 pb-20 max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Hero />
        <MockUI />
      </main>
    </div>
  );
}