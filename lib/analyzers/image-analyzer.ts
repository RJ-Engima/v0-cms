import type { AnalysisResult, PageData } from "@/types/seo-types"

export function analyzeImages(pageData: PageData): AnalysisResult {
  const issues = []
  let score = 100

  const { images } = pageData

  // No images to analyze
  if (images.length === 0) {
    return {
      score: 100,
      issues: [],
      data: { images: [] },
      info: "No images found on the page to analyze.",
    }
  }

  // Analyze each image
  const analyzedImages = images.map((image, index) => {
    const { src, alt, dimensions } = image
    const issues = []

    // Check for alt text
    if (!alt) {
      issues.push({
        id: `missing-alt-${index}`,
        message: `Image missing alt text: ${src}`,
        severity: "warning",
        impact: 5,
      })
    } else if (alt.length < 5) {
      issues.push({
        id: `short-alt-${index}`,
        message: `Image has very short alt text (${alt.length} chars): ${src}`,
        severity: "info",
        impact: 2,
      })
    }

    // Check for dimensions
    if (!dimensions || !dimensions.width || !dimensions.height) {
      issues.push({
        id: `missing-dimensions-${index}`,
        message: `Image missing width/height attributes: ${src}`,
        severity: "warning",
        impact: 3,
      })
    }

    // Check for file type from URL
    const fileType = src.split(".").pop()?.toLowerCase()
    const isOptimizedFormat = ["webp", "avif"].includes(fileType || "")

    if (!isOptimizedFormat) {
      issues.push({
        id: `unoptimized-format-${index}`,
        message: `Image not using modern format: ${src}`,
        severity: "info",
        impact: 3,
      })
    }

    return {
      src,
      alt,
      dimensions,
      fileType,
      issues,
    }
  })

  // Collect all issues
  analyzedImages.forEach((image) => {
    image.issues.forEach((issue) => {
      issues.push(issue)

      // Deduct points based on severity
      if (issue.severity === "critical") {
        score -= 10
      } else if (issue.severity === "warning") {
        score -= 5
      } else if (issue.severity === "info") {
        score -= 2
      }
    })
  })

  // Check for overall image issues
  if (images.length > 10 && !images.some((img) => img.alt?.includes("logo"))) {
    issues.push({
      id: "missing-logo-alt",
      message: "No image with 'logo' in alt text found",
      severity: "info",
      impact: 2,
      recommendation: "Ensure your logo image has appropriate alt text including the word 'logo'",
    })
    score -= 2
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    issues,
    data: {
      totalImages: images.length,
      imagesWithAlt: images.filter((img) => img.alt).length,
      imagesWithDimensions: images.filter((img) => img.dimensions?.width && img.dimensions?.height).length,
      analyzedImages,
    },
    info: "Images can significantly impact your site's load time and user engagement. Ensure each image has an alt text and is optimized for fast loading.",
  }
}
