"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MetricGroupProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  action?: ReactNode
  delay?: number
  variant?: "default" | "glass" | "outline" | "filled"
}

export function MetricGroup({
  title,
  subtitle,
  children,
  className,
  headerClassName,
  contentClassName,
  action,
  delay = 0,
  variant = "default",
}: MetricGroupProps) {
  const variantStyles = {
    default: "bg-card",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 dark:bg-white/5 dark:border-white/10",
    outline: "bg-background border border-border",
    filled: "bg-muted/50",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("rounded-xl shadow-sm overflow-hidden", variantStyles[variant], className)}
    >
      <div className={cn("flex items-center justify-between p-5 border-b border-border/50", headerClassName)}>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className={cn("p-5", contentClassName)}>{children}</div>
    </motion.div>
  )
}
