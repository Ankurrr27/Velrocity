'use client';

import { Zap, Shield, BarChart3, Globe, ZapIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Auto-Sync Platforms",
    description: "Connect your GitHub, LeetCode, and Codeforces accounts. We'll automatically track your daily coding activity.",
    icon: <Globe className="text-blue-500" size={24} />,
    color: "blue"
  },
  {
    title: "Habit Momentum",
    description: "Build streaks and maintain consistency with our momentum-based habit tracking system.",
    icon: <Zap className="text-amber-500" size={24} />,
    color: "amber"
  },
  {
    title: "Deep Analytics",
    description: "Visualize your progress with beautiful heatmaps and detailed performance metrics.",
    icon: <BarChart3 className="text-purple-500" size={24} />,
    color: "purple"
  },
  {
    title: "Private & Secure",
    description: "Your data is yours. We use industry-standard encryption to keep your credentials and progress safe.",
    icon: <Shield className="text-emerald-500" size={24} />,
    color: "emerald"
  },
  {
    title: "Smart Notifications",
    description: "Get gentle nudges when you're about to lose a streak, keeping you accountable every day.",
    icon: <ZapIcon className="text-pink-500" size={24} />,
    color: "pink"
  },
  {
    title: "Pro Insights",
    description: "Artificial intelligence analyzes your patterns to suggest the best times for you to focus.",
    icon: <Sparkles className="text-indigo-500" size={24} />,
    color: "indigo"
  }
];

export default function Features() {
  return (
    <section className="py-24 px-5 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background ambient glow for Features section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none -z-10" />

      <div className="text-center space-y-4 mb-16 relative">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
          Everything you need to <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">master your growth.</span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto font-medium text-sm md:text-base leading-relaxed">
          Velrocity combines automated tracking with intuitive design to help you focus on actually making progress.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 p-8 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.3)] backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
               {feature.icon && (
                 <feature.icon.type {...feature.icon.props} size={22} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
               )}
            </div>
            <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-100 group-hover:text-indigo-300 transition-colors mb-3">
              {feature.title}
            </h3>
            <p className="text-zinc-400 text-[13px] font-medium leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
