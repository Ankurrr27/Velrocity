'use client';

import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import MockUI from "@/app/_components/MockUI";
import Features from "@/app/_components/Features";
import Footer from "@/app/_components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="dark min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 font-sans antialiased">
      
      {/* PROFESSIONAL DOT GRID */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-orange-500/[0.03] rounded-full blur-[120px]" />
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
        <section className="py-12 md:py-16 px-5 md:px-8 max-w-4xl mx-auto text-center space-y-6">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative"
           >
              <span className="text-4xl md:text-5xl absolute -top-8 -left-2 text-indigo-500/20 font-serif">"</span>
              <h2 className="text-lg md:text-3xl font-black leading-tight tracking-tight text-white/90">
                Velrocity completely changed how I track my coding progress. It's not just a tracker, it's a momentum engine.
              </h2>
              <div className="pt-4">
                <p className="font-bold text-sm md:text-base text-indigo-400">Alex Rivers</p>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500">Fullstack Developer @ Stealth</p>
              </div>
           </motion.div>
        </section>

        {/* CALL TO ACTION */}
       
      </main>

      <Footer />
    </div>
  );
}