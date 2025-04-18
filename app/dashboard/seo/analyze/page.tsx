"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnalyzerForm } from "@/components/seo/analyzer-form"
import { PageHeader } from "@/components/dashboard/page-header"
import type { CompleteAnalysisResults } from "@/types/seo-types"

export default function AnalyzePage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalysisComplete = (results: CompleteAnalysisResults) => {
    // In a real app, you would save the results to your database
    // and then redirect to the report page

    // For now, we'll just simulate this by redirecting to a sample report
    router.push("/dashboard/seo/reports/report-1")
  }

  const handleBack = () => {
    router.push("/dashboard/seo")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Analyzer"
        description="Analyze any website for SEO issues and get recommendations"
        actions={
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <AnalyzerForm onAnalysisComplete={handleAnalysisComplete} />
      </motion.div>
    </div>
  )
}
