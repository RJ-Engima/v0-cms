"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonutChart } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

interface MediaUsageData {
  name: string
  value: number
  color: string
}

interface MediaUsageChartProps {
  data: MediaUsageData[]
}

export function MediaUsageChart({ data }: MediaUsageChartProps) {
  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Media Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="h-[200px] w-[200px]">
            <DonutChart
              data={data}
              valueFormatter={(value) => `${value}%`}
              showLabel={false}
              height={200}
              innerRadius={60}
              outerRadius={90}
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {data.map((item) => (
              <Badge
                key={item.name}
                variant="outline"
                className="flex items-center gap-1.5 px-3 py-1"
                style={{ borderColor: item.color + "40" }}
              >
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>
                  {item.name}: {item.value}%
                </span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
