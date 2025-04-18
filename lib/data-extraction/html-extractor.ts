import type { PageData } from "@/types/seo-types"
import { parse } from "node-html-parser"

/**
 * Extracts SEO-relevant data from HTML content
 */
export async function extractDataFromHtml(html: string, url: string): Promise<PageData> {
  try {
    const root = parse(html)

    // Extract basic page data
    const pageData: PageData = {
      url,
      title: extractTitle(root),
      metaTags: extractMetaTags(root),
      headings: extractHeadings(root),
      images: extractImages(root),
      links: extractLinks(root, url),
      content: extractContent(root),
      htmlContent: html,
    }

    return pageData
  } catch (error) {
    console.error("Error extracting data from HTML:", error)
    throw new Error(`HTML extraction failed: ${error.message}`)
  }
}

function extractTitle(root: any): string {
  const titleElement = root.querySelector("title")
  return titleElement ? titleElement.text.trim() : ""
}

function extractMetaTags(root: any): Record<string, string> {
  const metaTags: Record<string, string> = {}
  const metaElements = root.querySelectorAll("meta")

  metaElements.forEach((meta: any) => {
    const name = meta.getAttribute("name") || meta.getAttribute("property")
    const content = meta.getAttribute("content")

    if (name && content) {
      metaTags[name] = content
    }
  })

  return metaTags
}

function extractHeadings(root: any): Record<string, string[]> {
  const headings: Record<string, string[]> = {
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
  }

  for (let i = 1; i <= 6; i++) {
    const elements = root.querySelectorAll(`h${i}`)
    headings[`h${i}`] = elements.map((el: any) => el.text.trim())
  }

  return headings
}

function extractImages(root: any): Array<{ src: string; alt: string; dimensions?: { width: number; height: number } }> {
  const images = root.querySelectorAll("img")

  return images.map((img: any) => ({
    src: img.getAttribute("src") || "",
    alt: img.getAttribute("alt") || "",
    dimensions: {
      width: Number.parseInt(img.getAttribute("width") || "0", 10) || undefined,
      height: Number.parseInt(img.getAttribute("height") || "0", 10) || undefined,
    },
  }))
}

function extractLinks(root: any, baseUrl: string): Array<{ href: string; text: string; isExternal: boolean }> {
  const links = root.querySelectorAll("a")
  const urlObj = new URL(baseUrl)
  const domain = urlObj.hostname

  return links.map((link: any) => {
    const href = link.getAttribute("href") || ""
    let isExternal = false

    if (href.startsWith("http")) {
      try {
        const linkUrl = new URL(href)
        isExternal = linkUrl.hostname !== domain
      } catch {
        // Invalid URL, treat as internal
      }
    }

    return {
      href,
      text: link.text.trim(),
      isExternal,
    }
  })
}

function extractContent(root: any): string {
  // Get text content from body, excluding scripts and styles
  const body = root.querySelector("body")
  if (!body) return ""

  // Remove scripts and styles before getting text
  const scripts = body.querySelectorAll("script")
  const styles = body.querySelectorAll("style")

  scripts.forEach((script: any) => script.remove())
  styles.forEach((style: any) => style.remove())

  return body.text.trim()
}
