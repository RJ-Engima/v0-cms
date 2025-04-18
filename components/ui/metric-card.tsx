"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: number
    label?: string
    positive: boolean
  }
  description?: string
  className?: string
  variant?: "default" | "gradient" | "outline"
  colorScheme?: "blue" | "purple" | "green" | "amber" | "teal" | "rose" | "cyan" | "slate"
  delay?: number
  children?: React.ReactNode
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  description,
  className,
  variant = "default",
  colorScheme = "blue",
  delay = 0,
  children,
}: MetricCardProps) {
  // Define color schemes
  const getColorScheme = () => {
    if (variant === "default") return ""

    const gradients = {
      blue: "bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700",
      purple: "bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700",
      green: "bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700",
      amber: "bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700",
      teal: "bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700",
      rose: "bg-gradient-to-br from-rose-500 to-pink-600 dark:from-rose-600 dark:to-pink-700",
      cyan: "bg-gradient-to-br from-cyan-500 to-sky-600 dark:from-cyan-600 dark:to-sky-700",
      slate: "bg-gradient-to-br from-slate-500 to-slate-600 dark:from-slate-600 dark:to-slate-700",
    }

    const borders = {
      blue: "border-blue-200 dark:border-blue-500/20",
      purple: "border-purple-200 dark:border-purple-500/20",
      green: "border-emerald-200 dark:border-emerald-500/20",
      amber: "border-amber-200 dark:border-amber-500/20",
      teal: "border-teal-200 dark:border-teal-500/20",
      rose: "border-rose-200 dark:border-rose-500/20",
      cyan: "border-cyan-200 dark:border-cyan-500/20",
      slate: "border-slate-200 dark:border-slate-500/20",
    }

    if (variant === "gradient") {
      return `${gradients[colorScheme]} text-white border-none`
    }

    if (variant === "outline") {
      return `bg-transparent border ${borders[colorScheme]}`
    }

    return ""
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
      <Card className={cn("overflow-hidden", getColorScheme(), className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p
                className={cn(
                  "text-sm font-medium",
                  variant === "gradient" ? "text-white/80" : "text-muted-foreground",
                )}
              >
                {title}
              </p>
              <h3 className={cn("mt-2 text-3xl font-bold", variant === "gradient" ? "text-white" : "")}>{value}</h3>
              {trend && (
                <div className="mt-1 flex items-center text-sm">
                  <span
                    className={cn(
                      "flex items-center gap-0.5",
                      trend.positive
                        ? variant === "gradient"
                          ? "text-emerald-200"
                          : "text-emerald-600 dark:text-emerald-400"
                        : variant === "gradient"
                          ? "text-rose-200"
                          : "text-rose-600 dark:text-rose-400",
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
              {description && (
                <p className={cn("mt-2 text-sm", variant === "gradient" ? "text-white/60" : "text-muted-foreground")}>
                  {description}
                </p>
              )}
            </div>
            {icon && (
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  variant === "gradient" ? "bg-white/20 text-white" : "bg-primary/10 text-primary dark:bg-primary/20",
                )}
              >
                {icon}
              </div>
            )}
          </div>
          {children && <div className="mt-4">{children}</div>}
        </CardContent>
      </Card>
    </motion.div>
  )
}
