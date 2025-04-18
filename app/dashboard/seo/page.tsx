"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Search, Filter, Plus, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SEOReportCard } from "@/components/seo/seo-report-card"
import { EmptyState } from "@/components/dashboard/empty-state"
import { PageHeader } from "@/components/dashboard/page-header"

// Define a type for the report summary
interface ReportSummary {
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

export default function SEODashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filterBy, setFilterBy] = useState("all")
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch the actual reports from your API
    const fetchReports = async () => {
      try {
        setLoading(true)

        // For demo purposes, we'll create some sample reports
        // In production, you would fetch this from your database
        const sampleReports: ReportSummary[] = [
          {
            id: "livquik",
            url: "https://livquik.com",
            domain: "livquik.com",
            overallScore: 62, // Use the actual score from the analysis
            lastAnalyzed: new Date().toISOString(),
            issuesSummary: {
              critical: 2,
              warnings: 5,
              passed: 16,
            },
            contentType: "Financial Services",
            pageSpeed: 70,
          },
          // You can add more reports here if needed
        ]

        setReports(sampleReports)
      } catch (error) {
        console.error("Error fetching reports:", error)
        setReports([])
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  // Filter and sort reports
  const filteredReports = reports
    .filter((report) => {
      if (searchQuery) {
        return (
          report.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.domain.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      return true
    })
    .filter((report) => {
      if (filterBy === "all") return true
      if (filterBy === "critical") return report.overallScore < 50
      if (filterBy === "warning") return report.overallScore >= 50 && report.overallScore < 70
      if (filterBy === "good") return report.overallScore >= 70
      return true
    })
    .sort((a, b) => {
      if (sortBy === "score") return b.overallScore - a.overallScore
      if (sortBy === "date") return new Date(b.lastAnalyzed).getTime() - new Date(a.lastAnalyzed).getTime()
      if (sortBy === "domain") return a.domain.localeCompare(b.domain)
      return 0
    })

  const handleViewReport = (reportId: string) => {
    router.push(`/dashboard/seo/reports/${reportId}`)
  }

  const handleNewAnalysis = () => {
    router.push("/dashboard/seo/analyze")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="SEO Reports"
          description="Monitor and improve your website's search engine optimization"
          actions={
            <Button onClick={handleNewAnalysis} className="gap-2">
              <Plus className="h-4 w-4" />
              New Analysis
            </Button>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-muted"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Reports"
        description="Monitor and improve your website's search engine optimization"
        actions={
          <Button onClick={handleNewAnalysis} className="gap-2">
            <Plus className="h-4 w-4" />
            New Analysis
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-auto flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by URL or domain..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="critical">Critical Issues</SelectItem>
              <SelectItem value="warning">Needs Improvement</SelectItem>
              <SelectItem value="good">Good Standing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Latest First</SelectItem>
              <SelectItem value="score">Highest Score</SelectItem>
              <SelectItem value="domain">Domain Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredReports.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredReports.map((report) => (
            <motion.div key={report.id} variants={itemVariants}>
              <SEOReportCard report={report} onViewReport={() => handleViewReport(report.id)} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          type="search"
          title="No reports found"
          description={searchQuery ? "Try adjusting your search or filters" : "Start by analyzing your first website"}
          actionLabel="Run New Analysis"
          onAction={handleNewAnalysis}
        />
      )}
    </div>
  )
}
