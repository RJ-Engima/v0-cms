import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeLinks(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  const { links } = pageData

  // No links to analyze
  if (links.length === 0) {
    return {
      score: 80,
      issues: [
        {
          id: "no-links",
          message: "Page has no links",
          severity: "warning",
          impact: 5,
          recommendation: "Add internal and external links to improve navigation and SEO",
        },
      ],
      data: { links: [] },
      info: "Links help search engines discover and understand the relationship between pages on your site and across the web.",
    }
  }

  // Count internal and external links
  const internalLinks = links.filter((link) => !link.isExternal)
  const externalLinks = links.filter((link) => link.isExternal)

  // Check for empty link text
  const emptyTextLinks = links.filter((link) => !link.text.trim())
  if (emptyTextLinks.length > 0) {
    issues.push({
      id: "empty-link-text",
      message: `${emptyTextLinks.length} links have empty or missing text`,
      severity: "warning",
      impact: 5,
      recommendation: "Add descriptive text to all links for better accessibility and SEO",
    })
    score -= Math.min(15, emptyTextLinks.length * 3)
  }

  // Check for generic link text
  const genericTexts = ["click here", "read more", "learn more", "more", "link", "here"]
  const genericTextLinks = links.filter((link) => genericTexts.includes(link.text.toLowerCase().trim()))

  if (genericTextLinks.length > 0) {
    issues.push({
      id: "generic-link-text",
      message: `${genericTextLinks.length} links use generic text like "click here" or "read more"`,
      severity: "warning",
      impact: 4,
      recommendation: "Use descriptive link text that indicates what the linked page is about",
    })
    score -= Math.min(10, genericTextLinks.length * 2)
  }

  // Check for too many links
  if (links.length > 100) {
    issues.push({
      id: "too-many-links",
      message: `Page has ${links.length} links, which is excessive`,
      severity: "warning",
      impact: 5,
      recommendation: "Reduce the number of links to focus on the most important ones",
    })
    score -= 10
  }

  // Check for no external links
  if (externalLinks.length === 0) {
    issues.push({
      id: "no-external-links",
      message: "Page has no external links",
      severity: "info",
      impact: 2,
      recommendation: "Consider adding relevant external links to authoritative sources",
    })
    score -= 5
  }

  // Check for too few internal links
  if (internalLinks.length < 3 && links.length > 0) {
    issues.push({
      id: "few-internal-links",
      message: "Page has very few internal links",
      severity: "warning",
      impact: 4,
      recommendation: "Add more internal links to improve site structure and user navigation",
    })
    score -= 8
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    issues,
    data: {
      totalLinks: links.length,
      internalLinks: internalLinks.length,
      externalLinks: externalLinks.length,
      emptyTextLinks: emptyTextLinks.length,
      genericTextLinks: genericTextLinks.length,
    },
    info: "Links are crucial for SEO as they help search engines discover and understand the relationship between pages. They also distribute link equity throughout your site.",
  }
}
