// Sample SEO reports for real websites
export const sampleSEOReports = [
  {
    id: "m2pfintech",
    url: "https://m2pfintech.com",
    domain: "m2pfintech.com",
    overallScore: 78,
    lastAnalyzed: "2023-12-05T14:30:00Z",
    issuesSummary: {
      critical: 1,
      warnings: 4,
      passed: 18,
    },
    contentType: "Corporate Website",
    pageSpeed: 82,
    categories: {
      meta: {
        score: 85,
        data: {
          title: "M2P Fintech - Global API Infrastructure Company",
          metaDescription:
            "M2P Fintech is a global API infrastructure company that enables businesses of any scale to embed financial products in their customer journeys.",
          canonical: "https://m2pfintech.com",
          viewport: "width=device-width, initial-scale=1",
        },
        info: "Meta tags provide information about your page to search engines and social media platforms.",
      },
      content: {
        score: 92,
        data: {
          wordCount: 1850,
          sentenceCount: 92,
          avgWordsPerSentence: "20.1",
          paragraphCount: 28,
          longParagraphCount: 3,
        },
        info: "Content quality is a primary ranking factor for search engines.",
      },
      keywords: {
        score: 76,
        data: {
          keywords: [
            { keyword: "fintech", count: 24, density: 1.3, inTitle: true, inDescription: true, inHeadings: true },
            { keyword: "api", count: 18, density: 0.9, inTitle: true, inDescription: true, inHeadings: true },
            {
              keyword: "infrastructure",
              count: 12,
              density: 0.6,
              inTitle: true,
              inDescription: true,
              inHeadings: false,
            },
            { keyword: "banking", count: 15, density: 0.8, inTitle: false, inDescription: true, inHeadings: true },
            { keyword: "payments", count: 20, density: 1.1, inTitle: false, inDescription: false, inHeadings: true },
          ],
        },
        info: "Keywords help search engines understand your content's relevance to user queries.",
      },
      headings: {
        score: 88,
        data: {
          h1Count: 1,
          h2Count: 8,
          h3Count: 12,
          h4Count: 6,
          h5Count: 0,
          h6Count: 0,
          headings: {
            h1: ["Global API Infrastructure Company"],
            h2: [
              "Our Solutions",
              "Why M2P Fintech",
              "Products",
              "Industries",
              "Resources",
              "Customers",
              "Partners",
              "Contact Us",
            ],
            h3: [
              "Credit",
              "Payments",
              "Banking",
              "Embedded Finance",
              "BNPL",
              "Card Issuing",
              "Digital Banking",
              "Lending",
              "Neobanking",
              "Wealth Management",
              "Insurance",
              "Rewards",
            ],
            h4: ["Case Studies", "Blogs", "Whitepapers", "Events", "News", "Careers"],
            h5: [],
            h6: [],
          },
        },
        info: "Headings provide structure to your content and help search engines understand content hierarchy.",
      },
      images: {
        score: 65,
        data: {
          totalImages: 32,
          imagesWithAlt: 28,
          imagesWithDimensions: 24,
          analyzedImages: [
            {
              src: "/hero-banner.jpg",
              alt: "M2P Fintech API Infrastructure",
              dimensions: { width: 1920, height: 1080 },
              fileType: "jpg",
              issues: [],
            },
            {
              src: "/product-diagram.png",
              alt: "",
              dimensions: { width: 800, height: 600 },
              fileType: "png",
              issues: [{ id: "missing-alt", message: "Image missing alt text", severity: "warning", impact: 5 }],
            },
            {
              src: "/team-photo.jpg",
              alt: "M2P Leadership Team",
              dimensions: { width: 1200, height: 800 },
              fileType: "jpg",
              issues: [],
            },
            {
              src: "/partner-logos.png",
              alt: "Our Partners",
              dimensions: { width: 0, height: 0 },
              fileType: "png",
              issues: [
                {
                  id: "missing-dimensions",
                  message: "Image missing width/height attributes",
                  severity: "warning",
                  impact: 3,
                },
              ],
            },
          ],
        },
        info: "Images can significantly impact your site's load time and user engagement.",
      },
      links: {
        score: 79,
        data: {
          totalLinks: 86,
          internalLinks: 64,
          externalLinks: 22,
          emptyTextLinks: 2,
          genericTextLinks: 5,
        },
        info: "Links help search engines discover and understand the relationship between pages.",
      },
      performance: {
        score: 82,
        data: {
          lcp: 2100,
          fid: 85,
          cls: 0.08,
          ttfb: 420,
          pageSize: 1850000,
          requestCount: 48,
          lcpCategory: "good",
          fidCategory: "good",
          clsCategory: "good",
          ttfbCategory: "good",
        },
        info: "Page speed is a critical ranking factor. Core Web Vitals measure real-world user experience.",
      },
      mobile: {
        score: 75,
        data: {
          hasViewport: true,
          viewportContent: "width=device-width, initial-scale=1",
        },
        info: "Mobile-friendliness is a critical ranking factor for search engines.",
      },
      security: {
        score: 95,
        data: {
          isHttps: true,
          hasContentSecurityPolicy: true,
          hasXFrameOptions: true,
        },
        info: "Security is increasingly important for SEO. Google favors secure websites.",
      },
      social: {
        score: 68,
        data: {
          openGraph: {
            title: "M2P Fintech - Global API Infrastructure Company",
            description:
              "M2P Fintech is a global API infrastructure company that enables businesses of any scale to embed financial products.",
            image: "https://m2pfintech.com/og-image.jpg",
            url: "https://m2pfintech.com",
            type: "website",
          },
          twitterCard: {
            card: null,
            title: "M2P Fintech - Global API Infrastructure Company",
            description:
              "M2P Fintech is a global API infrastructure company that enables businesses of any scale to embed financial products.",
            image: "https://m2pfintech.com/og-image.jpg",
          },
        },
        info: "Social media tags help control how your content appears when shared on platforms like Facebook and Twitter.",
      },
      "structured-data": {
        score: 72,
        data: {
          hasStructuredData: true,
          hasJsonLd: true,
          hasMicrodata: false,
          hasRdfa: false,
        },
        info: "Structured data helps search engines understand your content and can enable rich results in search results.",
      },
    },
    issues: [
      {
        category: "images",
        message: "4 images missing alt text",
        severity: "warning",
      },
      {
        category: "performance",
        message: "Large JavaScript bundle size (1.2MB)",
        severity: "warning",
      },
      {
        category: "mobile",
        message: "Tap targets too close on mobile devices",
        severity: "warning",
      },
      {
        category: "social",
        message: "Missing Twitter card metadata",
        severity: "warning",
      },
      {
        category: "meta",
        message: "Meta description too short on 3 pages",
        severity: "critical",
      },
    ],
  },
  {
    id: "livquik",
    url: "https://livquik.com",
    domain: "livquik.com",
    overallScore: 65,
    lastAnalyzed: "2023-12-04T09:15:00Z",
    issuesSummary: {
      critical: 2,
      warnings: 7,
      passed: 14,
    },
    contentType: "Financial Services",
    pageSpeed: 68,
    categories: {
      meta: { score: 72 },
      content: { score: 80 },
      keywords: { score: 65 },
      headings: { score: 70 },
      images: { score: 58 },
      links: { score: 62 },
      performance: {
        score: 68,
        data: {
          lcp: 2800,
          fid: 110,
          cls: 0.12,
          ttfb: 580,
          pageSize: 2300000,
          requestCount: 62,
        },
      },
      mobile: { score: 60 },
      security: { score: 88 },
      social: { score: 55 },
      "structured-data": { score: 45 },
    },
    issues: [
      {
        category: "performance",
        message: "Slow Time to First Byte (580ms)",
        severity: "warning",
      },
      {
        category: "images",
        message: "Images not properly sized for responsive display",
        severity: "warning",
      },
      {
        category: "structured-data",
        message: "Missing structured data for key pages",
        severity: "critical",
      },
      {
        category: "mobile",
        message: "Content not optimized for mobile viewport",
        severity: "warning",
      },
      {
        category: "links",
        message: "Multiple broken internal links detected",
        severity: "critical",
      },
    ],
  },
  {
    id: "syntizen",
    url: "https://syntizen.com",
    domain: "syntizen.com",
    overallScore: 82,
    lastAnalyzed: "2023-12-03T16:45:00Z",
    issuesSummary: {
      critical: 0,
      warnings: 5,
      passed: 18,
    },
    contentType: "Technology",
    pageSpeed: 85,
    categories: {
      meta: { score: 90 },
      content: { score: 85 },
      keywords: { score: 78 },
      headings: { score: 92 },
      images: { score: 75 },
      links: { score: 88 },
      performance: {
        score: 85,
        data: {
          lcp: 1850,
          fid: 70,
          cls: 0.05,
          ttfb: 320,
          pageSize: 1650000,
          requestCount: 42,
        },
      },
      mobile: { score: 80 },
      security: { score: 95 },
      social: { score: 72 },
      "structured-data": { score: 68 },
    },
    issues: [
      {
        category: "keywords",
        message: "Keyword density too low on product pages",
        severity: "warning",
      },
      {
        category: "social",
        message: "Missing Open Graph image dimensions",
        severity: "warning",
      },
      {
        category: "structured-data",
        message: "Incomplete product structured data",
        severity: "warning",
      },
      {
        category: "images",
        message: "Image compression could be improved",
        severity: "warning",
      },
      {
        category: "content",
        message: "Thin content on 2 service pages",
        severity: "warning",
      },
    ],
  },
  {
    id: "goals101",
    url: "https://goals101.ai",
    domain: "goals101.ai",
    overallScore: 71,
    lastAnalyzed: "2023-12-02T11:20:00Z",
    issuesSummary: {
      critical: 1,
      warnings: 6,
      passed: 16,
    },
    contentType: "AI Technology",
    pageSpeed: 74,
    categories: {
      meta: { score: 82 },
      content: { score: 75 },
      keywords: { score: 68 },
      headings: { score: 80 },
      images: { score: 62 },
      links: { score: 70 },
      performance: {
        score: 74,
        data: {
          lcp: 2450,
          fid: 95,
          cls: 0.09,
          ttfb: 480,
          pageSize: 2100000,
          requestCount: 55,
        },
      },
      mobile: { score: 68 },
      security: { score: 90 },
      social: { score: 65 },
      "structured-data": { score: 60 },
    },
    issues: [
      {
        category: "performance",
        message: "Large CSS files affecting render time",
        severity: "warning",
      },
      {
        category: "images",
        message: "Missing WebP format for images",
        severity: "warning",
      },
      {
        category: "mobile",
        message: "Font size too small on mobile devices",
        severity: "warning",
      },
      {
        category: "security",
        message: "Missing Content Security Policy",
        severity: "critical",
      },
      {
        category: "content",
        message: "Duplicate content on similar pages",
        severity: "warning",
      },
    ],
  },
  {
    id: "careers-m2pfintech",
    url: "https://careers.m2pfintech.com",
    domain: "careers.m2pfintech.com",
    overallScore: 68,
    lastAnalyzed: "2023-12-01T13:10:00Z",
    issuesSummary: {
      critical: 2,
      warnings: 5,
      passed: 16,
    },
    contentType: "Careers Portal",
    pageSpeed: 70,
    categories: {
      meta: { score: 75 },
      content: { score: 82 },
      keywords: { score: 65 },
      headings: { score: 78 },
      images: { score: 60 },
      links: { score: 72 },
      performance: {
        score: 70,
        data: {
          lcp: 2650,
          fid: 105,
          cls: 0.11,
          ttfb: 520,
          pageSize: 2250000,
          requestCount: 58,
        },
      },
      mobile: { score: 65 },
      security: { score: 85 },
      social: { score: 58 },
      "structured-data": { score: 55 },
    },
    issues: [
      {
        category: "performance",
        message: "Render-blocking JavaScript affecting page load",
        severity: "critical",
      },
      {
        category: "images",
        message: "Unoptimized images increasing page size",
        severity: "warning",
      },
      {
        category: "mobile",
        message: "Layout shifts on mobile devices",
        severity: "warning",
      },
      {
        category: "structured-data",
        message: "Missing JobPosting structured data",
        severity: "critical",
      },
      {
        category: "meta",
        message: "Duplicate title tags on job listing pages",
        severity: "warning",
      },
    ],
  },
]

// Detailed report data structure
export interface SEOReportDetail {
  id: string
  url: string
  domain: string
  overallScore: number
  lastAnalyzed: string
  categories: Record<string, any>
  issues: Array<{
    category: string
    message: string
    severity: string
  }>
}

// Function to get report by ID
export function getReportById(id: string): SEOReportDetail | undefined {
  return sampleSEOReports.find((report) => report.id === id)
}
