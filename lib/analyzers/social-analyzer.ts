import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeSocialMedia(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  const { metaTags, title } = pageData

  // Check Open Graph tags
  const ogTitle = metaTags["og:title"]
  const ogDescription = metaTags["og:description"]
  const ogImage = metaTags["og:image"]
  const ogUrl = metaTags["og:url"]
  const ogType = metaTags["og:type"]

  // Check Twitter Card tags
  const twitterCard = metaTags["twitter:card"]
  const twitterTitle = metaTags["twitter:title"]
  const twitterDescription = metaTags["twitter:description"]
  const twitterImage = metaTags["twitter:image"]

  // Check for Open Graph tags
  if (!ogTitle) {
    issues.push({
      id: "missing-og-title",
      message: "Open Graph title tag is missing",
      severity: "warning",
      impact: 4,
      recommendation: "Add og:title meta tag for better social media sharing",
    })
    score -= 8
  }

  if (!ogDescription) {
    issues.push({
      id: "missing-og-description",
      message: "Open Graph description tag is missing",
      severity: "warning",
      impact: 3,
      recommendation: "Add og:description meta tag for better social media sharing",
    })
    score -= 6
  }

  if (!ogImage) {
    issues.push({
      id: "missing-og-image",
      message: "Open Graph image tag is missing",
      severity: "warning",
      impact: 5,
      recommendation: "Add og:image meta tag with an image of at least 1200x630 pixels",
    })
    score -= 10
  }

  if (!ogUrl) {
    issues.push({
      id: "missing-og-url",
      message: "Open Graph URL tag is missing",
      severity: "info",
      impact: 2,
      recommendation: "Add og:url meta tag to specify the canonical URL for the page",
    })
    score -= 4
  }

  if (!ogType) {
    issues.push({
      id: "missing-og-type",
      message: "Open Graph type tag is missing",
      severity: "info",
      impact: 2,
      recommendation: "Add og:type meta tag (e.g., website, article) to specify content type",
    })
    score -= 4
  }

  // Check for Twitter Card tags
  if (!twitterCard) {
    issues.push({
      id: "missing-twitter-card",
      message: "Twitter Card tag is missing",
      severity: "warning",
      impact: 3,
      recommendation: "Add twitter:card meta tag (summary, summary_large_image, etc.)",
    })
    score -= 6
  }

  if (!twitterTitle && !ogTitle) {
    issues.push({
      id: "missing-twitter-title",
      message: "Twitter title tag is missing (and no og:title fallback)",
      severity: "warning",
      impact: 3,
      recommendation: "Add twitter:title meta tag for better Twitter sharing",
    })
    score -= 6
  }

  if (!twitterDescription && !ogDescription) {
    issues.push({
      id: "missing-twitter-description",
      message: "Twitter description tag is missing (and no og:description fallback)",
      severity: "warning",
      impact: 2,
      recommendation: "Add twitter:description meta tag for better Twitter sharing",
    })
    score -= 4
  }

  if (!twitterImage && !ogImage) {
    issues.push({
      id: "missing-twitter-image",
      message: "Twitter image tag is missing (and no og:image fallback)",
      severity: "warning",
      impact: 4,
      recommendation: "Add twitter:image meta tag for better Twitter sharing",
    })
    score -= 8
  }

  // Check image dimensions if available
  if (ogImage && ogImage.includes("://")) {
    // In a real implementation, you would fetch the image and check dimensions
    // This is a simplified check
    if (!ogImage.endsWith(".jpg") && !ogImage.endsWith(".png") && !ogImage.endsWith(".jpeg")) {
      issues.push({
        id: "og-image-format",
        message: "Open Graph image may not be in an optimal format",
        severity: "info",
        impact: 2,
        recommendation: "Use JPG or PNG format for Open Graph images",
      })
      score -= 4
    }
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    issues,
    data: {
      openGraph: {
        title: ogTitle || title,
        description: ogDescription || metaTags["description"],
        image: ogImage,
        url: ogUrl,
        type: ogType,
      },
      twitterCard: {
        card: twitterCard,
        title: twitterTitle || ogTitle || title,
        description: twitterDescription || ogDescription || metaTags["description"],
        image: twitterImage || ogImage,
      },
    },
    info: "Social media tags help control how your content appears when shared on platforms like Facebook, Twitter, and LinkedIn. Proper implementation can significantly increase click-through rates from social media.",
  }
}
