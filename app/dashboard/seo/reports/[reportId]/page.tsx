"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  ImageIcon,
  Link2,
  Type,
  Search,
  Smartphone,
  Shield,
  Share2,
  Code2,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SEOScoreCard } from "@/components/seo/seo-score-card"
import { WebVitalsCard } from "@/components/seo/web-vitals-card"
import { AnalysisCard } from "@/components/seo/analysis-card"
import { PageHeader } from "@/components/dashboard/page-header"
import type { CompleteAnalysisResults } from "@/types/seo-types"

export default function SEOReportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [analysisResults, setAnalysisResults] = useState<CompleteAnalysisResults | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true)

        // Use the same API endpoint that's used on the home page
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: `https://${params.reportId}.com`,
            options: {
              includePerformance: true,
              includeKeywordSuggestions: true,
              includeSocialAnalysis: true,
            },
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch analysis results: ${response.status}`)
        }

        const data = await response.json()
        setAnalysisResults(data)
      } catch (error) {
        console.error("Error fetching report:", error)
        // If there's an error, we could show an error message
      } finally {
        setLoading(false)
      }
    }

    if (params.reportId) {
      fetchReportData()
    }
  }, [params.reportId])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-1/3 animate-pulse rounded-md bg-muted"></div>
        <div className="h-64 animate-pulse rounded-lg bg-muted"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-96 animate-pulse rounded-lg bg-muted"></div>
          <div className="h-96 animate-pulse rounded-lg bg-muted"></div>
        </div>
      </div>
    )
  }

  if (!analysisResults) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Report Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested SEO report could not be found.</p>
        <Button onClick={() => router.push("/dashboard/seo/analyze")}>Run New Analysis</Button>
      </div>
    )
  }

  // Format date
  const formattedDate = new Date(analysisResults.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  // Get category icons
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "meta":
        return <FileText className="h-5 w-5" />
      case "keywords":
        return <Search className="h-5 w-5" />
      case "content":
        return <FileText className="h-5 w-5" />
      case "headings":
        return <Type className="h-5 w-5" />
      case "images":
        return <ImageIcon className="h-5 w-5" />
      case "links":
        return <Link2 className="h-5 w-5" />
      case "mobile":
        return <Smartphone className="h-5 w-5" />
      case "security":
        return <Shield className="h-5 w-5" />
      case "social":
        return <Share2 className="h-5 w-5" />
      case "structured-data":
        return <Code2 className="h-5 w-5" />
      case "performance":
        return <Zap className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`SEO Report: ${params.reportId}`}
        description={`Last analyzed on ${formattedDate}`}
        actions={
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/dashboard/seo")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reports
            </Button>
            <a href={analysisResults.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Visit Website
              </Button>
            </a>
          </div>
        }
      />

      <div className="space-y-6">
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
          {Object.entries(analysisResults.categories).map(([key, result], index) => {
            // Skip performance as it's already shown above
            if (key === "performance") return null

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <AnalysisCard
                  title={`${key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " ")} Analysis`}
                  icon={getCategoryIcon(key)}
                  result={result}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
