import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeStructuredData(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  const { htmlContent } = pageData

  // Check for JSON-LD structured data
  const hasJsonLd = htmlContent.includes("application/ld+json")

  // Check for microdata
  const hasMicrodata = htmlContent.includes("itemscope") || htmlContent.includes("itemprop")

  // Check for RDFa
  const hasRdfa = htmlContent.includes("typeof=") || htmlContent.includes("property=")

  const hasStructuredData = hasJsonLd || hasMicrodata || hasRdfa

  if (!hasStructuredData) {
    issues.push({
      id: "missing-structured-data",
      message: "No structured data found on the page",
      severity: "warning",
      impact: 6,
      recommendation: "Add structured data using JSON-LD format to enhance search results",
    })
    score -= 15
  } else {
    // If structured data exists, do some basic checks

    // Prefer JSON-LD over other formats
    if (!hasJsonLd && (hasMicrodata || hasRdfa)) {
      issues.push({
        id: "not-using-json-ld",
        message: "Using microdata or RDFa instead of the recommended JSON-LD format",
        severity: "info",
        impact: 2,
        recommendation: "Consider migrating to JSON-LD format, which is Google's preferred format",
      })
      score -= 5
    }

    // Check for common schema types
    const commonSchemas = [
      { name: "Organization", pattern: /"@type":\s*"Organization"/ },
      { name: "LocalBusiness", pattern: /"@type":\s*"LocalBusiness"/ },
      { name: "Person", pattern: /"@type":\s*"Person"/ },
      { name: "Product", pattern: /"@type":\s*"Product"/ },
      { name: "Article", pattern: /"@type":\s*"Article"/ },
      { name: "BreadcrumbList", pattern: /"@type":\s*"BreadcrumbList"/ },
      { name: "FAQPage", pattern: /"@type":\s*"FAQPage"/ },
      { name: "Event", pattern: /"@type":\s*"Event"/ },
      { name: "Recipe", pattern: /"@type":\s*"Recipe"/ },
      { name: "Review", pattern: /"@type":\s*"Review"/ },
    ]

    const detectedSchemas = commonSchemas.filter((schema) => schema.pattern.test(htmlContent))

    if (detectedSchemas.length === 0 && hasJsonLd) {
      issues.push({
        id: "unknown-schema-type",
        message: "Structured data exists but no common schema types detected",
        severity: "info",
        impact: 3,
        recommendation: "Use common schema.org types that are supported by search engines",
      })
      score -= 8
    }
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    issues,
    data: {
      hasStructuredData,
      hasJsonLd,
      hasMicrodata,
      hasRdfa,
    },
    info: "Structured data helps search engines understand your content and can enable rich results in search engine results pages (SERPs), such as star ratings, FAQs, and recipe information.",
  }
}
