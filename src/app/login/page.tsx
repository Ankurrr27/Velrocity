'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";

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
    <main className="min-h-screen bg-white text-slate-950 dark:bg-[#070b14] dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-[1fr_440px]">
        <section className="relative hidden overflow-hidden border-r border-slate-200/80 bg-slate-50 px-10 py-10 dark:border-white/5 dark:bg-[#0b0f19] lg:flex lg:flex-col">
          <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">V</span>
            Velrocity
          </Link>

          <div className="flex flex-1 items-center">
            <div className="max-w-2xl space-y-8">
              <div className="space-y-4">
                <div className="stat-pill w-fit text-blue-600 dark:text-blue-300">
                  <ShieldCheck size={14} />
                  <span className="text-xs font-semibold">Secure momentum workspace</span>
                </div>
                <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-normal text-slate-950 dark:text-white">
                  Resume your execution system.
                </h1>
                <p className="max-w-lg text-base text-slate-500 dark:text-slate-400">
                  Track habits, developer activity, and daily focus from one clean operating surface.
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-[1fr_0.72fr] gap-4">
                <div className="surface-card p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="label-elite">Live today</span>
                    <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-300">82%</span>
                  </div>
                  <div className="space-y-3">
                    {["Ship dashboard polish", "Code review block", "30 min DSA"].map((item, index) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/[0.03]">
                        <div className={`h-3 w-3 rounded-full ${index === 0 ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`} />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    { label: "Streak", value: "24d", icon: CheckCircle2 },
                    { label: "Level", value: "860", icon: BarChart3 },
                  ].map((item) => (
                    <div key={item.label} className="surface-card p-4">
                      <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                        <item.icon size={17} />
                      </div>
                      <p className="text-2xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
                      <p className="text-xs font-medium text-slate-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <form onSubmit={handleSubmit} className="surface-card w-full max-w-[420px] space-y-6 p-6 sm:p-8">
            <div className="space-y-3">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600">
                <ArrowRight size={14} className="rotate-180" />
                Back to home
              </Link>
              <div>
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Welcome back</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Enter your credentials to continue.</p>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-500">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Email or username</span>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="input-shell pl-10"
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                    className="input-shell pl-10 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-blue-600"
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

            <div className="flex items-center gap-4">
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
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
