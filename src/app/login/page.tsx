'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
        setTimeout(() => {
          if (window.location.pathname === "/login") window.location.href = "/dashboard";
        }, 1000);
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error. Verify connection.");
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
          <h1 className="text-xl font-semibold">Sign in</h1>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-500">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Email or username</span>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder="you@example.com"
                className="input-shell input-shell-icon py-2.5"
              />
            </div>
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="input-shell input-shell-icon input-shell-icon-trailing py-2.5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-orange-600 dark:hover:text-orange-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
        </div>

        <button disabled={loading} className="btn-primary w-full">
          {loading ? "Signing in..." : "Sign in"}
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
          New here?{" "}
          <Link href="/register" className="font-semibold text-orange-600 hover:underline dark:text-orange-400">
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}
