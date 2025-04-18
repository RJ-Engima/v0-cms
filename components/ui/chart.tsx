"use client"

import * as React from "react"
import {
  Area,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

// Bar Chart
interface BarChartProps {
  data: any[]
  index: string
  categories: {
    key: string
    name: string
    color?: string
    stackId?: string
  }[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showAnimation?: boolean
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  showGradient?: boolean
  className?: string
  height?: number
  barRadius?: number
  layout?: "horizontal" | "vertical"
}

function BarChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#4f46e5", "#8b5cf6", "#a855f7"],
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 56,
  showAnimation = true,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  showGradient = false,
  className,
  height = 300,
  barRadius = 4,
  layout = "horizontal",
}: BarChartProps) {
  const gradientIds = React.useMemo(() => categories.map((_, index) => `bar-gradient-${index}`), [categories])

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{
            top: 16,
            right: 16,
            bottom: 16,
            left: 16,
          }}
        >
          {showGradient && (
            <defs>
              {categories.map((_, index) => (
                <linearGradient key={gradientIds[index]} id={gradientIds[index]} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0.2} />
                </linearGradient>
              ))}
            </defs>
          )}
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-muted" />
          )}
          {showXAxis && (
            <XAxis
              dataKey={index}
              tickLine={false}
              axisLine={false}
              tick={{ transform: "translate(0, 6)" }}
              className="text-xs text-muted-foreground"
              interval="preserveStartEnd"
              minTickGap={5}
            />
          )}
          {showYAxis && (
            <YAxis
              width={yAxisWidth}
              axisLine={false}
              tickLine={false}
              className="text-xs text-muted-foreground"
              tickFormatter={valueFormatter}
            />
          )}
          {showLegend && (
            <Legend
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null

                return (
                  <div className="flex justify-center gap-8 text-sm text-muted-foreground mt-2">
                    {payload.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )
              }}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload) return null

                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      {payload.map((category, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">{category.name}</span>
                          <span className="font-bold text-muted-foreground">
                            {valueFormatter(Number(category.value))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }}
            />
          )}
          {categories.map((category, index) => (
            <Bar
              key={category.key}
              dataKey={category.key}
              name={category.name}
              stackId={category.stackId}
              fill={showGradient ? `url(#${gradientIds[index]})` : (category.color ?? colors[index % colors.length])}
              radius={barRadius ? [barRadius, barRadius, 0, 0] : undefined}
              isAnimationActive={showAnimation}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Line Chart
interface LineChartProps {
  data: any[]
  index: string
  categories: {
    key: string
    name: string
    color?: string
    strokeWidth?: number
    type?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter"
    fillOpacity?: number
    dot?: boolean
  }[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showAnimation?: boolean
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  showGradient?: boolean
  showArea?: boolean
  className?: string
  height?: number
  curveType?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter"
  minValue?: number
  maxValue?: number
}

function LineChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#4f46e5", "#8b5cf6", "#a855f7"],
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 56,
  showAnimation = true,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  showGradient = false,
  showArea = false,
  className,
  height = 300,
  curveType = "monotone",
  minValue,
  maxValue,
}: LineChartProps) {
  const gradientIds = React.useMemo(() => categories.map((_, index) => `line-gradient-${index}`), [categories])

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 16,
            left: 16,
          }}
        >
          {showGradient && (
            <defs>
              {categories.map((_, index) => (
                <linearGradient key={gradientIds[index]} id={gradientIds[index]} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
          )}
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-muted" />
          )}
          {showXAxis && (
            <XAxis
              dataKey={index}
              tickLine={false}
              axisLine={false}
              tick={{ transform: "translate(0, 6)" }}
              className="text-xs text-muted-foreground"
              interval="preserveStartEnd"
              minTickGap={5}
            />
          )}
          {showYAxis && (
            <YAxis
              width={yAxisWidth}
              axisLine={false}
              tickLine={false}
              className="text-xs text-muted-foreground"
              tickFormatter={valueFormatter}
              domain={[minValue ?? "auto", maxValue ?? "auto"]}
            />
          )}
          {showLegend && (
            <Legend
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null

                return (
                  <div className="flex justify-center gap-8 text-sm text-muted-foreground mt-2">
                    {payload.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )
              }}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload) return null

                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      {payload.map((category, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">{category.name}</span>
                          <span className="font-bold text-muted-foreground">
                            {valueFormatter(Number(category.value))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }}
            />
          )}
          {categories.map((category, index) => (
            <React.Fragment key={category.key}>
              {showArea && (
                <Area
                  type={category.type ?? curveType}
                  dataKey={category.key}
                  name={category.name}
                  stroke={category.color ?? colors[index % colors.length]}
                  strokeWidth={category.strokeWidth ?? 2}
                  fill={
                    showGradient ? `url(#${gradientIds[index]})` : (category.color ?? colors[index % colors.length])
                  }
                  fillOpacity={category.fillOpacity ?? 0.1}
                  isAnimationActive={showAnimation}
                  dot={category.dot !== undefined ? category.dot : false}
                />
              )}
              {!showArea && (
                <Line
                  type={category.type ?? curveType}
                  dataKey={category.key}
                  name={category.name}
                  stroke={category.color ?? colors[index % colors.length]}
                  strokeWidth={category.strokeWidth ?? 2}
                  activeDot={{ r: 6 }}
                  isAnimationActive={showAnimation}
                  dot={category.dot !== undefined ? category.dot : false}
                />
              )}
            </React.Fragment>
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

// Area Chart (Line Chart with area)
function AreaChart(props: LineChartProps) {
  return <LineChart {...props} showArea={true} />
}

// Pie Chart
interface PieChartProps {
  data: {
    name: string
    value: number
    color?: string
  }[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  showAnimation?: boolean
  showLabel?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
  height?: number
  donut?: boolean
  innerRadius?: number
  outerRadius?: number
  paddingAngle?: number
  startAngle?: number
  endAngle?: number
  labelLine?: boolean
}

function PieChart({
  data,
  colors = ["#2563eb", "#4f46e5", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"],
  valueFormatter = (value: number) => value.toString(),
  showAnimation = true,
  showLabel = true,
  showLegend = true,
  showTooltip = true,
  className,
  height = 300,
  donut = false,
  innerRadius = 60,
  outerRadius = 80,
  paddingAngle = 0,
  startAngle = 0,
  endAngle = 360,
  labelLine = true,
}: PieChartProps) {
  const renderLabel = (entry: any) => {
    return showLabel ? entry.name : ""
  }

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={labelLine && showLabel}
            label={renderLabel}
            outerRadius={outerRadius}
            innerRadius={donut ? innerRadius : 0}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={showAnimation}
            paddingAngle={paddingAngle}
            startAngle={startAngle}
            endAngle={endAngle}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color ?? colors[index % colors.length]}
                className="stroke-background hover:opacity-80"
                strokeWidth={2}
              />
            ))}
          </Pie>
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null

                const [item] = payload
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{item.name}</span>
                      <span className="font-bold text-muted-foreground">{valueFormatter(Number(item.value))}</span>
                    </div>
                  </div>
                )
              }}
            />
          )}
          {showLegend && (
            <Legend
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null

                return (
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mt-2">
                    {payload.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )
              }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

// Donut Chart (Pie Chart with innerRadius)
function DonutChart(props: PieChartProps) {
  return <PieChart {...props} donut={true} />
}

// Radial Bar Chart
interface RadialBarChartProps {
  data: {
    name: string
    value: number
    color?: string
  }[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  showAnimation?: boolean
  showLabel?: boolean
  showTooltip?: boolean
  className?: string
  height?: number
  innerRadius?: number
  outerRadius?: number
  startAngle?: number
  endAngle?: number
  barSize?: number
  background?: boolean
  centerLabel?: React.ReactNode
}

function RadialBarChart({
  data,
  colors = ["#2563eb", "#4f46e5", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"],
  valueFormatter = (value: number) => value.toString(),
  showAnimation = true,
  showLabel = true,
  showTooltip = true,
  className,
  height = 300,
  innerRadius = 60,
  outerRadius = 80,
  startAngle = 0,
  endAngle = 360,
  barSize = 10,
  background = true,
  centerLabel,
}: RadialBarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadialBarChart
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          data={data}
          startAngle={startAngle}
          endAngle={endAngle}
          cx="50%"
          cy="50%"
        >
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null

                const [item] = payload
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{item.name}</span>
                      <span className="font-bold text-muted-foreground">{valueFormatter(Number(item.value))}</span>
                    </div>
                  </div>
                )
              }}
            />
          )}
          <RadialBar
            background={background}
            dataKey="value"
            isAnimationActive={showAnimation}
            barSize={barSize}
            label={showLabel ? { position: "insideStart", fill: "#fff", fontSize: 12 } : false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color ?? colors[index % colors.length]}
                className="hover:opacity-80"
              />
            ))}
          </RadialBar>
          {centerLabel && (
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-medium">
              {centerLabel}
            </text>
          )}
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Mini Sparkline Chart
interface SparklineProps {
  data: any[]
  dataKey: string
  color?: string
  height?: number
  width?: number
  className?: string
  type?: "line" | "bar" | "area"
  showAnimation?: boolean
}

function Sparkline({
  data,
  dataKey,
  color = "#2563eb",
  height = 30,
  width = 100,
  className,
  type = "line",
  showAnimation = true,
}: SparklineProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width={width} height={height}>
        {type === "bar" ? (
          <RechartsBarChart data={data}>
            <Bar dataKey={dataKey} fill={color} isAnimationActive={showAnimation} barSize={4} radius={[2, 2, 0, 0]} />
          </RechartsBarChart>
        ) : (
          <RechartsLineChart data={data}>
            {type === "area" && (
              <defs>
                <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
            )}
            {type === "area" ? (
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                fill="url(#sparkline-gradient)"
                isAnimationActive={showAnimation}
                strokeWidth={1.5}
                dot={false}
              />
            ) : (
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                isAnimationActive={showAnimation}
                strokeWidth={1.5}
                dot={false}
              />
            )}
          </RechartsLineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export { AreaChart, BarChart, DonutChart, LineChart, PieChart, RadialBarChart, Sparkline }
