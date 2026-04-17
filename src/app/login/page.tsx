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
    <div className="relative min-h-screen overflow-hidden bg-transparent text-zinc-900 dark:text-white flex-1">
      {/* BACKGROUND DECOR */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_400px]">
        {/* LEFT: Branding Section */}
        <div className="hidden lg:block space-y-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col gap-1">
               <span className="text-xs font-semibold tracking-widest text-[rgb(var(--primary))] uppercase">Velrocity</span>
               <h2 className="text-4xl font-extrabold border-none p-0 bg-transparent text-zinc-900 dark:text-zinc-50 tracking-tight">
                 Pick up where you <span className="text-[rgb(var(--primary))]">left off.</span>
               </h2>
            </div>
            <p className="max-w-xl font-medium text-zinc-500 dark:text-zinc-400">
               Log in to sync your habits, track progress, and keep your streaks alive.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 max-w-xl">
            {[
              { text: "Dashboard Intel", icon: <CheckCircle2 size={16} /> },
              { text: "Weekly Sync", icon: <CheckCircle2 size={16} /> },
              { text: "Platform Auth", icon: <Globe size={16} /> },
              { text: "Credential XP", icon: <Sparkles size={16} /> },
            ].map(b => (
              <div key={b.text} className="surface-card p-6 flex items-center gap-4 group transition-all hover:translate-x-1">
                 <div className="w-8 h-8 rounded-xl bg-[rgba(var(--primary),0.05)] text-[rgb(var(--primary))] flex items-center justify-center group-hover:bg-[rgb(var(--primary))] group-hover:text-white transition-all">
                   {b.icon}
                 </div>
                 <span className="label-elite leading-none text-zinc-400 group-hover:text-zinc-100">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Login Core */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="relative"
        >
          <form
            onSubmit={handleSubmit}
            className="surface-card p-8 lg:p-10 space-y-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[rgba(var(--primary),0.1)] backdrop-blur-2xl"
          >
            <div className="space-y-2">
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
                       className="w-full bg-zinc-100 dark:bg-zinc-950 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[rgb(var(--primary))] transition-all outline-none"
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
                       className="w-full bg-zinc-100 dark:bg-zinc-950 border-none rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:ring-2 focus:ring-[rgb(var(--primary))] transition-all outline-none"
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
              className="btn-primary w-full py-4 rounded-2xl text-sm font-bold shadow-2xl shadow-[rgba(var(--primary),0.3)] disabled:opacity-50 group overflow-hidden relative"
            >
              <span className="relative z-10">{loading ? "Signing in..." : "Sign in"}</span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 group-hover:h-full transition-all duration-300" />
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-zinc-100 dark:bg-white/5" />
              <span className="label-elite uppercase text-zinc-400">OR</span>
              <div className="h-px flex-1 bg-zinc-100 dark:bg-white/5" />
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex w-full items-center justify-center gap-3 rounded-[2.5rem] border border-zinc-200 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
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
