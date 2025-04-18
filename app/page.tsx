"use client"

import { useState } from "react"
import type { CompleteAnalysisResults } from "@/types/seo-types"
import { AnalyzerForm } from "@/components/seo/analyzer-form"
import { SEOScoreCard } from "@/components/seo/seo-score-card"
import { WebVitalsCard } from "@/components/seo/web-vitals-card"
import { AnalysisCard } from "@/components/seo/analysis-card"
import { FileText, ImageIcon, Link2, Type, Search, Smartphone, Shield, Share2, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const [analysisResults, setAnalysisResults] = useState<CompleteAnalysisResults | null>(null)

  const handleAnalysisComplete = (results: CompleteAnalysisResults) => {
    setAnalysisResults(results)
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Professional SEO Analyzer</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Comprehensive SEO analysis to help your website rank higher in search engines
          </p>
        </div>

        <AnalyzerForm onAnalysisComplete={handleAnalysisComplete} />

        {analysisResults && (
          <motion.div
            id="results"
            className="mt-16 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-6">Analysis Results</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SEOScoreCard results={analysisResults} />
              </motion.div>

              {analysisResults.categories.performance && (
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <WebVitalsCard url={analysisResults.url} metrics={analysisResults.categories.performance.data} />
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wrap each analysis card with motion.div for staggered animation */}
              {Object.entries(analysisResults.categories).map(([key, result], index) => {
                // Skip performance as it's already shown above
                if (key === "performance") return null

                // Get the appropriate icon for each category
                let icon
                switch (key) {
                  case "meta":
                    icon = <FileText className="h-5 w-5" />
                    break
                  case "keywords":
                    icon = <Search className="h-5 w-5" />
                    break
                  case "content":
                    icon = <FileText className="h-5 w-5" />
                    break
                  case "headings":
                    icon = <Type className="h-5 w-5" />
                    break
                  case "images":
                    icon = <ImageIcon className="h-5 w-5" />
                    break
                  case "links":
                    icon = <Link2 className="h-5 w-5" />
                    break
                  case "mobile":
                    icon = <Smartphone className="h-5 w-5" />
                    break
                  case "security":
                    icon = <Shield className="h-5 w-5" />
                    break
                  case "social":
                    icon = <Share2 className="h-5 w-5" />
                    break
                  case "structured-data":
                    icon = <Code2 className="h-5 w-5" />
                    break
                  default:
                    icon = <FileText className="h-5 w-5" />
                }

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <AnalysisCard
                      title={`${key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " ")} Analysis`}
                      icon={icon}
                      result={result}
                    />
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Button onClick={() => window.print()} variant="outline" className="mr-4">
                Export Report
              </Button>
              <Button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                Run Another Analysis
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
