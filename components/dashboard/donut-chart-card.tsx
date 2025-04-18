"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { DonutChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DonutChartCardProps {
  title: string
  description?: string
  data: {
    name: string
    value: number
    color?: string
  }[]
  valueFormatter?: (value: number) => string
  className?: string
  delay?: number
  height?: number
  centerLabel?: React.ReactNode
  action?: React.ReactNode
  showLabel?: boolean
  innerRadius?: number
  outerRadius?: number
}

export function DonutChartCard({
  title,
  description,
  data,
  valueFormatter,
  className,
  delay = 0,
  height = 300,
  centerLabel,
  action,
  showLabel = false,
  innerRadius = 60,
  outerRadius = 80,
}: DonutChartCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action}
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="relative">
            <DonutChart
              data={data}
              valueFormatter={valueFormatter}
              height={height}
              showLabel={showLabel}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
            />
            {centerLabel && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {centerLabel}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
