"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Download, Filter } from "lucide-react"

interface SEOPerformanceData {
  month: string
  organic: number
  direct: number
  referral: number
}

interface SEOPerformanceChartProps {
  data: SEOPerformanceData[]
}

export function SEOPerformanceChart({ data }: SEOPerformanceChartProps) {
  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">SEO Performance</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="traffic">
          <TabsList className="mb-4">
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>
          <TabsContent value="traffic" className="mt-0">
            <div className="h-[300px]">
              <BarChart
                data={data}
                index="month"
                categories={[
                  { key: "organic", name: "Organic Search", color: "#3b82f6" },
                  { key: "direct", name: "Direct", color: "#10b981" },
                  { key: "referral", name: "Referral", color: "#f59e0b" },
                ]}
                valueFormatter={(value) => `${value.toLocaleString()}`}
                showLegend={true}
                showXAxis={true}
                showYAxis={true}
                showGrid={true}
                height={300}
              />
            </div>
          </TabsContent>
          <TabsContent value="growth" className="mt-0">
            <div className="h-[300px]">
              <LineChart
                data={data}
                index="month"
                categories={[
                  { key: "organic", name: "Organic Search", color: "#3b82f6" },
                  { key: "direct", name: "Direct", color: "#10b981" },
                  { key: "referral", name: "Referral", color: "#f59e0b" },
                ]}
                valueFormatter={(value) => `${value.toLocaleString()}`}
                showLegend={true}
                showXAxis={true}
                showYAxis={true}
                showGrid={true}
                height={300}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
