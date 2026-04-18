'use client';

import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import MockUI from "@/app/_components/MockUI";
import Features from "@/app/_components/Features";
import Footer from "@/app/_components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="dark min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-sans antialiased overflow-x-hidden">
      
      {/* PROFESSIONAL BACKGROUND LAYER */}
      <div className="fixed inset-0 mesh-gradient -z-10" />
      
      {/* DOT GRID */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-600/[0.05] rounded-full blur-[140px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[140px]" />
      </div>

      <Navbar />

      <main className="relative pt-24 md:pt-32 pb-12">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-32">
          <Hero />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center lg:justify-end mt-10 lg:mt-0 relative z-20"
          >
            <div className="relative">
               {/* Ambient glow behind mockup */}
               <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] -z-10 rounded-full animate-pulse" />
               <MockUI />
            </div>
          </motion.div>
        </section>

        {/* TRUST / SOCIAL PROOF STRIP */}
        <div className="border-y border-white/[0.03] py-8 md:py-12 mb-20 md:mb-32 relative z-10 bg-white/[0.01] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 text-center mb-8 opacity-60">Engineered for industry standards</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 ease-in-out cursor-default">
              {['Google', 'Meta', 'Amazon', 'Netflix', 'Microsoft'].map(company => (
                <span key={company} className="text-xl md:text-3xl font-black tracking-tighter hover:text-indigo-400 transition-colors uppercase italic">{company}</span>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <Features />

        {/* TESTIMONIAL / QUOTE */}
        <section className="py-20 md:py-32 px-5 md:px-8 max-w-5xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative glass-premium p-12 md:p-20 border border-white/5 overflow-hidden rounded-[3rem]"
           >
              {/* background accent for testimonial */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <span className="text-8xl md:text-[12rem] absolute top-2 left-6 text-indigo-500/10 font-black leading-none select-none italic tracking-tighter">"</span>
              
              <h2 className="text-2xl md:text-4xl font-black leading-[1.15] tracking-tight text-white/95 relative z-10 mb-12 max-w-4xl mx-auto">
                Velrocity completely changed how I track my coding progress. It's not just a tracker, it's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">the ultimate momentum engine</span>.
              </h2>
              
              <div className="relative z-10 flex items-center justify-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-950 border border-white/10 flex items-center justify-center shadow-2xl relative">
                  <span className="text-sm font-black text-white/90">AR</span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#050505]" />
                </div>
                <div className="text-left">
                  <p className="font-black text-lg text-zinc-100 leading-none mb-1">Alex Rivers</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500/90">Fullstack Architect @ Stealth</p>
                </div>
              </div>
           </motion.div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-24 px-5 md:px-8 mb-20 w-full flex justify-center">
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="w-full max-w-6xl rounded-[3rem] border border-white/5 bg-gradient-to-br from-indigo-600/20 via-[#0a0a0a] to-[#050505] p-12 md:p-24 text-center shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)] overflow-hidden relative"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
            
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 text-white relative z-10 leading-[0.9]">
              Start your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 italic">acceleration.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-xl font-medium mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Join the elite circle of developers who prioritize deep-work consistency over burnout intensity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
               <a href="/register" className="group px-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.25em] rounded-2xl transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_25px_50px_-10px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95">
                 Launch Engine
               </a>
               <a href="/login" className="px-10 py-5 border border-white/10 hover:border-white/30 text-white text-[11px] font-black uppercase tracking-[0.25em] rounded-2xl transition-all">
                 Operator Login
               </a>
            </div>
            
            {/* Visual bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}