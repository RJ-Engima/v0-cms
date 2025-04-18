import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzePerformance(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  // If no performance metrics available, return early
  if (!pageData.performanceMetrics) {
    return {
      score: 0,
      issues: [
        {
          id: "missing-performance-data",
          message: "Performance metrics are not available",
          severity: "info",
          impact: 0,
          recommendation: "Enable performance analysis to get insights on page speed",
        },
      ],
      data: {},
      info: "Performance metrics could not be collected. This may be due to the URL being inaccessible or performance analysis being disabled.",
    }
  }

  const { lcp, fid, cls, ttfb, pageSize, requestCount } = pageData.performanceMetrics

  // Analyze Largest Contentful Paint (LCP)
  if (lcp > 2500) {
    const severity = lcp > 4000 ? "critical" : "warning"
    issues.push({
      id: "high-lcp",
      message: `Largest Contentful Paint (LCP) is too high: ${lcp}ms`,
      severity,
      impact: lcp > 4000 ? 8 : 5,
      recommendation: "Optimize critical rendering path, reduce JavaScript, and optimize images to improve LCP",
    })
    score -= lcp > 4000 ? 15 : 8
  }

  // Analyze First Input Delay (FID)
  if (fid > 100) {
    const severity = fid > 300 ? "critical" : "warning"
    issues.push({
      id: "high-fid",
      message: `First Input Delay (FID) is too high: ${fid}ms`,
      severity,
      impact: fid > 300 ? 7 : 4,
      recommendation: "Reduce JavaScript execution time and break up long tasks to improve interactivity",
    })
    score -= fid > 300 ? 12 : 6
  }

  // Analyze Cumulative Layout Shift (CLS)
  if (cls > 0.1) {
    const severity = cls > 0.25 ? "critical" : "warning"
    issues.push({
      id: "high-cls",
      message: `Cumulative Layout Shift (CLS) is too high: ${cls}`,
      severity,
      impact: cls > 0.25 ? 7 : 4,
      recommendation: "Set dimensions for images and embeds, avoid inserting content above existing content",
    })
    score -= cls > 0.25 ? 12 : 6
  }

  // Analyze Time to First Byte (TTFB)
  if (ttfb > 600) {
    const severity = ttfb > 1000 ? "critical" : "warning"
    issues.push({
      id: "high-ttfb",
      message: `Time to First Byte (TTFB) is too high: ${ttfb}ms`,
      severity,
      impact: ttfb > 1000 ? 6 : 3,
      recommendation: "Optimize server response time, use CDN, and implement caching",
    })
    score -= ttfb > 1000 ? 10 : 5
  }

  // Analyze page size
  if (pageSize > 2000) {
    // 2MB
    const severity = pageSize > 5000 ? "critical" : "warning"
    issues.push({
      id: "large-page-size",
      message: `Page size is too large: ${Math.round(pageSize / 1024)}MB`,
      severity,
      impact: pageSize > 5000 ? 6 : 3,
      recommendation: "Optimize images, minify CSS/JS, and remove unnecessary resources",
    })
    score -= pageSize > 5000 ? 10 : 5
  }

  // Analyze request count
  if (requestCount > 80) {
    const severity = requestCount > 120 ? "critical" : "warning"
    issues.push({
      id: "high-request-count",
      message: `Too many HTTP requests: ${requestCount}`,
      severity,
      impact: requestCount > 120 ? 5 : 3,
      recommendation: "Combine files, use CSS sprites, and reduce third-party scripts",
    })
    score -= requestCount > 120 ? 8 : 4
  }

  // Analyze number of requests
  if (requestCount > 100) {
    issues.push({
      id: "too-many-requests",
      message: "Page makes over 100 HTTP requests. Consider reducing the number of requests to improve load time.",
      severity: "critical",
      impact: 7,
      recommendation: "Combine files, use CSS sprites, and reduce third-party scripts",
    })
    score -= 15
  } else if (requestCount > 60) {
    issues.push({
      id: "many-requests",
      message: "Page makes over 60 HTTP requests. Consider consolidating resources to reduce requests.",
      severity: "warning",
      impact: 4,
      recommendation: "Combine files, use CSS sprites, and reduce third-party scripts",
    })
    score -= 10
  } else if (requestCount > 30) {
    issues.push({
      id: "some-requests",
      message: "Page makes over 30 HTTP requests. Further optimization could improve performance.",
      severity: "info",
      impact: 2,
      recommendation: "Combine files, use CSS sprites, and reduce third-party scripts",
    })
    score -= 5
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
      lcp,
      fid,
      cls,
      ttfb,
      pageSize,
      requestCount,
      lcpCategory: lcp <= 2500 ? "good" : lcp <= 4000 ? "needs-improvement" : "poor",
      fidCategory: fid <= 100 ? "good" : fid <= 300 ? "needs-improvement" : "poor",
      clsCategory: cls <= 0.1 ? "good" : cls <= 0.25 ? "needs-improvement" : "poor",
      ttfbCategory: ttfb <= 600 ? "good" : ttfb <= 1000 ? "needs-improvement" : "poor",
    },
    info: "Page speed is a critical ranking factor. Core Web Vitals measure real-world user experience and directly impact both SEO and user engagement.",
  }
}
