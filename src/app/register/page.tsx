'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Lock, Mail, Moon, Sun, User } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page flex min-h-screen items-center justify-center bg-white px-4 py-6 text-slate-950 dark:bg-[#111111] dark:text-white sm:px-6 sm:py-8">
      <form onSubmit={handleSubmit} className="surface-card w-full max-w-sm space-y-4 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-orange-600 dark:hover:text-orange-400">
              <ArrowRight size={14} className="rotate-180" />
              Home
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-[rgb(var(--primary))]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
          <h1 className="text-xl font-semibold">Create account</h1>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-500">
            {error}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Full name</span>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input name="name" required placeholder="Your name" className="input-shell input-shell-icon py-2.5" />
            </div>
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Username</span>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">@</span>
              <input name="username" required placeholder="username" className="input-shell input-shell-icon py-2.5" />
            </div>
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Email</span>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input name="email" type="email" required placeholder="you@example.com" className="input-shell input-shell-icon py-2.5" />
          </div>
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input name="password" type="password" required placeholder="At least 8 characters" className="input-shell input-shell-icon py-2.5" />
          </div>
        </label>

        <button disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account..." : "Create account"}
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          <span className="text-xs font-medium text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="btn-secondary w-full normal-case tracking-normal"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-orange-600 hover:underline dark:text-orange-400">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
