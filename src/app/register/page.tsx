'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Mail, User, UserPlus } from "lucide-react";

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
    <main className="min-h-screen bg-white text-slate-950 dark:bg-[#070b14] dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-[1fr_460px]">
        <section className="relative hidden overflow-hidden border-r border-slate-200/80 bg-slate-50 px-10 py-10 dark:border-white/5 dark:bg-[#0b0f19] lg:flex lg:flex-col">
          <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">V</span>
            Velrocity
          </Link>

          <div className="flex flex-1 items-center">
            <div className="max-w-2xl space-y-8">
              <div className="space-y-4">
                <div className="stat-pill w-fit text-blue-600 dark:text-blue-300">
                  <UserPlus size={14} />
                  <span className="text-xs font-semibold">Developer-first habit system</span>
                </div>
                <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-normal text-slate-950 dark:text-white">
                  Build a cleaner loop for consistency.
                </h1>
                <p className="max-w-lg text-base text-slate-500 dark:text-slate-400">
                  Create a Velrocity account to track goals, connect your public profile, and keep daily momentum visible.
                </p>
              </div>

              <div className="grid max-w-2xl gap-4">
                <div className="surface-card p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="label-elite">Your first workspace</span>
                    <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-300">Ready</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {["Focus", "Build", "Review"].map((label, index) => (
                      <div key={label} className="rounded-xl border border-slate-200/70 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/[0.03]">
                        <div className={`mb-6 h-2 rounded-full ${index === 0 ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`} />
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">{label}</p>
                        <p className="mt-1 text-xs text-slate-500">{index === 0 ? "Active" : "Queued"}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {["Compact dashboard", "Habit tracking", "Public profile"].map((title) => (
                    <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-white/[0.03]">
                      <CheckCircle2 size={18} className="mb-5 text-blue-600 dark:text-blue-300" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <form onSubmit={handleSubmit} className="surface-card w-full max-w-[440px] space-y-6 p-6 sm:p-8">
            <div className="space-y-3">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600">
                <ArrowRight size={14} className="rotate-180" />
                Back to home
              </Link>
              <div>
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Create account</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Set up your Velrocity workspace.</p>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-500">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Full name</span>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input name="name" required placeholder="Your name" className="input-shell pl-10" />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Username</span>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">@</span>
                  <input name="username" required placeholder="username" className="input-shell pl-9" />
                </div>
              </label>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Email</span>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input name="email" type="email" required placeholder="you@example.com" className="input-shell pl-10" />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input name="password" type="password" required placeholder="Min 8 characters" className="input-shell pl-10" />
              </div>
            </label>

            <button disabled={loading} className="btn-primary w-full">
              {loading ? "Creating account..." : "Create account"}
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
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
