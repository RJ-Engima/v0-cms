"use client"

import type React from "react"
import type { AnalysisResult, AnalysisStatus } from "@/types/seo-types"
import { cn } from "@/lib/utils"
import { CheckCircle, Info, XCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Import motion from framer-motion
import { motion } from "framer-motion"

interface AnalysisCardProps {
  title: string
  icon: React.ReactNode
  result: AnalysisResult
  className?: string
}

// Update the AnalysisCard component to handle potentially missing data
export function AnalysisCard({ title, icon, result, className }: AnalysisCardProps) {
  // Ensure result has all required properties with defaults
  const { score = 0, feedbacks = [], data = {}, info = "" } = result || {}

  // Group feedbacks by status
  const groupedFeedbacks = {
    critical: feedbacks.filter((f) => f.status === "critical"),
    warning: feedbacks.filter((f) => f.status === "warning"),
    good: feedbacks.filter((f) => f.status === "good"),
    info: feedbacks.filter((f) => f.status === "info"),
  }

  // Determine overall status
  let overallStatus: AnalysisStatus = "good"
  if (groupedFeedbacks.critical.length > 0) {
    overallStatus = "critical"
  } else if (groupedFeedbacks.warning.length > 0) {
    overallStatus = "warning"
  } else if (groupedFeedbacks.good.length === 0 && groupedFeedbacks.info.length > 0) {
    overallStatus = "info"
  }

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              overallStatus === "critical" && "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
              overallStatus === "warning" && "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
              overallStatus === "good" &&
                "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
              overallStatus === "info" && "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
            )}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs text-muted-foreground">Detailed insights and suggestions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Add animations to the score circle */}
          <div className="relative h-12 w-12">
            <svg className="h-12 w-12 -rotate-90" viewBox="0 0 100 100">
              <circle
                className="stroke-slate-200 dark:stroke-slate-700"
                cx="50"
                cy="50"
                r="40"
                strokeWidth="10"
                fill="none"
              />
              <motion.circle
                className={cn(
                  "transition-all duration-300",
                  score >= 80 ? "stroke-emerald-500" : score >= 50 ? "stroke-amber-500" : "stroke-red-500",
                )}
                cx="50"
                cy="50"
                r="40"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (score / 100) * 251.2 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-sm font-medium"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5,
                }}
              >
                {score}%
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Negative Feedback */}
        {(groupedFeedbacks.critical.length > 0 || groupedFeedbacks.warning.length > 0) && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-red-500" />
              Negative Feedback
            </h4>
            <div className="space-y-2">
              {groupedFeedbacks.critical.map((feedback, index) => (
                <motion.div
                  key={`critical-${index}`}
                  className="p-3 rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 text-red-800 dark:text-red-300 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {feedback.message}
                </motion.div>
              ))}
              {groupedFeedbacks.warning.map((feedback, index) => (
                <motion.div
                  key={`warning-${index}`}
                  className="p-3 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 text-amber-800 dark:text-amber-300 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (index + groupedFeedbacks.critical.length) }}
                >
                  {feedback.message}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Positive Feedback */}
        {groupedFeedbacks.good.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Positive Feedback
            </h4>
            <div className="space-y-2">
              {groupedFeedbacks.good.map((feedback, index) => (
                <motion.div
                  key={`good-${index}`}
                  className="p-3 rounded-md bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 text-emerald-800 dark:text-emerald-300 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {feedback.message}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Data Section */}
        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="data">
            <AccordionTrigger className="text-sm font-medium flex items-center gap-1.5 py-2">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <Info className="h-3 w-3" />
                </div>
                <span>Data</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm">
                <pre className="whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Info Section */}
        {info && (
          <div className="mb-2">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-blue-500" />
              Info
            </h4>
            <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 text-blue-800 dark:text-blue-300 text-sm">
              {info}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
