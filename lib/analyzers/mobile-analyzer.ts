import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeMobile(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  // Check viewport meta tag
  const viewportTag = pageData.metaTags["viewport"]
  if (!viewportTag) {
    issues.push({
      id: "missing-viewport",
      message: "Viewport meta tag is missing",
      severity: "critical",
      impact: 8,
      recommendation: 'Add a viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">',
    })
    score -= 20
  } else if (!viewportTag.includes("width=device-width")) {
    issues.push({
      id: "incorrect-viewport",
      message: "Viewport meta tag does not include width=device-width",
      severity: "critical",
      impact: 7,
      recommendation: "Update viewport tag to include width=device-width",
    })
    score -= 15
  }

  // Check for mobile-friendly features

  // Check for touch elements spacing (simplified check)
  const links = pageData.links
  if (links.length > 20) {
    issues.push({
      id: "many-touch-elements",
      message: "Page has many links which may be too close together on mobile",
      severity: "info",
      impact: 3,
      recommendation: "Ensure touch elements have adequate spacing (at least 8mm) on mobile devices",
    })
    score -= 5
  }

  // Check for potential horizontal scrolling issues
  const htmlContent = pageData.htmlContent.toLowerCase()
  if (htmlContent.includes("overflow-x:") || htmlContent.includes("overflow-x=")) {
    issues.push({
      id: "potential-horizontal-scroll",
      message: "Page may have horizontal scrolling issues on mobile",
      severity: "warning",
      impact: 5,
      recommendation: "Avoid setting fixed widths or overflow-x properties that could cause horizontal scrolling",
    })
    score -= 10
  }

  // Check for mobile-friendly font sizes
  if (
    htmlContent.includes("font-size:") &&
    (htmlContent.includes("font-size: 10px") ||
      htmlContent.includes("font-size: 9px") ||
      htmlContent.includes("font-size: 8px") ||
      htmlContent.includes("font-size:10px") ||
      htmlContent.includes("font-size:9px") ||
      htmlContent.includes("font-size:8px"))
  ) {
    issues.push({
      id: "small-font-size",
      message: "Page may use font sizes that are too small for mobile devices",
      severity: "warning",
      impact: 4,
      recommendation: "Use font sizes of at least 16px for body text on mobile devices",
    })
    score -= 8
  }

  // Check for mobile-friendly tap targets
  if (htmlContent.includes("button") || htmlContent.includes("input")) {
    const smallSizePattern = /width:\s*(\d+)px/g
    let match
    let hasSmallElements = false

    while ((match = smallSizePattern.exec(htmlContent)) !== null) {
      if (Number.parseInt(match[1]) < 40) {
        hasSmallElements = true
        break
      }
    }

    if (hasSmallElements) {
      issues.push({
        id: "small-tap-targets",
        message: "Page may have tap targets that are too small for mobile users",
        severity: "warning",
        impact: 5,
        recommendation: "Ensure buttons and interactive elements are at least 48px × 48px on mobile devices",
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
      hasViewport: !!viewportTag,
      viewportContent: viewportTag || "",
    },
    info: "Mobile-friendliness is a critical ranking factor. Google primarily uses the mobile version of content for indexing and ranking.",
  }
}
