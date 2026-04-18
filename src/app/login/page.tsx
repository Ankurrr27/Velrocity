'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      console.log("[LoginUI] Response status:", res.status);
      if (res.ok) {
        console.log("[LoginUI] success, redirecting to /dashboard");
        router.push('/dashboard');
        // Fallback if push fails
        setTimeout(() => {
          if (window.location.pathname === '/login') {
            console.log("[LoginUI] Push might have failed, forcing window.location");
            window.location.href = '/dashboard';
          }
        }, 1000);
      } else {
        const data = await res.json();
        console.warn("[LoginUI] error from API:", data.error);
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError("Network error. Verify connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white flex-1 dark">
      {/* BACKGROUND DECOR */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
        
        {/* DOT GRID */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* GIANT WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none opacity-20">
          <motion.h1 
              animate={{ 
                x: [0, 20, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="text-[20vw] font-black tracking-[-0.04em] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.04] to-transparent"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.02)' }}>
            ACCESS
          </motion.h1>
        </div>
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-[1.1fr_420px]">
        {/* LEFT: Branding Section */}
        <div className="hidden lg:block space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 backdrop-blur-md">
              <Sparkles size={12} className="animate-pulse" />
              Welcome back to elite
            </div>
            <h1 className="text-7xl font-black leading-[0.95] tracking-tight text-white">
              Pick up where <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">you left off.</span>
            </h1>
            <p className="text-lg font-medium leading-relaxed text-zinc-400 max-w-xl">
              Sync your habits, analyze your momentum, and architect unstoppable consistency with the world's most focused productivity OS.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-lg">
            {[
              { title: "Real-time Momentum", desc: "Your streaks are updated live across all your connected devices.", icon: <CheckCircle2 size={18} /> },
              { title: "Deep Analytics", desc: "Review your coding performance with enterprise-grade data visualization.", icon: <Sparkles size={18} /> },
              { title: "Universal Sync", desc: "Seamlessly integrate with GitHub, LeetCode, and Codeforces.", icon: <Globe size={18} /> },
            ].map((item, idx) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex gap-5 items-start bg-white/[0.02] border border-white/5 p-5 rounded-2xl hover:bg-white/[0.04] transition-colors"
              >
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Login Core */}
        <motion.div 
          initial={{ opacity: 0, x: 20, y: 20 }} 
          animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
          transition={{ 
             opacity: { duration: 0.5 },
             x: { duration: 0.5 },
             y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative max-w-[420px] w-full mx-auto lg:max-w-none"
        >
          {/* Ground shadow for float effect */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[20px] rounded-[100%] bg-black/60 blur-xl -z-10" />

          <form
            onSubmit={handleSubmit}
            className="group relative rounded-[2rem] p-8 lg:p-10 space-y-6 border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all hover:border-indigo-500/20"
          >
            {/* Ambient hover glow inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="space-y-3 relative z-10">
               <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-semibold text-zinc-500 hover:text-[rgb(var(--primary))] transition-all">
                  <ArrowRight size={12} className="rotate-180" />
                  Back to home
               </Link>
               <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
               </div>
               <p className="text-[12px] text-zinc-500">Enter your credentials to sign in.</p>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-[12px] font-medium text-center">
                {error}
              </div>
            )}

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-500 pl-1">Email or username</label>
                   <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[rgb(var(--primary))] transition-colors" size={16} />
                     <input
                       value={identifier}
                       onChange={(e) => setIdentifier(e.target.value)}
                       required
                       placeholder="Email or User Name..."
                       className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-indigo-500/50 focus:bg-white/[0.02] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all outline-none text-white placeholder-zinc-600"
                     />
                  </div>
               </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-500 pl-1">Password</label>
                   <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[rgb(var(--primary))] transition-colors" size={16} />
                     <input
                       type={showPassword ? "text" : "password"}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                       placeholder="Direct entry code..."
                       className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:border-indigo-500/50 focus:bg-white/[0.02] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all outline-none text-white placeholder-zinc-600"
                     />
                     <button
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[rgb(var(--primary))] transition-colors"
                     >
                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                     </button>
                  </div>
               </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] hover:shadow-[0_0_50px_-5px_rgba(99,102,241,0.8)] disabled:opacity-50 transition-all duration-300 relative z-10"
            >
              <span className="relative z-10">{loading ? "Authenticating..." : "Initialize Session"}</span>
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-zinc-100 dark:bg-white/5" />
              <span className="label-elite uppercase text-zinc-400">OR</span>
              <div className="h-px flex-1 bg-zinc-100 dark:bg-white/5" />
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex w-full items-center justify-center gap-3 rounded-[1rem] border border-white/10 bg-white/[0.02] py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white/[0.06] hover:border-white/20 text-zinc-300 hover:text-white relative z-10"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="pt-4 border-t border-zinc-100 dark:border-white/5 text-center">
               <p className="text-[12px] text-zinc-500">
                 Don't have an account? <Link href="/register" className="text-[rgb(var(--primary))] font-semibold hover:underline underline-offset-4">Sign up →</Link>
               </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
