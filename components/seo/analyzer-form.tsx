"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Link, Code, Cog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import type { CompleteAnalysisResults } from "@/types/seo-types"

const formSchema = z
  .object({
    url: z.string().url().optional(),
    html: z.string().optional(),
    includePerformance: z.boolean().default(true),
    includeKeywordSuggestions: z.boolean().default(true),
    includeSocialAnalysis: z.boolean().default(true),
    includeCompetitorAnalysis: z.boolean().default(false),
    customKeywords: z.string().optional(),
  })
  .refine((data) => data.url || data.html, {
    message: "Either URL or HTML must be provided",
    path: ["url"],
  })

interface AnalyzerFormProps {
  onAnalysisComplete: (results: CompleteAnalysisResults) => void
}

export function AnalyzerForm({ onAnalysisComplete }: AnalyzerFormProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("url")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      html: "",
      includePerformance: true,
      includeKeywordSuggestions: true,
      includeSocialAnalysis: true,
      includeCompetitorAnalysis: false,
      customKeywords: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAnalyzing(true)

    try {
      // Prepare options
      const options = {
        includePerformance: values.includePerformance,
        includeKeywordSuggestions: values.includeKeywordSuggestions,
        includeSocialAnalysis: values.includeSocialAnalysis,
        includeCompetitorAnalysis: values.includeCompetitorAnalysis,
        customKeywords: values.customKeywords ? values.customKeywords.split(",").map((k) => k.trim()) : undefined,
      }

      // Prepare request body
      const requestBody = {
        url: values.url,
        html: values.html,
        options,
      }

      // Send request to API
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze")
      }

      onAnalysisComplete(data)
    } catch (error) {
      console.error("Analysis error:", error)
      // Add proper error handling here - in a real app, you would show an error message to the user
      alert(`Analysis failed: ${error.message || "Unknown error"}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                Analyze URL
              </TabsTrigger>
              <TabsTrigger value="html" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Analyze HTML
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="mt-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>Enter the full URL of the page you want to analyze.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="html" className="mt-4">
              <FormField
                control={form.control}
                name="html"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HTML Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your HTML here..."
                        className="min-h-[200px] font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Paste the complete HTML of the page you want to analyze.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
            <div className="flex items-center mb-3">
              <Cog className="h-5 w-5 mr-2 text-slate-500" />
              <h3 className="text-sm font-medium">Analysis Options</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="includePerformance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Performance Analysis</FormLabel>
                      <FormDescription>Analyze page speed and performance metrics</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="includeKeywordSuggestions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Keyword Suggestions</FormLabel>
                      <FormDescription>Get keyword recommendations for your content</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="includeSocialAnalysis"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Social Media Analysis</FormLabel>
                      <FormDescription>Analyze Open Graph and Twitter Card tags</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="includeCompetitorAnalysis"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Competitor Analysis</FormLabel>
                      <FormDescription>Compare with top-ranking pages (may take longer)</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="customKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Keywords (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="keyword1, keyword2, keyword3" {...field} />
                    </FormControl>
                    <FormDescription>Enter specific keywords to analyze, separated by commas</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Now"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
