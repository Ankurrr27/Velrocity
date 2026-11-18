'use client';

import { useEffect, useState } from "react";
import { Check, Copy, Download, Key, Puzzle } from "lucide-react";
import { getExtensionToken } from "@/app/actions/authActions";

const packageHref = "https://github.com/Ankurrr27/Velrocity-Extension/archive/refs/heads/main.zip";
const steps = [
  "Download and extract the extension.",
  "Open chrome://extensions and turn on Developer mode.",
  "Select Load unpacked and choose the extracted folder.",
];

export default function ExtensionPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getExtensionToken()
      .then(setToken)
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = async () => {
    if (!token) return;
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6 sm:py-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-slate-950 dark:text-white sm:text-2xl">Browser extension</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track habits from Chrome.
        </p>
      </header>

      <div className="space-y-6">
        <section className="border-b border-slate-200 pb-6 dark:border-white/10">
          <div className="mb-4 flex items-center gap-2">
            <Puzzle size={18} className="text-[rgb(var(--primary))]" />
            <h2 className="font-medium text-slate-900 dark:text-white">Install</h2>
          </div>
          <ol className="mb-5 space-y-3">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <a
            href={packageHref}
            className="btn-primary inline-flex h-10 items-center gap-2 px-4"
          >
            <Download size={16} />
            Download extension
          </a>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Key size={18} className="text-[rgb(var(--primary))]" />
            <h2 className="font-medium text-slate-900 dark:text-white">Connect your account</h2>
          </div>
          <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
            Copy your private key into the extension. Keep it secret.
          </p>
          {loading ? (
            <div className="h-10 animate-pulse rounded-lg bg-slate-100 dark:bg-zinc-800" />
          ) : token ? (
            <div className="flex min-w-0 items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-700 dark:bg-zinc-800 dark:text-zinc-200">
                {token}
              </code>
              <button onClick={handleCopy} className="btn-secondary h-10 shrink-0 px-3" aria-label="Copy extension key">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="text-sm">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          ) : (
            <p className="text-sm text-rose-500">
              Sign in to view your key.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
