'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

type ProgressPoint = {
  date: string;
  progress: number;
};

interface ProgressChartProps {
  loading?: boolean;
  data?: ProgressPoint[];
}

export default function ProgressChart({ loading = false, data = [] }: ProgressChartProps) {
  if (loading) {
    return (
      <div className="h-[340px] w-full flex flex-col gap-4">
        <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
        <div className="flex-1 w-full bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 bg-[length:200%_100%] animate-shimmer rounded-[2rem]" />
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className="h-[340px] w-full flex flex-col items-center justify-center p-8 text-center bg-zinc-50/50 dark:bg-zinc-900/20 rounded-[2rem] border border-dashed border-zinc-200 dark:border-white/5">
        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3 text-zinc-300 dark:text-zinc-600">
           <Zap size={20} fill="currentColor" />
        </div>
        <p className="text-sm font-medium text-zinc-500">No data yet</p>
        <p className="text-[12px] text-zinc-400 mt-1">Complete some habits to see your progress chart.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="h-full w-full flex flex-col"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="shrink-0 mb-4 px-1">
        <span className="text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">Progress over time</span>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(var(--primary))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="rgb(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fontWeight: 700, fill: "#71717a" }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fontSize: 9, fontWeight: 700, fill: "#71717a" }}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                backgroundColor: "rgba(var(--bg-card-rgb, 0,0,0), 0.95)",
                backdropFilter: "blur(12px)",
                color: "inherit",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
              itemStyle={{ fontWeight: "800", fontSize: "11px" }}
              cursor={{ stroke: "rgba(var(--primary-rgb), 0.2)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="rgb(var(--primary))"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorProgress)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
