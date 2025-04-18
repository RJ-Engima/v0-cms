"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { BarChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StackedBarChartCardProps {
  title: string
  description?: string
  data: any[]
  index: string
  categories: {
    key: string
    name: string
    color?: string
  }[]
  valueFormatter?: (value: number) => string
  className?: string
  delay?: number
  height?: number
  legend?: React.ReactNode
  action?: React.ReactNode
}

export function StackedBarChartCard({
  title,
  description,
  data,
  index,
  categories,
  valueFormatter,
  className,
  delay = 0,
  height = 300,
  legend,
  action,
}: StackedBarChartCardProps) {
  // Add stackId to all categories
  const stackedCategories = categories.map((category) => ({
    ...category,
    stackId: "stack",
  }))

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
        <CardContent className="px-2 pb-2">
          {legend && <div className="mb-2">{legend}</div>}
          <BarChart
            data={data}
            index={index}
            categories={stackedCategories}
            valueFormatter={valueFormatter}
            height={height}
            showLegend={!legend}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
