'use client';

import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import MockUI from "@/app/_components/MockUI";
import Features from "@/app/_components/Features";
import Footer from "@/app/_components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="dark min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-sans antialiased">
      
      {/* PROFESSIONAL DOT GRID */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative pt-16 md:pt-24 pb-12">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 md:gap-12 items-center mb-12 md:mb-16">
          <Hero />
          <div className="flex justify-center lg:justify-end mt-10 lg:mt-0">
            <div className="scale-90 sm:scale-100 origin-center transition-transform">
              <MockUI />
            </div>
          </div>
        </section>

        {/* TRUST / SOCIAL PROOF STRIP */}
        <div className="border-y border-white/5 py-5 md:py-6 mb-12 md:mb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-500 text-center mb-4">Trusted by developers from</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              {['Google', 'Meta', 'Amazon', 'Netflix', 'Microsoft'].map(company => (
                <span key={company} className="text-base md:text-xl font-black tracking-tighter">{company}</span>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <Features />

        {/* TESTIMONIAL / QUOTE */}
        <section className="py-12 md:py-20 px-5 md:px-8 max-w-4xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative surface-card p-10 md:p-14 border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden rounded-[2rem]"
           >
              {/* background accent for testimonial */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <span className="text-6xl md:text-8xl absolute top-4 left-6 text-indigo-500/10 font-serif leading-none select-none">"</span>
              
              <h2 className="text-xl md:text-3xl font-black leading-tight tracking-tight text-white/90 relative z-10 mb-8 max-w-3xl mx-auto">
                Velrocity completely changed how I track my coding progress. It's not just a tracker, it's a <span className="text-indigo-400">momentum engine</span>.
              </h2>
              
              <div className="relative z-10 flex items-center justify-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 border-2 border-indigo-500/30 flex items-center justify-center shadow-lg">
                  <span className="text-xs font-black text-white/80">AR</span>
                </div>
                <div className="text-left">
                  <p className="font-black text-sm md:text-base text-zinc-100">Alex Rivers</p>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/80">Fullstack Developer @ Stealth</p>
                </div>
              </div>
           </motion.div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-20 px-5 md:px-8 mb-10 w-full flex justify-center">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="w-full max-w-5xl rounded-[2rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-[#050505] to-[#050505] p-10 md:p-16 text-center shadow-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white relative z-10">
              Ready to <span className="text-indigo-500">accelerate?</span>
            </h2>
            <p className="text-zinc-400 font-medium mb-10 max-w-xl mx-auto relative z-10">
              Join thousands of developers prioritizing consistency over intensity. Start tracking your progress today.
            </p>
            
            <a href="/register" className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white text-[12px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(99,102,241,0.8)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,1)] hover:scale-105">
              Launch Velrocity
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}