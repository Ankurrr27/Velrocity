import Link from "next/link";
import { Globe, Link2, MessageSquare } from "lucide-react";

export default function Footer() {
  const socialIcons = {
    github: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  };
  return (
    <footer className="relative bg-[#050505] overflow-hidden border-t border-white/[0.05] pt-32 pb-10">
      {/* Footer Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-indigo-500 to-blue-600 p-[1px] shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)]">
                <div className="w-full h-full bg-zinc-950 rounded-xl flex items-center justify-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-white font-black text-lg">V</span>
                </div>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">Velrocity</span>
            </div>
            
            <p className="text-zinc-400 text-sm md:text-base font-medium max-w-sm leading-relaxed">
              The elite productivity OS for the modern developer. Track habits, sync platforms, and architect unstoppable consistency.
            </p>
            
            <div className="flex items-center gap-3">
              <Link href="#" className="w-10 h-10 rounded-full border border-white/[0.05] bg-white/[0.01] flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] transition-all duration-300">{socialIcons.github}</Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/[0.05] bg-white/[0.01] flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] transition-all duration-300">{socialIcons.twitter}</Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/[0.05] bg-white/[0.01] flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] transition-all duration-300">{socialIcons.linkedin}</Link>
            </div>
          </div>

          {/* LINKS COLUMNS */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 md:gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Product</h4>
              <ul className="space-y-4 text-[13px] font-bold text-zinc-500">
                <li><Link href="#" className="hover:text-indigo-400 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-indigo-400 transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-indigo-400 transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Company</h4>
              <ul className="space-y-4 text-[13px] font-bold text-zinc-500">
                <li><Link href="#" className="hover:text-indigo-400 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-indigo-400 transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-indigo-400 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          {/* SYSTEM STATUS */}
          <div className="md:col-span-3">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">System</h4>
             <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative bg-zinc-950/80 backdrop-blur-xl rounded-[15px] p-5">
                   <div className="border border-white/5 rounded-lg p-3 bg-white/[0.02]">
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 block mb-2">Network Status</span>
                     <div className="flex items-center gap-2.5">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[11px] font-bold text-white">All Systems Operational</span>
                     </div>
                   </div>
                   <p className="mt-4 text-xs font-medium italic text-zinc-500 border-l-2 border-indigo-500/40 pl-3">
                     "Dedicated to the non-stop builders."
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* GIANT WORDMARK */}
        <div className="w-full relative flex items-center justify-center overflow-hidden pointer-events-none select-none mb-12">
          <h1 
            className="text-[13vw] font-black tracking-[-0.04em] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.04] to-transparent"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}
          >
            VELROCITY
          </h1>
        </div>

        {/* BOTTOM METADATA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/[0.05] pt-8">
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
             © 2026 VELROCITY INC. ALL RIGHTS RESERVED.
           </p>
           <div className="flex gap-8">
             <Link href="#" className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">Terms of Service</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
