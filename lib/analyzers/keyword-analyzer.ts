import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeKeywords(pageData: PageData, customKeywords?: string[]): AnalysisResult {
  const issues = []
  let score = 100

  // Extract content for analysis
  const content = pageData.content.toLowerCase()
  const title = pageData.title.toLowerCase()
  const metaDescription = (pageData.metaTags["description"] || "").toLowerCase()

  // Extract potential keywords from content if no custom keywords provided
  const extractedKeywords = customKeywords || extractKeywordsFromContent(content, title)

  // Analyze keyword presence and density
  const keywordAnalysis = extractedKeywords.map((keyword) => {
    const keywordLower = keyword.toLowerCase()
    const count = countOccurrences(content, keywordLower)
    const inTitle = title.includes(keywordLower)
    const inDescription = metaDescription.includes(keywordLower)
    const inHeadings = Object.values(pageData.headings).some((headings) =>
      headings.some((heading) => heading.toLowerCase().includes(keywordLower)),
    )

    // Calculate density (percentage of content)
    const density = ((count * keyword.length) / content.length) * 100

    return {
      keyword,
      count,
      density: Number.parseFloat(density.toFixed(2)),
      inTitle,
      inDescription,
      inHeadings,
    }
  })

  // Analyze issues
  keywordAnalysis.forEach((analysis) => {
    // Check if keyword is in title
    if (!analysis.inTitle) {
      issues.push({
        id: `keyword-missing-title-${analysis.keyword}`,
        message: `Primary keyword "${analysis.keyword}" is not present in the page title`,
        severity: "warning",
        impact: 6,
        recommendation: `Include "${analysis.keyword}" in your page title to improve relevance`,
      })
      score -= 8
    }

    // Check if keyword is in meta description
    if (!analysis.inDescription) {
      issues.push({
        id: `keyword-missing-description-${analysis.keyword}`,
        message: `Primary keyword "${analysis.keyword}" is not present in the meta description`,
        severity: "warning",
        impact: 5,
        recommendation: `Include "${analysis.keyword}" in your meta description to improve click-through rates`,
      })
      score -= 6
    }

    // Check if keyword is in headings
    if (!analysis.inHeadings) {
      issues.push({
        id: `keyword-missing-headings-${analysis.keyword}`,
        message: `Primary keyword "${analysis.keyword}" is not present in any headings`,
        severity: "warning",
        impact: 4,
        recommendation: `Include "${analysis.keyword}" in at least one heading (preferably H1 or H2) to improve relevance`,
      })
      score -= 5
    }

    // Check keyword density
    if (analysis.count === 0) {
      issues.push({
        id: `keyword-missing-content-${analysis.keyword}`,
        message: `Primary keyword "${analysis.keyword}" is not present in the content`,
        severity: "critical",
        impact: 8,
        recommendation: `Include "${analysis.keyword}" naturally throughout your content`,
      })
      score -= 15
    } else if (analysis.density < 0.5) {
      issues.push({
        id: `keyword-low-density-${analysis.keyword}`,
        message: `Primary keyword "${analysis.keyword}" has low density (${analysis.density}%)`,
        severity: "warning",
        impact: 4,
        recommendation: `Increase the usage of "${analysis.keyword}" to at least 0.5-1% density`,
      })
      score -= 5
    } else if (analysis.density > 3) {
      issues.push({
        id: `keyword-high-density-${analysis.keyword}`,
        message: `Primary keyword "${analysis.keyword}" has high density (${analysis.density}%)`,
        severity: "warning",
        impact: 5,
        recommendation: `Reduce the usage of "${analysis.keyword}" to avoid keyword stuffing. Aim for 1-2% density.`,
      })
      score -= 7
    }
  })

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    issues,
    data: {
      keywords: keywordAnalysis,
    },
    info: "Keywords are the terms users search for. Proper keyword usage helps search engines understand your content and rank it appropriately for relevant searches.",
  }
}

// Helper function to count occurrences of a substring
function countOccurrences(text: string, subtext: string): number {
  let count = 0
  let position = text.indexOf(subtext)

  while (position !== -1) {
    count++
    position = text.indexOf(subtext, position + 1)
  }

  return count
}

// Simple keyword extraction (in a real implementation, this would be more sophisticated)
function extractKeywordsFromContent(content: string, title: string): string[] {
  // This is a very simplified implementation
  // In a real tool, you would use NLP and other techniques

  // Start with words from the title as they're likely important
  const titleWords = title.split(/\s+/).filter((word) => word.length > 3)

  // Get common words from content
  const words = content
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .map((word) => word.replace(/[^\w]/g, "").toLowerCase())
    .filter(Boolean)

  // Count word frequency
  const wordCounts: Record<string, number> = {}
  words.forEach((word) => {
    wordCounts[word] = (wordCounts[word] || 0) + 1
  })

  // Sort by frequency
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])

  // Combine title words with frequent content words
  const combinedKeywords = [...new Set([...titleWords, ...sortedWords.slice(0, 5)])]

  return combinedKeywords.slice(0, 5) // Return top 5 keywords
}
