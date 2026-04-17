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
    <footer className="border-t border-white/5 bg-[#050505] pt-20 pb-10 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-4 col-span-1 md:col-span-1">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">V</span>
              </div>
              <span className="text-xl font-black tracking-tighter">Velrocity</span>
           </div>
           <p className="text-zinc-500 text-sm font-medium">
             The elite productivity OS for the modern developer.
           </p>
           <div className="flex gap-4">
             <Link href="#" className="text-zinc-400 hover:text-[rgb(var(--primary))] transition-colors">{socialIcons.github}</Link>
             <Link href="#" className="text-zinc-400 hover:text-[rgb(var(--primary))] transition-colors">{socialIcons.twitter}</Link>
             <Link href="#" className="text-zinc-400 hover:text-[rgb(var(--primary))] transition-colors">{socialIcons.linkedin}</Link>
           </div>
        </div>

        <div>
           <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Product</h4>
           <ul className="space-y-4 text-sm font-semibold text-zinc-500">
             <li><Link href="#" className="hover:text-[rgb(var(--primary))] transition-colors">Features</Link></li>
             <li><Link href="#" className="hover:text-[rgb(var(--primary))] transition-colors">Integrations</Link></li>
             <li><Link href="#" className="hover:text-[rgb(var(--primary))] transition-colors">Pricing</Link></li>
             <li><Link href="#" className="hover:text-[rgb(var(--primary))] transition-colors">Changelog</Link></li>
           </ul>
        </div>

        <div>
           <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Company</h4>
           <ul className="space-y-4 text-sm font-semibold text-zinc-500">
             <li><Link href="#" className="hover:text-[rgb(var(--primary))] transition-colors">About</Link></li>
             <li><Link href="#" className="hover:text-[rgb(var(--primary))] transition-colors">Contact</Link></li>
             <li><Link href="#" className="hover:text-[rgb(var(--primary))] transition-colors">Privacy</Link></li>
             <li><Link href="#" className="hover:text-[rgb(var(--primary))] transition-colors">Terms</Link></li>
           </ul>
        </div>

        <div>
           <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Built by</h4>
           <p className="text-sm font-semibold text-zinc-500 mb-4 italic">
             "Dedicated to the non-stop builders."
           </p>
           <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-400 block mb-1">Status</span>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-bold">All Systems Operational</span>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-6 border-t border-zinc-200 dark:border-white/5 pt-10">
         <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400">
           © 2026 VELROCITY INC. ALL RIGHTS RESERVED.
         </p>
         <div className="flex gap-8">
           <Link href="#" className="text-[10px] uppercase font-black tracking-widest text-zinc-400 hover:text-[rgb(var(--primary))] transition-colors">Privacy Policy</Link>
           <Link href="#" className="text-[10px] uppercase font-black tracking-widest text-zinc-400 hover:text-[rgb(var(--primary))] transition-colors">Terms of Service</Link>
         </div>
      </div>
    </footer>
  );
}
