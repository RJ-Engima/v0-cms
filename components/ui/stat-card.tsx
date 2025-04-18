"use client"

import type * as React from "react"
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
  lightVariant?: boolean
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
  lightVariant = false,
}: StatCardProps) {
  // Define color schemes for dark mode
  const darkColorSchemes = {
    blue: "from-blue-600/90 to-indigo-700/90",
    purple: "from-violet-600/90 to-purple-700/90",
    green: "from-emerald-600/90 to-teal-700/90",
    amber: "from-amber-600/90 to-orange-700/90",
    teal: "from-teal-600/90 to-cyan-700/90",
    rose: "from-rose-600/90 to-pink-700/90",
    cyan: "from-cyan-600/90 to-sky-700/90",
    slate: "from-slate-600/90 to-slate-700/90",
    custom: customGradient || "from-blue-600/90 to-indigo-700/90",
  }

  // Define color schemes for light mode (softer gradients)
  const lightColorSchemes = {
    blue: "from-blue-500/90 to-indigo-600/90",
    purple: "from-violet-500/90 to-purple-600/90",
    green: "from-emerald-500/90 to-teal-600/90",
    amber: "from-amber-500/90 to-orange-600/90",
    teal: "from-teal-500/90 to-cyan-600/90",
    rose: "from-rose-500/90 to-pink-600/90",
    cyan: "from-cyan-500/90 to-sky-600/90",
    slate: "from-slate-500/90 to-slate-600/90",
    custom: customGradient || "from-blue-500/90 to-indigo-600/90",
  }

  const gradientClass = lightVariant ? lightColorSchemes[colorScheme] : darkColorSchemes[colorScheme]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-xl p-6",
        glassEffect
          ? "backdrop-blur-md bg-white/80 border border-slate-200/50 shadow-md dark:bg-slate-900/50 dark:border-slate-800/50 dark:shadow-xl"
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
