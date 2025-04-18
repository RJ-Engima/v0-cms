import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeHeadings(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  const { headings } = pageData
  const h1s = headings.h1 || []
  const h2s = headings.h2 || []
  const h3s = headings.h3 || []

  // Check for H1
  if (h1s.length === 0) {
    issues.push({
      id: "missing-h1",
      message: "Page is missing an H1 heading",
      severity: "critical",
      impact: 8,
      recommendation: "Add an H1 heading that includes your primary keyword",
    })
    score -= 15
  } else if (h1s.length > 1) {
    issues.push({
      id: "multiple-h1",
      message: `Page has multiple H1 headings (${h1s.length})`,
      severity: "warning",
      impact: 4,
      recommendation: "Use only one H1 heading per page for optimal SEO",
    })
    score -= 8
  }

  // Check for H2
  if (h2s.length === 0) {
    issues.push({
      id: "missing-h2",
      message: "Page is missing H2 headings",
      severity: "warning",
      impact: 5,
      recommendation: "Add H2 headings to structure your content and include relevant keywords",
    })
    score -= 10
  }

  // Check heading hierarchy
  if (h1s.length === 0 && h2s.length > 0) {
    issues.push({
      id: "h2-without-h1",
      message: "Page has H2 headings but no H1 heading",
      severity: "warning",
      impact: 4,
      recommendation: "Add an H1 heading before using H2 headings",
    })
    score -= 8
  }

  if (h2s.length === 0 && h3s.length > 0) {
    issues.push({
      id: "h3-without-h2",
      message: "Page has H3 headings but no H2 headings",
      severity: "warning",
      impact: 3,
      recommendation: "Maintain proper heading hierarchy (H1 → H2 → H3)",
    })
    score -= 6
  }

  // Check for keyword in headings
  const title = pageData.title.toLowerCase()
  const titleWords = title.split(/\s+/).filter((word) => word.length > 3)

  if (h1s.length > 0) {
    const h1Lower = h1s[0].toLowerCase()
    const hasKeywordInH1 = titleWords.some((word) => h1Lower.includes(word))

    if (!hasKeywordInH1) {
      issues.push({
        id: "no-keyword-in-h1",
        message: "H1 heading does not contain any keywords from the title",
        severity: "warning",
        impact: 5,
        recommendation: "Include your primary keyword in the H1 heading",
      })
      score -= 10
    }
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    issues,
    data: {
      h1Count: h1s.length,
      h2Count: h2s.length,
      h3Count: h3s.length,
      h4Count: (headings.h4 || []).length,
      h5Count: (headings.h5 || []).length,
      h6Count: (headings.h6 || []).length,
      headings: {
        h1: h1s,
        h2: h2s,
        h3: h3s,
        h4: headings.h4 || [],
        h5: headings.h5 || [],
        h6: headings.h6 || [],
      },
    },
    info: "Headings provide structure to your content and help search engines understand the hierarchy and importance of information on your page.",
  }
}
