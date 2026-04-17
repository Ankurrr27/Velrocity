'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import { ArrowRight, CheckCircle2, User, Mail, Lock, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-zinc-900 dark:text-white flex-1">
      {/* BACKGROUND DECOR */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_420px]">
        {/* LEFT: Branding Section */}
        <div className="hidden lg:block space-y-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-zinc-500 backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/60">
              <UserPlus size={12} className="text-[rgb(var(--primary))]" />
              Create your account
            </div>
            <h1 className="text-6xl font-extrabold leading-[1.05] tracking-tight">
              Build habits that <br />
              <span className="text-[rgb(var(--primary))]">actually stick.</span>
            </h1>
            <p className="text-lg font-medium leading-relaxed text-zinc-500 max-w-xl">
              Track daily habits, auto-sync your coding platforms, and see your progress over time — all in one place.
            </p>
          </motion.div>

          <div className="space-y-5 max-w-lg">
             {[
               { title: "Auto-sync platforms", desc: "Link GitHub, LeetCode, and Codeforces automatically." },
               { title: "Weekly clarity", desc: "Clear visibility over your weekly habits and goals." },
               { title: "Community", desc: "Connect with other driven people and stay accountable." }
             ].map(i => (
               <div key={i.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-[rgba(var(--primary),0.08)] text-[rgb(var(--primary))] flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-zinc-800 dark:text-zinc-100">{i.title}</h3>
                    <p className="text-sm text-zinc-500">{i.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* RIGHT: Register Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="relative"
        >
          <form
            onSubmit={handleSubmit}
            className="surface-card p-8 lg:p-10 space-y-5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[rgba(var(--primary),0.1)] backdrop-blur-2xl"
          >
            <div className="space-y-1">
               <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-[rgb(var(--primary))] transition-all">
                  <ArrowRight size={12} className="rotate-180" />
                  Back to home
               </Link>
               <h2 className="text-2xl font-bold tracking-tight pt-1">Create account</h2>
               <p className="text-[12px] text-zinc-500">Fill in your details to get started.</p>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[12px] font-medium text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-zinc-500 pl-1">Full name</label>
                     <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[rgb(var(--primary))] transition-colors" size={16} />
                        <input name="name" required placeholder="Your name" className="w-full bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-[rgb(var(--primary))] rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium transition-all outline-none" />
                     </div>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-zinc-500 pl-1">Username</label>
                     <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-semibold text-sm">@</span>
                        <input name="username" required placeholder="username" className="w-full bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-[rgb(var(--primary))] rounded-2xl py-3.5 pl-9 pr-4 text-sm font-medium transition-all outline-none" />
                     </div>
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 pl-1">Email</label>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[rgb(var(--primary))] transition-colors" size={16} />
                     <input name="email" type="email" required placeholder="you@example.com" className="w-full bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-[rgb(var(--primary))] rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium transition-all outline-none" />
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 pl-1">Password</label>
                  <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[rgb(var(--primary))] transition-colors" size={16} />
                     <input name="password" type="password" required placeholder="Min 8 characters" className="w-full bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-[rgb(var(--primary))] rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium transition-all outline-none" />
                  </div>
               </div>
            </div>

            <button
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl text-sm font-bold shadow-2xl shadow-[rgba(var(--primary),0.3)] disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-100 dark:bg-white/5" />
              <span className="text-xs font-medium text-zinc-400">or</span>
              <div className="h-px flex-1 bg-zinc-100 dark:bg-white/5" />
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-200 py-3.5 text-sm font-medium transition-all hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <div className="pt-2 border-t border-zinc-100 dark:border-white/5 text-center">
               <p className="text-[12px] text-zinc-500">
                 Already have an account? <Link href="/login" className="text-[rgb(var(--primary))] font-semibold hover:underline underline-offset-4">Sign in →</Link>
               </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
