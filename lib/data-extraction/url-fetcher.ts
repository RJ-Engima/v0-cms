/**
 * Fetches HTML content from a URL
 */
export async function fetchUrlContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "SEO-Analyzer/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`)
    }

    return await response.text()
  } catch (error) {
    console.error("Error fetching URL:", error)
    throw error
  }
}
