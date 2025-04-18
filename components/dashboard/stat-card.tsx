"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    label: string
    positive: boolean
  }
  className?: string
  delay?: number
  glassEffect?: boolean
  colorScheme?: "blue" | "purple" | "green" | "amber" | "teal" | "rose" | "cyan" | "slate" | "custom"
  customGradient?: string
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  className,
  delay = 0,
  glassEffect = false,
  colorScheme = "blue",
  customGradient,
}: StatCardProps) {
  // Define color schemes
  const colorSchemes = {
    blue: "from-blue-400/90 to-indigo-500/90 dark:from-blue-500/80 dark:to-indigo-600/80",
    purple: "from-violet-400/90 to-fuchsia-500/90 dark:from-violet-500/80 dark:to-fuchsia-600/80",
    green: "from-emerald-400/90 to-teal-500/90 dark:from-emerald-500/80 dark:to-teal-600/80",
    amber: "from-amber-400/90 to-orange-500/90 dark:from-amber-500/80 dark:to-orange-600/80",
    teal: "from-teal-400/90 to-cyan-500/90 dark:from-teal-500/80 dark:to-cyan-600/80",
    rose: "from-rose-400/90 to-pink-500/90 dark:from-rose-500/80 dark:to-pink-600/80",
    cyan: "from-cyan-400/90 to-sky-500/90 dark:from-cyan-500/80 dark:to-sky-600/80",
    slate: "from-slate-400/90 to-zinc-500/90 dark:from-slate-500/80 dark:to-zinc-600/80",
    custom: customGradient || "from-blue-400/90 to-indigo-500/90 dark:from-blue-500/80 dark:to-indigo-600/80",
  }

  const gradientClass = colorSchemes[colorScheme]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        glassEffect
          ? "backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-xl"
          : `bg-gradient-to-br ${gradientClass} text-white shadow-lg`,
        className,
      )}
    >
      {/* Decorative elements */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[100%] z-10 h-[500%] w-[200%] rotate-45 bg-gradient-to-t from-transparent via-white/5 to-transparent"
          animate={{ left: ["0%", "100%"] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
            delay: delay + 1,
          }}
        />
      </div>

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span className={cn("flex items-center gap-0.5", trend.positive ? "text-emerald-200" : "text-rose-200")}>
                {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="ml-1 text-white/60">{trend.label}</span>
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">{icon}</div>
      </div>
    </motion.div>
  )
}
