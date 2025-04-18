"use client"

import type { PerformanceMetrics } from "@/types/seo-types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface WebVitalsCardProps {
  url: string
  metrics: PerformanceMetrics
  className?: string
}

export function WebVitalsCard({ url, metrics, className }: WebVitalsCardProps) {
  // Helper function to determine status
  const getStatus = (metric: string, value: number) => {
    switch (metric) {
      case "lcp":
        return value < 2500 ? "good" : value < 4000 ? "needs-improvement" : "poor"
      case "fid":
        return value < 100 ? "good" : value < 300 ? "needs-improvement" : "poor"
      case "cls":
        return value < 0.1 ? "good" : value < 0.25 ? "needs-improvement" : "poor"
      case "ttfb":
        return value < 500 ? "good" : value < 1000 ? "needs-improvement" : "poor"
      case "fcp":
        return value < 1800 ? "good" : value < 3000 ? "needs-improvement" : "poor"
      default:
        return "unknown"
    }
  }

  // Format metrics for display
  const formatMetric = (metric: string, value: number | undefined) => {
    // Add null check to handle undefined values
    if (value === undefined) {
      return "N/A"
    }

    switch (metric) {
      case "cls":
        return value.toFixed(2)
      case "pageSize":
        return (value / 1000000).toFixed(2) + " MB"
      case "requests":
      case "requestCount":
        return value.toString()
      default:
        // Convert to seconds if over 1000ms for better readability
        return value >= 1000 ? (value / 1000).toFixed(1) + "s" : value + "ms"
    }
  }

  // Core Web Vitals
  const coreVitals = [
    {
      name: "LCP",
      key: "lcp",
      value: metrics.lcp,
      description: "Largest Contentful Paint measures loading performance.",
      goodValue: "< 2.5s",
      poorValue: "> 4s",
    },
    {
      name: "FID",
      key: "fid",
      value: metrics.fid,
      description: "First Input Delay measures interactivity.",
      goodValue: "< 100ms",
      poorValue: "> 300ms",
    },
    {
      name: "CLS",
      key: "cls",
      value: metrics.cls,
      description: "Cumulative Layout Shift measures visual stability.",
      goodValue: "< 0.1",
      poorValue: "> 0.25",
    },
  ]

  // Other important metrics
  const otherMetrics = [
    {
      name: "TTFB",
      key: "ttfb",
      value: metrics.ttfb,
      description: "Time to First Byte measures server response time.",
      goodValue: "< 500ms",
      poorValue: "> 1s",
    },
    {
      name: "FCP",
      key: "fcp",
      value: metrics.fcp,
      description: "First Contentful Paint measures when content first appears.",
      goodValue: "< 1.8s",
      poorValue: "> 3s",
    },
    {
      name: "Page Size",
      key: "pageSize",
      value: metrics.pageSize,
      description: "Total size of all resources on the page.",
      goodValue: "< 1MB",
      poorValue: "> 3MB",
    },
    {
      name: "Requests",
      key: "requestCount",
      value: metrics.requestCount,
      description: "Number of HTTP requests made by the page.",
      goodValue: "< 30",
      poorValue: "> 60",
    },
  ]

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden", className)}>
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Web Vitals</h2>
        <p className="text-sm text-muted-foreground">{url}</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Core Web Vitals */}
        <div className="space-y-4">
          {coreVitals.map((metric, index) => {
            const status = getStatus(metric.key, metric.value)
            return (
              <motion.div
                key={metric.key}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-6 w-6 flex items-center justify-center rounded-full",
                        status === "good" &&
                          "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
                        status === "needs-improvement" &&
                          "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
                        status === "poor" && "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                      )}
                    >
                      {status === "good" ? "✓" : status === "needs-improvement" ? "!" : "✕"}
                    </div>
                    <span className="font-medium">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        status === "good" &&
                          "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
                        status === "needs-improvement" &&
                          "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
                        status === "poor" && "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                      )}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    >
                      {formatMetric(metric.key, metric.value)}
                    </motion.div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{metric.description}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Good: {metric.goodValue}</span>
                  <span>Poor: {metric.poorValue}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Other Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherMetrics.map((metric, index) => {
            const status = getStatus(metric.key, metric.value)
            return (
              <motion.div
                key={metric.key}
                className="p-3 rounded-md border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      status === "good" &&
                        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
                      status === "needs-improvement" &&
                        "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
                      status === "poor" && "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                    )}
                  >
                    {status === "good" ? "Good" : status === "needs-improvement" ? "Needs Improvement" : "Poor"}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{formatMetric(metric.key, metric.value)}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
