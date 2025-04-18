"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface MetricItem {
  name: string
  value: string | number
  trend: number
  isPositive: boolean
  color: string
  progressValue: number
}

interface PerformanceMetricsProps {
  title: string
  description?: string
  metrics: MetricItem[]
}

export function PerformanceMetrics({ title, description, metrics }: PerformanceMetricsProps) {
  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">{metric.name}</div>
                <div className="flex items-center">
                  <span className="font-bold">{metric.value}</span>
                  <div
                    className={`ml-2 flex items-center ${
                      metric.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {metric.isPositive ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    <span className="text-xs font-medium ml-0.5">{Math.abs(metric.trend)}%</span>
                  </div>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className={`h-full bg-${metric.color}-500 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.progressValue}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
