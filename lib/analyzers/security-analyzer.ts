import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeSecurity(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  const { url } = pageData

  // Check HTTPS
  const isHttps = url.startsWith("https://")
  if (!isHttps) {
    issues.push({
      id: "not-https",
      message: "Site is not using HTTPS",
      severity: "critical",
      impact: 9,
      recommendation: "Migrate to HTTPS to improve security and SEO",
    })
    score -= 25
  }

  // Check for security headers in HTML
  const htmlContent = pageData.htmlContent

  // Check for Content-Security-Policy
  const hasCSP = htmlContent.includes("Content-Security-Policy") || htmlContent.includes("content-security-policy")
  if (!hasCSP) {
    issues.push({
      id: "missing-csp",
      message: "Content Security Policy (CSP) header not detected",
      severity: "warning",
      impact: 5,
      recommendation: "Implement a Content Security Policy to prevent XSS attacks",
    })
    score -= 10
  }

  // Check for X-Frame-Options
  const hasXFrameOptions = htmlContent.includes("X-Frame-Options") || htmlContent.includes("x-frame-options")
  if (!hasXFrameOptions) {
    issues.push({
      id: "missing-x-frame-options",
      message: "X-Frame-Options header not detected",
      severity: "warning",
      impact: 4,
      recommendation: "Add X-Frame-Options header to prevent clickjacking attacks",
    })
    score -= 8
  }

  // Check for mixed content
  if (
    isHttps &&
    htmlContent.includes("http://") &&
    !htmlContent.includes("http://localhost") &&
    !htmlContent.includes("http://127.0.0.1")
  ) {
    issues.push({
      id: "mixed-content",
      message: "Page may have mixed content (HTTP resources on HTTPS page)",
      severity: "critical",
      impact: 7,
      recommendation: "Update all resource URLs to use HTTPS",
    })
    score -= 15
  }

  // Check for vulnerable libraries (simplified check)
  const vulnerableLibraries = [
    "jquery-1.",
    "jquery-2.0",
    "jquery-2.1",
    "bootstrap-3.",
    "angular.js-1.0",
    "angular.js-1.1",
    "angular.js-1.2",
    "angular.js-1.3",
    "angular.js-1.4",
    "angular.js-1.5",
  ]

  for (const lib of vulnerableLibraries) {
    if (htmlContent.includes(lib)) {
      issues.push({
        id: `vulnerable-library-${lib}`,
        message: `Page may be using a vulnerable version of ${lib}`,
        severity: "critical",
        impact: 8,
        recommendation: "Update to the latest version of the library",
      })
      score -= 15
      break // Only report one vulnerable library to avoid excessive score reduction
    }
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    issues,
    data: {
      isHttps,
      hasContentSecurityPolicy: hasCSP,
      hasXFrameOptions,
    },
    info: "Security is increasingly important for SEO. Google favors secure websites and may warn users about insecure sites.",
  }
}
