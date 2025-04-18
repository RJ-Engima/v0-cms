"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  intensity?: "low" | "medium" | "high"
  borderGlow?: boolean
  hoverEffect?: boolean
}

export function GlassCard({
  children,
  className,
  delay = 0,
  intensity = "medium",
  borderGlow = false,
  hoverEffect = false,
}: GlassCardProps) {
  const intensityClasses = {
    low: "bg-white/5 dark:bg-white/5 backdrop-blur-sm",
    medium: "bg-white/10 dark:bg-white/5 backdrop-blur-md",
    high: "bg-white/20 dark:bg-white/10 backdrop-blur-lg",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        intensityClasses[intensity],
        borderGlow ? "border-white/30 dark:border-white/20" : "border-white/10 dark:border-white/5",
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:border-white/30 dark:hover:border-white/20",
        className,
      )}
    >
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

      <div className="relative z-20">{children}</div>
    </motion.div>
  )
}
