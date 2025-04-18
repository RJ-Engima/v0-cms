"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface ContentTypeData {
  name: string
  count: number
  icon: React.ReactNode
  color: string
  trend: number
  published: number
  draft: number
}

interface ContentOverviewProps {
  contentTypes: ContentTypeData[]
}

export function ContentOverview({ contentTypes }: ContentOverviewProps) {
  // Calculate total counts
  const totalContent = contentTypes.reduce((sum, type) => sum + type.count, 0)
  const totalPublished = contentTypes.reduce((sum, type) => sum + type.published, 0)
  const totalDraft = contentTypes.reduce((sum, type) => sum + type.draft, 0)

  // Calculate percentages for the donut chart
  const typePercentages = contentTypes.map((type) => ({
    ...type,
    percentage: Math.round((type.count / totalContent) * 100),
  }))

  // Generate SVG path for donut chart
  const generateDonutSegments = () => {
    let cumulativePercentage = 0
    return typePercentages.map((type, index) => {
      const startAngle = (cumulativePercentage / 100) * 360
      cumulativePercentage += type.percentage
      const endAngle = (cumulativePercentage / 100) * 360

      const x1 = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
      const y1 = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
      const x2 = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180))
      const y2 = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180))

      const largeArcFlag = type.percentage > 50 ? 1 : 0

      return (
        <path
          key={index}
          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
          fill={`var(--${type.color}-500)`}
          opacity={0.8}
          className="transition-all duration-300 hover:opacity-100"
        />
      )
    })
  }

  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Content Overview</CardTitle>
          <Button size="sm" className="gap-1.5">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="text-xs">New Content</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribution">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="distribution" className="flex-1">
              Distribution
            </TabsTrigger>
            <TabsTrigger value="status" className="flex-1">
              Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="distribution" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative h-[200px] w-[200px]">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="40" fill="var(--muted)" opacity="0.2" />
                    <circle cx="50" cy="50" r="30" fill="var(--background)" />
                    {generateDonutSegments()}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{totalContent}</span>
                    <span className="text-xs text-muted-foreground">Total Content</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Content Types</h4>
                {typePercentages.slice(0, 5).map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full bg-${type.color}-500`} />
                      <span className="text-sm">{type.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{type.count}</span>
                      <Badge variant="outline" className="text-xs">
                        {type.percentage}%
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative h-[200px] w-[200px]">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="40" fill="var(--muted)" opacity="0.2" />
                    <circle cx="50" cy="50" r="30" fill="var(--background)" />
                    <path
                      d={`M 50 50 L 50 10 A 40 40 0 ${(totalPublished / totalContent) * 100 > 50 ? 1 : 0} 1 ${
                        50 + 40 * Math.cos(((totalPublished / totalContent) * 360 - 90) * (Math.PI / 180))
                      } ${50 + 40 * Math.sin(((totalPublished / totalContent) * 360 - 90) * (Math.PI / 180))} Z`}
                      fill="var(--emerald-500)"
                      opacity="0.8"
                    />
                    <path
                      d={`M 50 50 L ${
                        50 + 40 * Math.cos(((totalPublished / totalContent) * 360 - 90) * (Math.PI / 180))
                      } ${
                        50 + 40 * Math.sin(((totalPublished / totalContent) * 360 - 90) * (Math.PI / 180))
                      } A 40 40 0 ${(totalDraft / totalContent) * 100 > 50 ? 1 : 0} 1 50 10 Z`}
                      fill="var(--amber-500)"
                      opacity="0.8"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{totalContent}</span>
                    <span className="text-xs text-muted-foreground">Total Content</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-sm">Published</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{totalPublished}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((totalPublished / totalContent) * 100)}%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="text-sm">Draft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{totalDraft}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((totalDraft / totalContent) * 100)}%
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Status by Type</h4>
                  {contentTypes.slice(0, 3).map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{type.name}</span>
                        <span className="text-sm font-medium">{type.count}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-emerald-500"
                          style={{ width: `${(type.published / type.count) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
