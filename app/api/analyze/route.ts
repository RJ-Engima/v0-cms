import { type NextRequest, NextResponse } from "next/server"
import { extractDataFromHtml } from "@/lib/data-extraction/html-extractor"
import { fetchUrlContent } from "@/lib/data-extraction/url-fetcher"
import { fetchPerformanceMetrics } from "@/lib/data-extraction/performance-fetcher"
import { runCompleteAnalysis } from "@/lib/analyzers"
import type { AnalysisOptions } from "@/types/seo-types"

export async function POST(request: NextRequest) {
  try {
    // Parse request body safely
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        {
          error: "Invalid JSON in request body",
        },
        { status: 400 },
      )
    }

    const { url, html, options = {} } = body

    if (!url && !html) {
      return NextResponse.json(
        {
          error: "Either URL or HTML content is required",
        },
        { status: 400 },
      )
    }

    // Get HTML content
    let htmlContent: string
    if (html) {
      htmlContent = html
    } else {
      try {
        htmlContent = await fetchUrlContent(url)
      } catch (error) {
        return NextResponse.json(
          {
            error: `Failed to fetch URL: ${error.message || "Unknown error"}`,
          },
          { status: 400 },
        )
      }
    }

    // Extract data from HTML
    let pageData
    try {
      pageData = await extractDataFromHtml(htmlContent, url || "https://example.com")
    } catch (error) {
      return NextResponse.json(
        {
          error: `Failed to extract data from HTML: ${error.message || "Unknown error"}`,
        },
        { status: 500 },
      )
    }

    // Fetch performance metrics if requested
    if (options.includePerformance) {
      try {
        pageData.performanceMetrics = await fetchPerformanceMetrics(url)
      } catch (error) {
        console.error("Failed to fetch performance metrics:", error)
        // Continue without performance metrics
        pageData.performanceMetrics = null
      }
    }

    // Run analysis
    let analysisResults
    try {
      analysisResults = await runCompleteAnalysis(pageData, options as AnalysisOptions)
    } catch (error) {
      return NextResponse.json(
        {
          error: `Analysis failed: ${error.message || "Unknown error"}`,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(analysisResults)
  } catch (error) {
    console.error("Unhandled error in SEO analysis:", error)
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
