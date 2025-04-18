"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Sparkline } from "@/components/ui/chart"
import { Card, CardContent } from "@/components/ui/card"

interface MiniMetricCardProps {
  title: string
  value: string | number
  trend?: {
    value: number
    positive: boolean
    label?: string
  }
  icon?: React.ReactNode
  sparklineData?: any[]
  sparklineKey?: string
  sparklineColor?: string
  sparklineType?: "line" | "bar" | "area"
  className?: string
  delay?: number
}

export function MiniMetricCard({
  title,
  value,
  trend,
  icon,
  sparklineData,
  sparklineKey = "value",
  sparklineColor,
  sparklineType = "line",
  className,
  delay = 0,
}: MiniMetricCardProps) {
  // Determine sparkline color based on trend
  const getSparklineColor = () => {
    if (sparklineColor) return sparklineColor
    if (trend) {
      return trend.positive ? "#10b981" : "#ef4444"
    }
    return "#3b82f6"
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="mt-1 text-2xl font-bold">{value}</h3>
              {trend && (
                <div className="mt-1 flex items-center text-xs">
                  <span
                    className={cn("flex items-center gap-0.5", trend.positive ? "text-emerald-500" : "text-rose-500")}
                  >
                    {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
                  </span>
                  {trend.label && <span className="ml-1 text-muted-foreground">{trend.label}</span>}
                </div>
              )}
            </div>
            {icon && <div className="text-muted-foreground">{icon}</div>}
          </div>
          {sparklineData && (
            <div className="mt-3">
              <Sparkline
                data={sparklineData}
                dataKey={sparklineKey}
                color={getSparklineColor()}
                type={sparklineType}
                height={30}
                width={100}
                className="ml-auto"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
