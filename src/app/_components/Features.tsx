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
    <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tighter">
          Everything you need to <br/> 
          <span className="text-orange-500">master your growth.</span>
        </h2>
        <p className="text-zinc-500 max-w-xl mx-auto font-medium text-sm">
          Velrocity combines automated tracking with intuitive design to help you focus on actually making progress.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="surface-card p-6 md:p-8 group hover:border-orange-500/20 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 border border-orange-500/20 group-hover:scale-110 transition-transform text-orange-500">
               {feature.icon && (
                 <feature.icon.type {...feature.icon.props} size={20} className="text-orange-500" />
               )}
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-orange-500 transition-colors">
              {feature.title}
            </h3>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed mt-2">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
