/**
 * Core SEO Analysis Types
 */

// Analysis status types
export type AnalysisStatus = "critical" | "warning" | "good" | "info"

// Score range from 0-100
export type Score = number

// Base feedback interface
export interface Feedback {
  message: string
  status: AnalysisStatus
}

// Base analysis result interface
export interface AnalysisResult {
  score: Score
  feedbacks: Feedback[]
  data: Record<string, any>
  info?: string
}

// Analysis category types
export type AnalysisCategory =
  | "meta"
  | "content"
  | "keywords"
  | "images"
  | "headings"
  | "links"
  | "performance"
  | "mobile"
  | "security"
  | "social"
  | "structured-data"

// Complete analysis results
export interface CompleteAnalysisResults {
  url: string
  overallScore: Score
  timestamp: string
  categories: Record<AnalysisCategory, AnalysisResult>
}

// Page data extracted from HTML
export interface PageData {
  url: string
  title: string
  metaTags: Record<string, string>
  headings: Record<string, string[]>
  images: Array<{
    src: string
    alt: string
    dimensions?: {
      width: number
      height: number
    }
  }>
  links: Array<{
    href: string
    text: string
    isExternal: boolean
  }>
  content: string
  htmlContent: string
  performanceMetrics?: PerformanceMetrics
}

// Performance metrics
export interface PerformanceMetrics {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
  fcp?: number // First Contentful Paint (optional)
  speedIndex?: number // Speed Index (optional)
  totalBlockingTime?: number // Total Blocking Time (optional)
  interactive?: number // Time to Interactive (optional)
  pageSize: number // Page Size in bytes
  requestCount: number // Number of requests (renamed from "requests")
}

// Keyword analysis data
export interface KeywordData {
  keyword: string
  density: number
  count: number
  inTitle: boolean
  inMetaDescription: boolean
  inHeadings: boolean
  inFirstParagraph: boolean
  competition?: number
  searchVolume?: number
  difficulty?: number
}

// SEO Analysis options
export interface AnalysisOptions {
  includePerformance?: boolean
  includeKeywordSuggestions?: boolean
  includeSocialAnalysis?: boolean
  includeCompetitorAnalysis?: boolean
  customKeywords?: string[]
  locale?: string
  device?: "mobile" | "desktop"
}
