"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ContentGrowthData {
  month: string
  posts: number
  pages: number
  products: number
}

interface ContentGrowthChartProps {
  data: ContentGrowthData[]
}

export function ContentGrowthChart({ data }: ContentGrowthChartProps) {
  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Content Growth</CardTitle>
        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
          <Download className="h-3.5 w-3.5" />
          <span>Export</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList className="mb-4">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="mt-0">
            <div className="h-[300px]">
              <BarChart
                data={data}
                index="month"
                categories={[
                  { key: "posts", name: "Blog Posts", color: "#3b82f6" },
                  { key: "pages", name: "Pages", color: "#8b5cf6" },
                  { key: "products", name: "Products", color: "#10b981" },
                ]}
                valueFormatter={(value) => `${value}`}
                showLegend={true}
                showXAxis={true}
                showYAxis={true}
                showGrid={true}
                height={300}
              />
            </div>
          </TabsContent>
          <TabsContent value="line" className="mt-0">
            <div className="h-[300px]">
              <LineChart
                data={data}
                index="month"
                categories={[
                  { key: "posts", name: "Blog Posts", color: "#3b82f6" },
                  { key: "pages", name: "Pages", color: "#8b5cf6" },
                  { key: "products", name: "Products", color: "#10b981" },
                ]}
                valueFormatter={(value) => `${value}`}
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
