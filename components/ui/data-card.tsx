"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DataCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: {
    value: number
    label?: string
    positive: boolean
  }
  sparkline?: ReactNode
  className?: string
  iconClassName?: string
  valueClassName?: string
  titleClassName?: string
  delay?: number
  children?: ReactNode
  variant?: "default" | "gradient" | "glass" | "outline" | "minimal"
  size?: "sm" | "md" | "lg"
  colorScheme?: "blue" | "purple" | "green" | "amber" | "teal" | "rose" | "cyan" | "indigo" | "lime" | "orange"
}

export function DataCard({
  title,
  value,
  icon,
  trend,
  sparkline,
  className,
  iconClassName,
  valueClassName,
  titleClassName,
  delay = 0,
  children,
  variant = "default",
  size = "md",
  colorScheme = "blue",
}: DataCardProps) {
  const variantStyles = {
    default: "bg-card",
    gradient: `bg-gradient-to-br from-${colorScheme}-500/90 to-${colorScheme}-600/90 text-white dark:from-${colorScheme}-600/90 dark:to-${colorScheme}-700/90`,
    glass: "bg-white/10 backdrop-blur-md border border-white/20 dark:bg-white/5 dark:border-white/10",
    outline: "bg-background border border-border",
    minimal: "bg-transparent",
  }

  const sizeStyles = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  }

  const iconVariantStyles = {
    default: `bg-${colorScheme}-100 text-${colorScheme}-600 dark:bg-${colorScheme}-900/50 dark:text-${colorScheme}-400`,
    gradient: "bg-white/20 text-white",
    glass: `bg-${colorScheme}-500/20 text-${colorScheme}-600 dark:bg-${colorScheme}-500/30 dark:text-${colorScheme}-400`,
    outline: `bg-${colorScheme}-100 text-${colorScheme}-600 dark:bg-${colorScheme}-900/50 dark:text-${colorScheme}-400`,
    minimal: `bg-${colorScheme}-100 text-${colorScheme}-600 dark:bg-${colorScheme}-900/50 dark:text-${colorScheme}-400`,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-xl shadow-sm",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {variant === "gradient" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10" />
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
      )}

      <div className="relative flex items-start justify-between">
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              variant === "gradient" ? "text-white/80" : "text-muted-foreground",
              titleClassName,
            )}
          >
            {title}
          </p>
          <h3 className={cn("mt-2 text-3xl font-bold tracking-tight", valueClassName)}>{value}</h3>
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span
                className={cn(
                  "flex items-center gap-0.5",
                  trend.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                  variant === "gradient" && (trend.positive ? "text-emerald-200" : "text-rose-200"),
                )}
              >
                {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              {trend.label && (
                <span className={cn("ml-1", variant === "gradient" ? "text-white/60" : "text-muted-foreground")}>
                  {trend.label}
                </span>
              )}
            </div>
          )}
          {children}
        </div>

        {icon && (
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              iconVariantStyles[variant],
              iconClassName,
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {sparkline && <div className="mt-4">{sparkline}</div>}
    </motion.div>
  )
}
