"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BarChartProps {
  data: {
    label: string
    value: number
    color?: string
    secondaryValue?: number
    secondaryColor?: string
  }[]
  height?: number
  className?: string
  showLabels?: boolean
  showValues?: boolean
  maxValue?: number
  animated?: boolean
  grouped?: boolean
  barWidth?: number
  barGap?: number
  barRadius?: number
}

export function BarChart({
  data,
  height = 200,
  className,
  showLabels = true,
  showValues = false,
  maxValue: customMaxValue,
  animated = true,
  grouped = false,
  barWidth = 24,
  barGap = 8,
  barRadius = 4,
}: BarChartProps) {
  // Calculate the maximum value for scaling
  const hasSecondaryValues = data.some((item) => item.secondaryValue !== undefined)
  const primaryMax = Math.max(...data.map((item) => item.value))
  const secondaryMax = hasSecondaryValues ? Math.max(...data.map((item) => item.secondaryValue || 0)) : 0
  const maxValue = customMaxValue || Math.max(primaryMax, secondaryMax)

  // Calculate total width needed
  const totalBarWidth = grouped ? barWidth : hasSecondaryValues ? barWidth * 2 + barGap : barWidth
  const totalWidth = data.length * totalBarWidth + (data.length - 1) * barGap

  return (
    <div className={cn("w-full", className)}>
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Y-axis grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="w-full border-t border-border/30 dark:border-border/20"
              style={{ height: "20%" }}
            />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute bottom-0 left-0 flex items-end" style={{ gap: `${barGap}px`, height: `${height}px` }}>
          {data.map((item, index) => (
            <div key={index} className="flex items-end" style={{ gap: grouped ? `${barGap}px` : "0" }}>
              {/* Primary bar */}
              <motion.div
                className="relative"
                style={{ width: `${barWidth}px` }}
                initial={animated ? { height: 0 } : undefined}
                animate={{ height: `${(item.value / maxValue) * height}px` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              >
                <div
                  className={cn("absolute bottom-0 w-full", item.color || "bg-primary")}
                  style={{
                    height: `${(item.value / maxValue) * height}px`,
                    borderRadius: `${barRadius}px ${barRadius}px 0 0`,
                  }}
                />

                {showValues && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">{item.value}</div>
                )}
              </motion.div>

              {/* Secondary bar (if available) */}
              {!grouped && item.secondaryValue !== undefined && (
                <motion.div
                  className="relative"
                  style={{ width: `${barWidth}px` }}
                  initial={animated ? { height: 0 } : undefined}
                  animate={{ height: `${(item.secondaryValue / maxValue) * height}px` }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                >
                  <div
                    className={cn("absolute bottom-0 w-full", item.secondaryColor || "bg-secondary")}
                    style={{
                      height: `${(item.secondaryValue / maxValue) * height}px`,
                      borderRadius: `${barRadius}px ${barRadius}px 0 0`,
                    }}
                  />

                  {showValues && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                      {item.secondaryValue}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* X-axis labels */}
      {showLabels && (
        <div className="mt-2 flex" style={{ gap: `${barGap}px`, marginLeft: `${barWidth / 2}px` }}>
          {data.map((item, index) => (
            <div
              key={index}
              className="text-center text-xs text-muted-foreground"
              style={{ width: `${totalBarWidth}px` }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
