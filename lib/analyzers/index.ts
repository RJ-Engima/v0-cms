import { analyzeMetaTags } from "./meta-analyzer"
import { analyzeKeywords } from "./keyword-analyzer"
import { analyzeImages } from "./image-analyzer"
import { analyzePerformance } from "./performance-analyzer"
import { analyzeHeadings } from "./headings-analyzer"
import { analyzeLinks } from "./links-analyzer"
import { analyzeMobile } from "./mobile-analyzer"
import { analyzeSecurity } from "./security-analyzer"
import { analyzeSocialMedia } from "./social-analyzer"
import { analyzeStructuredData } from "./structured-data-analyzer"
import { analyzeContent } from "./content-analyzer"

import type {
  AnalysisCategory,
  AnalysisOptions,
  CompleteAnalysisResults,
  PageData,
  AnalysisResult,
} from "@/types/seo-types"

/**
 * Ensures analysis results have a valid feedbacks array
 */
function standardizeAnalysisResult(result: any): AnalysisResult {
  // If result has issues but no feedbacks, convert issues to feedbacks
  if (result.issues && !result.feedbacks) {
    result.feedbacks = result.issues.map((issue: any) => ({
      message: issue.message,
      status:
        issue.severity === "critical"
          ? "critical"
          : issue.severity === "warning"
            ? "warning"
            : issue.severity === "good"
              ? "good"
              : "info",
    }))
  }

  // Ensure feedbacks is at least an empty array
  if (!result.feedbacks) {
    result.feedbacks = []
  }

  return result
}

/**
 * Runs all SEO analyzers and returns complete results
 */
export async function runCompleteAnalysis(
  pageData: PageData,
  options: AnalysisOptions = {},
): Promise<CompleteAnalysisResults> {
  // Initialize results object
  const results: CompleteAnalysisResults = {
    url: pageData.url,
    overallScore: 0,
    timestamp: new Date().toISOString(),
    categories: {} as Record<AnalysisCategory, any>,
  }

  // Run all analyzers
  results.categories.meta = standardizeAnalysisResult(analyzeMetaTags(pageData))
  results.categories.keywords = standardizeAnalysisResult(analyzeKeywords(pageData, options.customKeywords))
  results.categories.images = standardizeAnalysisResult(analyzeImages(pageData))
  results.categories.headings = standardizeAnalysisResult(analyzeHeadings(pageData))
  results.categories.links = standardizeAnalysisResult(analyzeLinks(pageData))
  results.categories.content = standardizeAnalysisResult(analyzeContent(pageData))

  // Optional analyzers based on options
  if (options.includePerformance && pageData.performanceMetrics) {
    results.categories.performance = standardizeAnalysisResult(analyzePerformance(pageData))
  }

  if (options.includeSocialAnalysis) {
    results.categories.social = standardizeAnalysisResult(analyzeSocialMedia(pageData))
  }

  results.categories.mobile = standardizeAnalysisResult(analyzeMobile(pageData))
  results.categories.security = standardizeAnalysisResult(analyzeSecurity(pageData))
  results.categories["structured-data"] = standardizeAnalysisResult(analyzeStructuredData(pageData))

  // Calculate overall score (weighted average)
  const weights: Partial<Record<AnalysisCategory, number>> = {
    meta: 1.5,
    content: 2,
    keywords: 1.5,
    headings: 1,
    images: 1,
    links: 1,
    performance: 1.5,
    mobile: 1.5,
    security: 1,
    social: 0.5,
    "structured-data": 1,
  }

  let totalScore = 0
  let totalWeight = 0

  Object.entries(results.categories).forEach(([category, result]) => {
    const weight = weights[category as AnalysisCategory] || 1
    totalScore += result.score * weight
    totalWeight += weight
  })

  results.overallScore = Math.round(totalWeight > 0 ? totalScore / totalWeight : 0)

  return results
}

export {
  analyzeMetaTags,
  analyzeKeywords,
  analyzeImages,
  analyzePerformance,
  analyzeHeadings,
  analyzeLinks,
  analyzeMobile,
  analyzeSecurity,
  analyzeSocialMedia,
  analyzeStructuredData,
  analyzeContent,
}
