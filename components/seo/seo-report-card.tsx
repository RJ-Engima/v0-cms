"use client"

import { motion } from "framer-motion"
import { ExternalLink, Calendar, ArrowRight, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SEOReportCardProps {
  report: {
    id: string
    url: string
    domain: string
    overallScore: number
    lastAnalyzed: string
    issuesSummary: {
      critical: number
      warnings: number
      passed: number
    }
    contentType: string
    pageSpeed: number
  }
  onViewReport: () => void
}

export function SEOReportCard({ report, onViewReport }: SEOReportCardProps) {
  // Format date
  const formattedDate = new Date(report.lastAnalyzed).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  // Determine score color and status
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-emerald-500 dark:text-emerald-400"
    if (score >= 50) return "text-amber-500 dark:text-amber-400"
    return "text-red-500 dark:text-red-400"
  }

  const getScoreStatus = (score: number) => {
    if (score >= 70) return "Good"
    if (score >= 50) return "Needs Improvement"
    return "Critical Issues"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
    if (score >= 50) return <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
    return <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
  }

  const getScoreGradient = (score: number) => {
    if (score >= 70) return "from-emerald-500/20 to-emerald-500/5"
    if (score >= 50) return "from-amber-500/20 to-amber-500/5"
    return "from-red-500/20 to-red-500/5"
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-md">
      {/* Background gradient based on score */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(report.overallScore)} opacity-50`} />

      {/* Content */}
      <div className="relative p-6">
        {/* Header with domain and external link */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold truncate">{report.domain}</h3>
          <a
            href={report.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Score circle */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16">
              <svg className="h-16 w-16 -rotate-90" viewBox="0 0 100 100">
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
                    "transition-all duration-1000",
                    report.overallScore >= 70
                      ? "stroke-emerald-500"
                      : report.overallScore >= 50
                        ? "stroke-amber-500"
                        : "stroke-red-500",
                  )}
                  cx="50"
                  cy="50"
                  r="40"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(report.overallScore / 100) * 251.2} 251.2`}
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (report.overallScore / 100) * 251.2 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className={cn("text-2xl font-bold", getScoreColor(report.overallScore))}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  {report.overallScore}
                </motion.span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                {getScoreIcon(report.overallScore)}
                <span className={cn("font-medium", getScoreColor(report.overallScore))}>
                  {getScoreStatus(report.overallScore)}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          <Badge variant="outline" className="text-xs">
            {report.contentType}
          </Badge>
        </div>

        {/* Issues summary */}
        <div className="mb-6 grid grid-cols-3 gap-2">
          <div className="rounded-lg border p-2 text-center">
            <div className="text-lg font-bold text-red-500 dark:text-red-400">{report.issuesSummary.critical}</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div className="rounded-lg border p-2 text-center">
            <div className="text-lg font-bold text-amber-500 dark:text-amber-400">{report.issuesSummary.warnings}</div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
          <div className="rounded-lg border p-2 text-center">
            <div className="text-lg font-bold text-emerald-500 dark:text-emerald-400">
              {report.issuesSummary.passed}
            </div>
            <div className="text-xs text-muted-foreground">Passed</div>
          </div>
        </div>

        {/* Page speed */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span>Page Speed</span>
            <span className="font-medium">{report.pageSpeed}/100</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              className={cn(
                "h-full",
                report.pageSpeed >= 70 ? "bg-emerald-500" : report.pageSpeed >= 50 ? "bg-amber-500" : "bg-red-500",
              )}
              initial={{ width: 0 }}
              animate={{ width: `${report.pageSpeed}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* View report button */}
        <Button onClick={onViewReport} className="w-full gap-2 group-hover:bg-primary/90 transition-colors">
          View Report
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}
