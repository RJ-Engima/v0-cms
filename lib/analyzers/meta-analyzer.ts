import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeMetaTags(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  // Check title
  if (!pageData.title) {
    issues.push({
      id: "missing-title",
      message: "Page title is missing",
      severity: "critical",
      impact: 9,
      recommendation: "Add a descriptive title tag that includes your primary keywords",
    })
    score -= 20
  } else if (pageData.title.length < 30) {
    issues.push({
      id: "short-title",
      message: "Page title is too short",
      severity: "warning",
      impact: 5,
      recommendation: "Title should be between 50-60 characters for optimal display in search results",
    })
    score -= 10
  } else if (pageData.title.length > 60) {
    issues.push({
      id: "long-title",
      message: "Page title is too long and may be truncated in search results",
      severity: "warning",
      impact: 4,
      recommendation: "Keep title under 60 characters to ensure it displays properly in search results",
    })
    score -= 8
  }

  // Check meta description
  const metaDescription = pageData.metaTags["description"]
  if (!metaDescription) {
    issues.push({
      id: "missing-description",
      message: "Meta description is missing",
      severity: "critical",
      impact: 7,
      recommendation: "Add a compelling meta description that includes your primary keywords",
    })
    score -= 15
  } else if (metaDescription.length < 120) {
    issues.push({
      id: "short-description",
      message: "Meta description is too short",
      severity: "warning",
      impact: 4,
      recommendation: "Meta description should be between 120-160 characters for optimal display in search results",
    })
    score -= 8
  } else if (metaDescription.length > 160) {
    issues.push({
      id: "long-description",
      message: "Meta description is too long and may be truncated in search results",
      severity: "warning",
      impact: 3,
      recommendation: "Keep meta description under 160 characters to ensure it displays properly in search results",
    })
    score -= 5
  }

  // Check canonical URL
  const canonical = pageData.metaTags["canonical"]
  if (!canonical) {
    issues.push({
      id: "missing-canonical",
      message: "Canonical URL is missing",
      severity: "warning",
      impact: 5,
      recommendation: "Add a canonical URL to prevent duplicate content issues",
    })
    score -= 10
  }

  // Check viewport
  const viewport = pageData.metaTags["viewport"]
  if (!viewport) {
    issues.push({
      id: "missing-viewport",
      message: "Viewport meta tag is missing",
      severity: "critical",
      impact: 6,
      recommendation: "Add a viewport meta tag for proper mobile rendering",
    })
    score -= 12
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    feedbacks: issues.map((issue) => ({
      message: issue.message,
      status: issue.severity === "critical" ? "critical" : issue.severity === "warning" ? "warning" : "info",
    })),
    data: {
      title: pageData.title,
      metaDescription,
      canonical,
      viewport,
    },
    info: "Meta tags provide information about your page to search engines and social media platforms. Properly optimized meta tags can improve click-through rates and visibility in search results.",
  }
}
