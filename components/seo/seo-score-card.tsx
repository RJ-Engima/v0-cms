"use client"

import type { CompleteAnalysisResults } from "@/types/seo-types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SEOScoreCardProps {
  results: CompleteAnalysisResults
  className?: string
}

export function SEOScoreCard({ results, className }: SEOScoreCardProps) {
  const { url, overallScore, categories } = results

  // Get domain from URL
  const domain = new URL(url).hostname

  // Format score for display
  const formattedScore = Math.round(overallScore)

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden", className)}>
      <div className="p-6 text-center border-b">
        <h2 className="text-xl font-semibold mb-2">SEO Score Card</h2>
        <p className="text-sm text-muted-foreground">Snapshot of how your site can improve SEO</p>
      </div>

      <div className="p-6 flex flex-col items-center justify-center">
        <div className="relative h-36 w-36 mb-4">
          <svg className="h-36 w-36 -rotate-90" viewBox="0 0 100 100">
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
                formattedScore >= 80
                  ? "stroke-emerald-500"
                  : formattedScore >= 60
                    ? "stroke-amber-500"
                    : "stroke-red-500",
              )}
              cx="50"
              cy="50"
              r="40"
              strokeWidth="10"
              fill="none"
              strokeDasharray={`${(formattedScore / 100) * 251.2} 251.2`}
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (formattedScore / 100) * 251.2 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.span
                className={cn("text-4xl font-bold", getScoreColor(formattedScore))}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                {formattedScore}
              </motion.span>
              <span className="text-sm text-muted-foreground block">/100</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-medium">{domain}</h3>
          <p className="text-sm text-muted-foreground">{url}</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          {Object.entries(categories).map(([key, category], index) => (
            <motion.div
              key={key}
              className="flex items-center justify-between p-3 rounded-md border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    category.score >= 80 ? "bg-emerald-500" : category.score >= 60 ? "bg-amber-500" : "bg-red-500",
                  )}
                />
                <span className="text-sm capitalize">{key.replace("-", " ")}</span>
              </div>
              <motion.span
                className={cn("text-sm font-medium", getScoreColor(category.score))}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {category.score}/100
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
