import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeContent(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  const { content, title } = pageData

  // Check content length
  const wordCount = countWords(content)

  if (wordCount < 300) {
    issues.push({
      id: "thin-content",
      message: `Content is too thin (${wordCount} words)`,
      severity: "critical",
      impact: 8,
      recommendation: "Add more comprehensive content with at least 600 words for better ranking potential",
    })
    score -= 20
  } else if (wordCount < 600) {
    issues.push({
      id: "short-content",
      message: `Content is relatively short (${wordCount} words)`,
      severity: "warning",
      impact: 5,
      recommendation: "Consider expanding content to at least 1000 words for competitive topics",
    })
    score -= 10
  }

  // Check readability (simplified Flesch-Kincaid calculation)
  const sentences = countSentences(content)
  const avgWordsPerSentence = sentences > 0 ? wordCount / sentences : 0

  if (avgWordsPerSentence > 25) {
    issues.push({
      id: "long-sentences",
      message: `Sentences are too long (average ${avgWordsPerSentence.toFixed(1)} words per sentence)`,
      severity: "warning",
      impact: 4,
      recommendation: "Use shorter sentences (15-20 words) to improve readability",
    })
    score -= 8
  }

  // Check paragraph length
  const paragraphs = content.split(/\n\s*\n/)
  const longParagraphs = paragraphs.filter((p) => countWords(p) > 150).length

  if (longParagraphs > 0) {
    issues.push({
      id: "long-paragraphs",
      message: `${longParagraphs} paragraphs are too long`,
      severity: "warning",
      impact: 3,
      recommendation: "Break up long paragraphs into smaller chunks of 3-4 sentences",
    })
    score -= Math.min(10, longParagraphs * 2)
  }

  // Check keyword density and usage
  const titleWords = title
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3)
  const contentLower = content.toLowerCase()

  let keywordFound = false
  for (const word of titleWords) {
    if (contentLower.includes(word)) {
      keywordFound = true
      break
    }
  }

  if (!keywordFound && titleWords.length > 0) {
    issues.push({
      id: "missing-keywords",
      message: "Content does not include keywords from the title",
      severity: "critical",
      impact: 7,
      recommendation: "Include your primary keywords from the title in the content",
    })
    score -= 15
  }

  // Check for duplicate content (simplified check)
  const contentParts = content.split(". ")
  const uniqueParts = new Set(contentParts)

  if (uniqueParts.size < contentParts.length * 0.8) {
    issues.push({
      id: "duplicate-content",
      message: "Content may contain duplicate or repetitive sentences",
      severity: "warning",
      impact: 5,
      recommendation: "Ensure content is unique and provides value without repetition",
    })
    score -= 10
  }

  // Check for content formatting
  if (!content.includes("<h2") && !content.includes("<h3") && wordCount > 300) {
    issues.push({
      id: "no-subheadings",
      message: "Content lacks subheadings for structure",
      severity: "warning",
      impact: 4,
      recommendation: "Use H2 and H3 tags to structure your content for better readability",
    })
    score -= 8
  }

  // Check for lists
  if (!content.includes("<ul") && !content.includes("<ol") && wordCount > 500) {
    issues.push({
      id: "no-lists",
      message: "Content does not use lists to organize information",
      severity: "info",
      impact: 2,
      recommendation: "Use bullet points or numbered lists to present information clearly",
    })
    score -= 5
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    issues,
    data: {
      wordCount,
      sentenceCount: sentences,
      avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
      paragraphCount: paragraphs.length,
      longParagraphCount: longParagraphs,
    },
    info: "Content quality is a primary ranking factor. Comprehensive, well-structured content that satisfies user intent will rank better than thin or poorly organized content.",
  }
}

// Helper function to count words
function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length
}

// Helper function to count sentences (simplified)
function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length
}
