"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressCircleProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  className?: string
  valueClassName?: string
  labelClassName?: string
  showValue?: boolean
  label?: React.ReactNode
  color?: string
  bgColor?: string
  valueFormatter?: (value: number) => string | React.ReactNode
}

export function ProgressCircle({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  className,
  valueClassName,
  labelClassName,
  showValue = true,
  label,
  color = "hsl(var(--primary))",
  bgColor,
  valueFormatter = (value) => `${Math.round(value)}%`,
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progressPercent = (value / max) * 100
  const progressOffset = circumference - (progressPercent / 100) * circumference

  // Default background color that works in both light and dark modes
  const defaultBgColor = bgColor || "rgba(203, 213, 225, 0.2) dark:rgba(255, 255, 255, 0.1)"

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={bgColor || defaultBgColor}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          fill="none"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progressOffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-xl font-semibold", valueClassName)}>{valueFormatter(progressPercent)}</span>
          {label && <span className={cn("text-xs text-slate-500 dark:text-slate-400", labelClassName)}>{label}</span>}
        </div>
      )}
    </div>
  )
}
