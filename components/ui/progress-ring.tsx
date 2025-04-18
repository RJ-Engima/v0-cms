"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  className?: string
  label?: string
  sublabel?: string
  delay?: number
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  color = "var(--primary)",
  backgroundColor = "var(--muted)",
  className,
  label,
  sublabel,
  delay = 0,
}: ProgressRingProps) {
  const normalizedValue = Math.min(100, Math.max(0, value))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (normalizedValue / 100) * circumference

  const center = size / 2

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={radius} fill="none" stroke={backgroundColor} strokeWidth={strokeWidth} />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>

      {label && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold">{label}</span>
          {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
        </div>
      )}
    </div>
  )
}
