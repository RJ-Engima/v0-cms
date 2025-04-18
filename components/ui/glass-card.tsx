"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
  borderGlow?: boolean
  hoverEffect?: boolean
  animate?: boolean
  delay?: number
}

export function GlassCard({
  children,
  className,
  intensity = "medium",
  borderGlow = false,
  hoverEffect = true,
  animate = true,
  delay = 0,
  ...props
}: GlassCardProps) {
  // Define glass effect based on intensity
  const getGlassStyles = () => {
    const baseStyles = "rounded-xl border backdrop-blur-md"

    // Light theme styles
    const lightStyles = {
      low: "bg-white/70 border-slate-200/70",
      medium: "bg-white/80 border-slate-200/80",
      high: "bg-white/90 border-slate-200/90",
    }

    // Dark theme styles
    const darkStyles = {
      low: "dark:bg-slate-900/30 dark:border-slate-800/50",
      medium: "dark:bg-slate-900/50 dark:border-slate-800/50",
      high: "dark:bg-slate-900/70 dark:border-slate-800/70",
    }

    return cn(baseStyles, lightStyles[intensity], darkStyles[intensity])
  }

  // Define glow effect
  const getGlowStyles = () => {
    if (!borderGlow) return ""

    return "shadow-[0_0_15px_rgba(203,213,225,0.3)] dark:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
  }

  // Define hover effect
  const getHoverStyles = () => {
    if (!hoverEffect) return ""

    return "transition-all duration-300 hover:bg-white/90 hover:border-slate-300/90 hover:shadow-md dark:hover:bg-slate-900/70 dark:hover:border-slate-700/70 dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
  }

  return (
    <motion.div
      className={cn(getGlassStyles(), getGlowStyles(), getHoverStyles(), className)}
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
