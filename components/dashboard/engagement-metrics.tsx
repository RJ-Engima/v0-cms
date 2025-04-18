"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface MetricItem {
  name: string
  value: string | number
  trend: number
  isPositive: boolean
}

interface TopContent {
  title: string
  type: string
  icon: React.ReactNode
  views: number
  color: string
}

interface EngagementMetricsProps {
  metrics: MetricItem[]
  topContent: TopContent[]
  period?: string
}

export function EngagementMetrics({ metrics, topContent, period = "This Month" }: EngagementMetricsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "top-content">("overview")

  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Content Engagement</CardTitle>
            <p className="text-sm text-muted-foreground">{period}</p>
          </div>
          <Tabs defaultValue="overview" onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="h-8">
              <TabsTrigger value="overview" className="text-xs">
                Overview
              </TabsTrigger>
              <TabsTrigger value="top-content" className="text-xs">
                Top Content
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === "overview" ? (
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-sm font-medium text-muted-foreground">{metric.name}</div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div
                  className={`flex items-center text-xs ${
                    metric.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {metric.isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
                  )}
                  <span>{Math.abs(metric.trend)}% vs last period</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {topContent.map((content, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${content.color}-500/10 text-${content.color}-500`}
                  >
                    {content.icon}
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">{content.title}</p>
                    <p className="text-xs text-muted-foreground">{content.type}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`bg-${content.color}-50 text-${content.color}-600 dark:bg-${content.color}-950/30 dark:text-${content.color}-400`}
                >
                  {content.views.toLocaleString()} views
                </Badge>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
