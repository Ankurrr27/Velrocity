'use client';

import {
  Globe,
  Download,
  ExternalLink,
  Puzzle,
  ShieldCheck,
  Terminal,
  Zap,
  Key,
  Copy,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getExtensionToken } from "@/app/actions/authActions";

const packageHref = "https://github.com/Ankurrr27/Velrocity-Extension/archive/refs/heads/main.zip";
const releaseHref = "https://github.com/Ankurrr27/Velrocity-Extension";

const tabs = [
  { id: "install", label: "Installation" },
  { id: "spec", label: "Package Spec" },
  { id: "connect", label: "Connectivity" },
];

const features = [
  {
    icon: <Puzzle size={18} />,
    title: "Panel Workflow",
    description: "Keeps the extension open alongside your browser.",
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Date Sync",
    description: "Synced with your local timezone for the same daily reset.",
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    icon: <Zap size={18} />,
    title: "Instant Toggle",
    description: "Mark habits done directly from the side panel.",
    color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
];

const steps = [
  { step: "01", text: "Download the extension package from the link on the right." },
  { step: "02", text: "Extract the archive into a dedicated folder." },
  { step: "03", text: "Open chrome://extensions in your browser." },
  { step: "04", text: "Enable Developer mode in the top-right corner." },
  { step: "05", text: "Choose Load unpacked and select the extracted folder." },
  { step: "06", text: "Pin the extension and open the side panel." },
];

const specs = [
  ["Package", "velrocity-extension.zip"],
  ["Version", "1.2.0 Alpha"],
  ["Architecture", "Manifest V3 + Side Panel"],
  ["Transport", "HTTPS / JSON Sync"],
  ["Source", "Open Source"],
  ["License", "Personal Use"],
];

export default function ExtensionPage() {
  const [activeTab, setActiveTab] = useState("install");

  return (
    <div className="flex h-full w-full flex-col lg:flex-row lg:overflow-hidden bg-transparent">
      
      {/* Sidebar Info */}
      <aside className="w-full lg:w-[360px] lg:shrink-0 border-r border-zinc-200 dark:border-white/5 p-6 lg:p-10 space-y-10 overflow-y-auto">
        <header className="space-y-4">
           <div className="flex items-center gap-2">
              <Globe size={14} className="text-[rgb(var(--primary))]" />
              <span className="label-elite uppercase text-[rgb(var(--primary))]">Browser Extension</span>
           </div>
           <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Side Panel</h1>
           <p className="text-sm text-zinc-500 font-medium leading-relaxed">
             Velrocity stays close to your browser flow so habits and tasks are always one panel away.
           </p>
        </header>

        <div className="flex flex-col gap-3">
           <a
             href={releaseHref}
             target="_blank"
             rel="noreferrer"
             className="w-full py-4 rounded-2xl bg-[rgb(var(--primary))] text-white text-[11px] font-extrabold tracking-[0.15em] uppercase flex items-center justify-center gap-2 shadow-xl shadow-[rgba(var(--primary),0.2)] hover:opacity-90 transition-all"
           >
             <ExternalLink size={14} strokeWidth={3} />
             GitHub Release
           </a>
            <a
              href={packageHref}
              className="w-full py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-[11px] font-extrabold tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
            >
              <Download size={14} strokeWidth={3} />
              Download v1.2.0 (.zip)
            </a>
            <p className="text-[10px] text-zinc-400 font-medium text-center px-4 leading-relaxed">
               Refer to our <a href={releaseHref} className="underline text-[rgb(var(--primary))] font-bold" target="_blank" rel="noreferrer">GitHub Repository</a> for the latest features and stable releases.
            </p>
        </div>

        <div className="space-y-6 pt-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4 p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-transparent hover:border-zinc-200 transition-all">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${feature.color} shadow-sm`}>
                {feature.icon}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {feature.title}
                </p>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden bg-white dark:bg-transparent">
        <div className="shrink-0 px-6 pt-6 lg:px-12 lg:pt-10">
           <div className="segmented-control flex w-full max-w-md">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`segmented-tab flex-1 ${activeTab === tab.id ? "segmented-tab-active" : ""}`}
               >
                 {tab.label}
               </button>
             ))}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <AnimatePresence mode="wait">
            {activeTab === "install" && (
              <motion.div
                key="install"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="max-w-2xl space-y-10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Installation Phase</h2>
                    <p className="label-elite uppercase text-zinc-400">Operational Readiness in 60s</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {steps.map((item) => (
                    <div key={item.step} className="flex items-start gap-6 p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-white/5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 text-sm font-bold text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-100 dark:border-white/5">
                        {item.step}
                      </span>
                      <p className="text-sm font-semibold leading-relaxed text-zinc-600 dark:text-zinc-400 pt-2.5">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "connect" && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="max-w-2xl space-y-10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                    <Key size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Extension Key</h2>
                    <p className="label-elite uppercase text-zinc-400">Secure Handshake Protocol</p>
                  </div>
                </div>

                <div className="surface-card p-10 space-y-6">
                  <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                    This personal token identifies your account within the Velrocity Chrome Extension. 
                    Keep it secret and paste it into the "Authentication Token" field in the extension settings.
                  </p>
                  
                  <TokenDisplay />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function TokenDisplay() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getExtensionToken().then(res => {
      setToken(res);
      setLoading(false);
    });
  }, []);

  const handleCopy = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="h-14 w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
    );
  }

  if (!token) {
    return (
      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold flex items-center justify-between">
        <span>Identity verification failed. Please login to reveal your key.</span>
        <a href="/login" className="underline font-bold">Login</a>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="w-full h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-6 flex items-center overflow-hidden border border-zinc-200 dark:border-white/5">
        <code className="text-xs font-mono text-[rgb(var(--primary))] truncate pr-16 select-all">
          {token}
        </code>
      </div>
      <button 
        onClick={handleCopy}
        className="absolute right-2 top-2 h-10 px-4 rounded-xl bg-[rgb(var(--primary))] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-lg"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy Key"}
      </button>
    </div>
  );
}
