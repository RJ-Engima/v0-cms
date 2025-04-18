"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Search, FileText, BarChart2, Zap, Code2, ExternalLink, Copy, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PageHeader } from "@/components/dashboard/page-header"
import { cn } from "@/lib/utils"

export default function SEODocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const mainRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const sections = [
    { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
    { id: "architecture", label: "Architecture", icon: <BarChart2 className="h-4 w-4" /> },
    { id: "parameters", label: "Parameters", icon: <Zap className="h-4 w-4" /> },
    { id: "categories", label: "Analysis Categories", icon: <Search className="h-4 w-4" /> },
    { id: "reports", label: "Report Generation", icon: <FileText className="h-4 w-4" /> },
    { id: "api", label: "API Reference", icon: <Code2 className="h-4 w-4" /> },
    { id: "faq", label: "FAQ", icon: <Info className="h-4 w-4" /> },
  ]

  const filteredSections = searchQuery
    ? sections.filter((section) => section.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : sections

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section.id)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id)
          break
        }
      }
    }
  }

  // Example API request code
  const apiRequestCode = `// Example API request
fetch("/api/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://example.com",
    options: {
      includePerformance: true,
      includeKeywordSuggestions: true,
      includeSocialAnalysis: true,
      includeCompetitorAnalysis: false,
      customKeywords: ["seo", "analytics", "headless cms"]
    }
  })
})`

  return (
    <div className="relative min-h-screen pb-16">
      {/* Floating header with progress bar */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b"
        style={{ opacity }}
      >
        <div className="container mx-auto py-2 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">SEO Tool Documentation</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/seo">Back to Reports</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/dashboard/seo/analyze">Try the Tool</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-muted">
          <motion.div className="h-full bg-primary" style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }} />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 pt-6">
        <PageHeader title="SEO Tool Documentation" description="Comprehensive guide to using our SEO analysis tool" />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Sidebar navigation */}
          <div className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="mb-4">
                <Input
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              <nav className="space-y-1">
                {filteredSections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      activeSection === section.id ? "bg-primary text-primary-foreground" : "",
                    )}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.icon}
                    <span className="ml-2">{section.label}</span>
                  </Button>
                ))}
              </nav>

              <div className="mt-8 rounded-lg border p-4 bg-muted/50">
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you can't find what you're looking for, reach out to our support team.
                </p>
                <Button size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <main ref={mainRef} className="flex-1 max-w-3xl" onScroll={handleScroll}>
            <section id="overview" className="mb-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="lead">
                    Our SEO Analysis Tool provides comprehensive insights into your website's search engine optimization
                    performance. It analyzes various aspects of your website and provides actionable recommendations to
                    improve your search engine rankings.
                  </p>

                  <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Comprehensive Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Analyzes 10+ critical SEO factors including meta tags, content, keywords, and more.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Actionable Insights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Get specific recommendations to improve your website's SEO performance.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Track Core Web Vitals and other performance metrics that affect rankings.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      <span>
                        <strong>Real-time Analysis:</strong> Get instant feedback on your website's SEO performance.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      <span>
                        <strong>Detailed Reports:</strong> Comprehensive reports with scores for each category.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      <span>
                        <strong>Customizable Analysis:</strong> Focus on specific aspects of SEO that matter to you.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      <span>
                        <strong>Historical Tracking:</strong> Monitor your SEO progress over time.
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </section>

            <section id="architecture" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Architecture</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The SEO Analysis Tool is built with a modular architecture that allows for flexible and extensible
                    analysis. Each component of the system is designed to work independently while contributing to the
                    overall analysis.
                  </p>

                  <div className="my-8 rounded-xl border p-6 bg-muted/30">
                    <h3 className="text-xl font-semibold mb-4">System Architecture</h3>
                    <div className="relative">
                      {/* Architecture diagram */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-3">
                          <div className="h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                            <span className="font-medium">User Interface</span>
                          </div>
                        </div>

                        <div className="col-span-3">
                          <div className="h-16 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <span className="font-medium">API Layer</span>
                          </div>
                        </div>

                        <div>
                          <div className="h-16 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <span className="font-medium">Data Extraction</span>
                          </div>
                        </div>

                        <div>
                          <div className="h-16 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <span className="font-medium">Analysis Engine</span>
                          </div>
                        </div>

                        <div>
                          <div className="h-16 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <span className="font-medium">Report Generator</span>
                          </div>
                        </div>

                        <div className="col-span-3">
                          <div className="h-16 rounded-lg bg-slate-500/20 flex items-center justify-center">
                            <span className="font-medium">Storage Layer</span>
                          </div>
                        </div>
                      </div>

                      {/* Connecting lines */}
                      <div className="absolute top-[16px] left-1/2 w-0.5 h-[24px] bg-border -translate-x-1/2"></div>
                      <div className="absolute top-[72px] left-1/2 w-0.5 h-[24px] bg-border -translate-x-1/2"></div>
                      <div className="absolute top-[128px] left-1/6 w-0.5 h-[24px] bg-border"></div>
                      <div className="absolute top-[128px] left-1/2 w-0.5 h-[24px] bg-border -translate-x-1/2"></div>
                      <div className="absolute top-[128px] left-5/6 w-0.5 h-[24px] bg-border"></div>
                      <div className="absolute top-[184px] left-1/6 w-0.5 h-[24px] bg-border"></div>
                      <div className="absolute top-[184px] left-1/2 w-0.5 h-[24px] bg-border -translate-x-1/2"></div>
                      <div className="absolute top-[184px] left-5/6 w-0.5 h-[24px] bg-border"></div>
                      <div className="absolute top-[128px] left-1/6 w-2/3 h-0.5 bg-border"></div>
                      <div className="absolute top-[184px] left-1/6 w-2/3 h-0.5 bg-border"></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Component Breakdown</h3>

                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium text-primary">Data Extraction</h4>
                      <p className="text-sm mt-2">
                        Responsible for fetching HTML content from URLs, parsing the content, and extracting relevant
                        data for analysis. This includes meta tags, headings, images, links, and more.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium text-primary">Analysis Engine</h4>
                      <p className="text-sm mt-2">
                        Processes the extracted data through various analyzers, each focusing on a specific aspect of
                        SEO. The engine calculates scores, identifies issues, and generates recommendations.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium text-primary">Report Generator</h4>
                      <p className="text-sm mt-2">
                        Compiles the results from the Analysis Engine into a comprehensive report. It calculates the
                        overall score, organizes issues by severity, and formats the data for presentation.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium text-primary">Storage Layer</h4>
                      <p className="text-sm mt-2">
                        Stores historical reports and analysis data for tracking progress over time. This allows users
                        to compare results and see improvements.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="parameters" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Analysis Parameters</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The SEO Analysis Tool accepts various parameters to customize the analysis process. These parameters
                    allow you to focus on specific aspects of SEO and tailor the analysis to your needs.
                  </p>

                  <Alert className="my-6">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      All parameters are optional. If not provided, the tool will use default values.
                    </AlertDescription>
                  </Alert>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Core Parameters</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Parameter</th>
                          <th className="py-2 px-4 text-left">Type</th>
                          <th className="py-2 px-4 text-left">Default</th>
                          <th className="py-2 px-4 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">url</td>
                          <td className="py-2 px-4">string</td>
                          <td className="py-2 px-4">-</td>
                          <td className="py-2 px-4">
                            The URL of the website to analyze. Required if html is not provided.
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">html</td>
                          <td className="py-2 px-4">string</td>
                          <td className="py-2 px-4">-</td>
                          <td className="py-2 px-4">The HTML content to analyze. Required if url is not provided.</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">options</td>
                          <td className="py-2 px-4">object</td>
                          <td className="py-2 px-4">{}</td>
                          <td className="py-2 px-4">Additional options to customize the analysis.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Analysis Options</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Option</th>
                          <th className="py-2 px-4 text-left">Type</th>
                          <th className="py-2 px-4 text-left">Default</th>
                          <th className="py-2 px-4 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">includePerformance</td>
                          <td className="py-2 px-4">boolean</td>
                          <td className="py-2 px-4">true</td>
                          <td className="py-2 px-4">Include performance metrics in the analysis.</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">includeKeywordSuggestions</td>
                          <td className="py-2 px-4">boolean</td>
                          <td className="py-2 px-4">true</td>
                          <td className="py-2 px-4">Include keyword suggestions in the analysis.</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">includeSocialAnalysis</td>
                          <td className="py-2 px-4">boolean</td>
                          <td className="py-2 px-4">true</td>
                          <td className="py-2 px-4">Include social media tag analysis.</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">includeCompetitorAnalysis</td>
                          <td className="py-2 px-4">boolean</td>
                          <td className="py-2 px-4">false</td>
                          <td className="py-2 px-4">Include competitor analysis (may take longer).</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">customKeywords</td>
                          <td className="py-2 px-4">string[]</td>
                          <td className="py-2 px-4">[]</td>
                          <td className="py-2 px-4">Custom keywords to analyze.</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">locale</td>
                          <td className="py-2 px-4">string</td>
                          <td className="py-2 px-4">"en"</td>
                          <td className="py-2 px-4">The locale for the analysis.</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">device</td>
                          <td className="py-2 px-4">string</td>
                          <td className="py-2 px-4">"mobile"</td>
                          <td className="py-2 px-4">The device type for the analysis ("mobile" or "desktop").</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Example Usage</h3>

                  <div className="relative rounded-lg bg-muted p-4 overflow-hidden">
                    <pre className="text-sm overflow-x-auto">{apiRequestCode}</pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleCopyCode(apiRequestCode)}
                    >
                      {copiedCode === apiRequestCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="categories" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Analysis Categories</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The SEO Analysis Tool evaluates your website across multiple categories, each focusing on a specific
                    aspect of SEO. Each category is scored independently, and the overall score is a weighted average of
                    all category scores.
                  </p>

                  <Tabs defaultValue="meta" className="mt-8">
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-4">
                      <TabsTrigger value="meta">Meta Tags</TabsTrigger>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="keywords">Keywords</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                      <TabsTrigger value="technical">Technical</TabsTrigger>
                    </TabsList>

                    <TabsContent value="meta" className="rounded-lg border p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Meta Tags Analysis</h3>
                          <p className="text-sm text-muted-foreground">
                            Evaluates title, description, and other meta tags
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 mt-6">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Title Tag</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>High</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Analyzes the presence, length, and keyword usage in the title tag. The ideal length is between
                          50-60 characters.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Meta Description</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Checks for the presence and quality of the meta description. The ideal length is between
                          120-160 characters.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Canonical URL</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Verifies if a canonical URL is specified to prevent duplicate content issues.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Viewport</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Checks if the viewport meta tag is properly set for mobile responsiveness.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="content" className="rounded-lg border p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Content Analysis</h3>
                          <p className="text-sm text-muted-foreground">
                            Evaluates the quality and structure of your content
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 mt-6">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Content Length</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>High</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Analyzes the word count of your content. Longer, comprehensive content tends to rank better.
                          Aim for at least 600 words for competitive topics.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Readability</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Evaluates the readability of your content using metrics like sentence length and paragraph
                          structure.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Content Structure</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Checks if your content is well-structured with proper headings, paragraphs, and lists.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Keyword Usage</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>High</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Analyzes how well keywords are integrated into your content, including density and placement.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="keywords" className="rounded-lg border p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <Search className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Keywords Analysis</h3>
                          <p className="text-sm text-muted-foreground">Evaluates keyword usage and optimization</p>
                        </div>
                      </div>

                      <div className="space-y-4 mt-6">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Keyword Presence</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>High</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Checks if keywords are present in important elements like title, headings, and content.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Keyword Density</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Analyzes the frequency of keywords in your content. Ideal density is between 1-2%.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Keyword Variations</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Checks if you're using variations of your keywords for better semantic relevance.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Keyword Competition</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Low</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Evaluates the competitiveness of your keywords (only available with competitor analysis
                          enabled).
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="performance" className="rounded-lg border p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Performance Analysis</h3>
                          <p className="text-sm text-muted-foreground">Evaluates page speed and Core Web Vitals</p>
                        </div>
                      </div>

                      <div className="space-y-4 mt-6">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Largest Contentful Paint (LCP)</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>High</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Measures loading performance. Good: &lt; 2.5s, Needs Improvement: 2.5s - 4s, Poor: &gt; 4s
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">First Input Delay (FID)</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Measures interactivity. Good: &lt; 100ms, Needs Improvement: 100ms - 300ms, Poor: &gt; 300ms
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Cumulative Layout Shift (CLS)</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Measures visual stability. Good: &lt; 0.1, Needs Improvement: 0.1 - 0.25, Poor: &gt; 0.25
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Time to First Byte (TTFB)</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Measures server response time. Good: &lt; 500ms, Needs Improvement: 500ms - 1s, Poor: &gt; 1s
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="technical" className="rounded-lg border p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-900/30 flex items-center justify-center text-slate-600 dark:text-slate-400">
                          <Code2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Technical SEO Analysis</h3>
                          <p className="text-sm text-muted-foreground">Evaluates technical aspects of your website</p>
                        </div>
                      </div>

                      <div className="space-y-4 mt-6">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Mobile Friendliness</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>High</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Checks if your website is optimized for mobile devices, including viewport settings and tap
                          targets.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">HTTPS</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>High</Badge>
                          </div>
                        </div>
                        <p className="text-sm">Verifies if your website is using HTTPS for secure connections.</p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Structured Data</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Medium</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Checks for the presence and validity of structured data (Schema.org) markup.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Social Media Tags</span>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Weight:</span>
                            <Badge>Low</Badge>
                          </div>
                        </div>
                        <p className="text-sm">
                          Verifies if Open Graph and Twitter Card tags are properly implemented.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Category Weights</h3>

                  <p>
                    The overall SEO score is calculated as a weighted average of all category scores. The weights
                    reflect the relative importance of each category in search engine rankings.
                  </p>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Meta Tags</span>
                        <Badge variant="outline">1.5x</Badge>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Content</span>
                        <Badge variant="outline">2.0x</Badge>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Keywords</span>
                        <Badge variant="outline">1.5x</Badge>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-amber-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Performance</span>
                        <Badge variant="outline">1.5x</Badge>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-purple-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Mobile</span>
                        <Badge variant="outline">1.5x</Badge>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-orange-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Technical</span>
                        <Badge variant="outline">1.0x</Badge>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-slate-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: "50%" }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="reports" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Report Generation</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The SEO Analysis Tool generates comprehensive reports that provide insights into your website's SEO
                    performance. Reports are generated in real-time and can be saved for future reference.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Report Structure</h3>

                  <div className="rounded-lg border p-6 bg-muted/30 my-6">
                    <h4 className="font-medium mb-4">Report Components</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Overview</h5>
                          <p className="text-sm">
                            Provides a summary of the analysis, including the overall score, timestamp, and URL.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Performance Metrics</h5>
                          <p className="text-sm">
                            Displays Core Web Vitals and other performance metrics with visual indicators.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Category Analysis</h5>
                          <p className="text-sm">
                            Detailed analysis for each category, including scores, issues, and recommendations.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Issues Summary</h5>
                          <p className="text-sm">
                            Lists all identified issues, grouped by severity (critical, warning, info).
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
                          <span className="text-xs font-bold">5</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Recommendations</h5>
                          <p className="text-sm">
                            Actionable recommendations to improve your website's SEO performance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Scoring System</h3>

                  <p>
                    Each category is scored on a scale of 0-100, with 100 being the best possible score. The overall
                    score is a weighted average of all category scores.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <div className="rounded-lg border p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        <h4 className="font-medium text-red-700 dark:text-red-400">Critical (0-49)</h4>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        Serious issues that need immediate attention. These issues have a significant negative impact on
                        your SEO.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                        <h4 className="font-medium text-amber-700 dark:text-amber-400">Warning (50-69)</h4>
                      </div>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Issues that should be addressed but are not critical. These issues have a moderate impact on
                        your SEO.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                        <h4 className="font-medium text-emerald-700 dark:text-emerald-400">Good (70-100)</h4>
                      </div>
                      <p className="text-sm text-emerald-700 dark:text-emerald-400">
                        No significant issues found. Your website is well-optimized for this category.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Report History</h3>

                  <p>
                    The SEO Analysis Tool keeps a history of all reports generated for your website. This allows you to
                    track your progress over time and see the impact of your optimizations.
                  </p>

                  <div className="rounded-lg border p-4 my-6">
                    <h4 className="font-medium mb-4">Historical Tracking</h4>
                    <p className="text-sm mb-4">
                      Reports are stored in the database and can be accessed at any time. You can compare reports to see
                      how your SEO performance has changed over time.
                    </p>

                    <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Historical score tracking chart</p>
                        <p className="text-xs text-muted-foreground">
                          (Visualization will be based on your actual data)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="api" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">API Reference</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The SEO Analysis Tool provides a RESTful API that allows you to integrate the tool into your own
                    applications. The API follows standard HTTP conventions and returns JSON responses.
                  </p>

                  <Alert className="my-6">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Authentication</AlertTitle>
                    <AlertDescription>
                      API access requires authentication. Contact support to get your API key.
                    </AlertDescription>
                  </Alert>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Endpoints</h3>

                  <div className="rounded-lg border overflow-hidden my-6">
                    <div className="bg-primary text-primary-foreground p-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
                        >
                          POST
                        </Badge>
                        <span className="font-mono text-sm">/api/analyze</span>
                      </div>
                      <p className="text-sm mt-2">Analyze a website or HTML content</p>
                    </div>

                    <div className="p-4">
                      <h4 className="font-medium mb-2">Request Body</h4>
                      <div className="relative rounded-lg bg-muted p-4 overflow-hidden">
                        <pre className="text-sm overflow-x-auto">
                          {`{
  "url": "https://example.com",  // Required if html is not provided
  "html": "<html>...</html>",    // Required if url is not provided
  "options": {
    "includePerformance": true,
    "includeKeywordSuggestions": true,
    "includeSocialAnalysis": true,
    "includeCompetitorAnalysis": false,
    "customKeywords": ["seo", "analytics"],
    "locale": "en",
    "device": "mobile"
  }
}`}
                        </pre>
                      </div>

                      <h4 className="font-medium mt-4 mb-2">Response</h4>
                      <div className="relative rounded-lg bg-muted p-4 overflow-hidden">
                        <pre className="text-sm overflow-x-auto">
                          {`{
  "url": "https://example.com",
  "overallScore": 78,
  "timestamp": "2023-12-05T14:30:00Z",
  "categories": {
    "meta": {
      "score": 85,
      "feedbacks": [...],
      "data": {...},
      "info": "..."
    },
    "content": {
      "score": 92,
      "feedbacks": [...],
      "data": {...},
      "info": "..."
    },
    // Other categories...
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden my-6">
                    <div className="bg-blue-500 text-white p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                          GET
                        </Badge>
                        <span className="font-mono text-sm">/api/reports</span>
                      </div>
                      <p className="text-sm mt-2">Get a list of all reports</p>
                    </div>

                    <div className="p-4">
                      <h4 className="font-medium mb-2">Query Parameters</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-2 px-4 text-left">Parameter</th>
                              <th className="py-2 px-4 text-left">Type</th>
                              <th className="py-2 px-4 text-left">Default</th>
                              <th className="py-2 px-4 text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2 px-4 font-medium">limit</td>
                              <td className="py-2 px-4">number</td>
                              <td className="py-2 px-4">10</td>
                              <td className="py-2 px-4">Number of reports to return</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 px-4 font-medium">offset</td>
                              <td className="py-2 px-4">number</td>
                              <td className="py-2 px-4">0</td>
                              <td className="py-2 px-4">Number of reports to skip</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 px-4 font-medium">sort</td>
                              <td className="py-2 px-4">string</td>
                              <td className="py-2 px-4">"date"</td>
                              <td className="py-2 px-4">Sort by "date", "score", or "domain"</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h4 className="font-medium mt-4 mb-2">Response</h4>
                      <div className="relative rounded-lg bg-muted p-4 overflow-hidden">
                        <pre className="text-sm overflow-x-auto">
                          {`{
  "reports": [
    {
      "id": "report-1",
      "url": "https://example.com",
      "domain": "example.com",
      "overallScore": 78,
      "lastAnalyzed": "2023-12-05T14:30:00Z",
      "issuesSummary": {
        "critical": 1,
        "warnings": 4,
        "passed": 18
      }
    },
    // More reports...
  ],
  "total": 42,
  "limit": 10,
  "offset": 0
}`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden my-6">
                    <div className="bg-emerald-500 text-white p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                          GET
                        </Badge>
                        <span className="font-mono text-sm">/api/reports/{"{reportId}"}</span>
                      </div>
                      <p className="text-sm mt-2">Get a specific report by ID</p>
                    </div>

                    <div className="p-4">
                      <h4 className="font-medium mb-2">Path Parameters</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-2 px-4 text-left">Parameter</th>
                              <th className="py-2 px-4 text-left">Type</th>
                              <th className="py-2 px-4 text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2 px-4 font-medium">reportId</td>
                              <td className="py-2 px-4">string</td>
                              <td className="py-2 px-4">ID of the report to retrieve</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h4 className="font-medium mt-4 mb-2">Response</h4>
                      <div className="relative rounded-lg bg-muted p-4 overflow-hidden">
                        <pre className="text-sm overflow-x-auto">
                          {`{
  "id": "report-1",
  "url": "https://example.com",
  "overallScore": 78,
  "timestamp": "2023-12-05T14:30:00Z",
  "categories": {
    "meta": {
      "score": 85,
      "feedbacks": [...],
      "data": {...},
      "info": "..."
    },
    // Other categories...
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Error Handling</h3>

                  <p>
                    The API returns standard HTTP status codes to indicate the success or failure of a request. In case
                    of an error, the response body will contain an error message.
                  </p>

                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Status Code</th>
                          <th className="py-2 px-4 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">200 OK</td>
                          <td className="py-2 px-4">The request was successful</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">400 Bad Request</td>
                          <td className="py-2 px-4">The request was invalid or missing required parameters</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">401 Unauthorized</td>
                          <td className="py-2 px-4">Authentication failed or API key is missing</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">404 Not Found</td>
                          <td className="py-2 px-4">The requested resource was not found</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">429 Too Many Requests</td>
                          <td className="py-2 px-4">Rate limit exceeded</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">500 Internal Server Error</td>
                          <td className="py-2 px-4">An error occurred on the server</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="relative rounded-lg bg-muted p-4 overflow-hidden my-6">
                    <h4 className="font-medium mb-2">Error Response Example</h4>
                    <pre className="text-sm overflow-x-auto">
                      {`{
  "error": "Invalid URL format",
  "status": 400,
  "message": "The URL provided is not valid. Please provide a valid URL."
}`}
                    </pre>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="faq" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <div className="space-y-6">
                    <div className="rounded-lg border p-6">
                      <h3 className="text-xl font-semibold mb-2">How often should I run an SEO analysis?</h3>
                      <p>
                        We recommend running an SEO analysis at least once a month to track your progress and identify
                        new issues. If you're actively working on improving your SEO, you might want to run it more
                        frequently, such as weekly or bi-weekly.
                      </p>
                    </div>

                    <div className="rounded-lg border p-6">
                      <h3 className="text-xl font-semibold mb-2">How long does it take to analyze a website?</h3>
                      <p>
                        The analysis typically takes 10-30 seconds, depending on the size of your website and the
                        options selected. If you enable competitor analysis, it may take longer.
                      </p>
                    </div>

                    <div className="rounded-lg border p-6">
                      <h3 className="text-xl font-semibold mb-2">Can I analyze multiple pages at once?</h3>
                      <p>
                        Currently, the tool analyzes one page at a time. However, you can run multiple analyses in
                        succession and compare the results. We're working on adding support for bulk analysis in the
                        future.
                      </p>
                    </div>

                    <div className="rounded-lg border p-6">
                      <h3 className="text-xl font-semibold mb-2">How accurate is the analysis?</h3>
                      <p>
                        The analysis is based on industry best practices and search engine guidelines. While it provides
                        valuable insights, it's important to remember that search engine algorithms are complex and
                        constantly evolving. The tool should be used as a guide, not as a definitive measure of your SEO
                        performance.
                      </p>
                    </div>

                    <div className="rounded-lg border p-6">
                      <h3 className="text-xl font-semibold mb-2">Can I export the reports?</h3>
                      <p>
                        Yes, you can export reports in PDF or CSV format. This allows you to share the reports with your
                        team or clients, or to keep a record of your SEO progress over time.
                      </p>
                    </div>

                    <div className="rounded-lg border p-6">
                      <h3 className="text-xl font-semibold mb-2">How do I fix the issues identified in the report?</h3>
                      <p>
                        Each issue in the report comes with a recommendation on how to fix it. For more detailed
                        guidance, you can refer to our SEO best practices guide or contact our support team for
                        assistance.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-lg border p-6 bg-primary/5">
                    <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
                    <p className="mb-4">
                      If you couldn't find the answer to your question, feel free to reach out to our support team.
                      We're here to help you get the most out of our SEO Analysis Tool.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1">Contact Support</Button>
                      <Button variant="outline" className="flex-1">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Knowledge Base
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <div className="mt-16 flex justify-center">
              <div className="flex flex-col items-center text-center max-w-md">
                <h2 className="text-2xl font-bold mb-4">Ready to analyze your website?</h2>
                <p className="text-muted-foreground mb-6">
                  Get a comprehensive SEO analysis and start improving your search engine rankings today.
                </p>
                <Button size="lg" asChild>
                  <Link href="/dashboard/seo/analyze" className="gap-2">
                    <Search className="h-4 w-4" />
                    Start Analysis
                  </Link>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
