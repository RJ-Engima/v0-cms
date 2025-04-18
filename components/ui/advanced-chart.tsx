"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ChartDataPoint {
  label: string
  value: number
  color?: string
  secondaryValue?: number
  secondaryColor?: string
}

interface AdvancedChartProps {
  data: ChartDataPoint[]
  height?: number
  type: "bar" | "line" | "area" | "donut" | "pie" | "stacked-bar"
  className?: string
  showLabels?: boolean
  showValues?: boolean
  showLegend?: boolean
  showGrid?: boolean
  animated?: boolean
  title?: string
  subtitle?: string
  maxValue?: number
  colors?: string[]
  darkMode?: boolean
  barRadius?: number
  lineWidth?: number
  areaOpacity?: number
  donutThickness?: number
  legendPosition?: "top" | "bottom" | "left" | "right"
  tooltips?: boolean
  onClick?: (item: ChartDataPoint, index: number) => void
}

export function AdvancedChart({
  data,
  height = 300,
  type = "bar",
  className,
  showLabels = true,
  showValues = false,
  showLegend = true,
  showGrid = true,
  animated = true,
  title,
  subtitle,
  maxValue: customMaxValue,
  colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"],
  darkMode = false,
  barRadius = 4,
  lineWidth = 2,
  areaOpacity = 0.2,
  donutThickness = 40,
  legendPosition = "bottom",
  tooltips = true,
  onClick,
}: AdvancedChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(false)

  // Calculate the maximum value for scaling
  const hasSecondaryValues = data.some((item) => item.secondaryValue !== undefined)
  const primaryMax = Math.max(...data.map((item) => item.value))
  const secondaryMax = hasSecondaryValues ? Math.max(...data.map((item) => item.secondaryValue || 0)) : 0
  const maxValue = customMaxValue || Math.max(primaryMax, secondaryMax)

  // Assign colors if not provided in data
  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: item.color || colors[index % colors.length],
    secondaryColor: item.secondaryColor || (item.color ? `${item.color}80` : `${colors[index % colors.length]}80`),
  }))

  // Calculate total for pie/donut charts
  const total = data.reduce((sum, item) => sum + item.value, 0)

  useEffect(() => {
    if (chartRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold: 0.1 },
      )

      observer.observe(chartRef.current)
      return () => observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (chartRef.current) {
      const updateDimensions = () => {
        setChartDimensions({
          width: chartRef.current?.clientWidth || 0,
          height: chartRef.current?.clientHeight || 0,
        })
      }

      updateDimensions()
      window.addEventListener("resize", updateDimensions)
      return () => window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (tooltips) {
      setHoveredIndex(index)
      setTooltipPosition({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  const renderBarChart = () => {
    const barWidth = Math.max(10, Math.min(60, chartDimensions.width / data.length / 2 - 10))
    const barGap = barWidth / 2

    return (
      <div className="relative h-full w-full">
        {/* Grid lines */}
        {showGrid && (
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className={cn("w-full border-t", darkMode ? "border-white/10" : "border-black/10")}
                style={{ height: "20%" }}
              />
            ))}
          </div>
        )}

        {/* Bars */}
        <div className="absolute bottom-0 left-0 flex h-[90%] w-full items-end px-2">
          {dataWithColors.map((item, index) => (
            <div
              key={index}
              className="group flex flex-1 flex-col items-center justify-end"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onClick?.(item, index)}
            >
              {/* Value tooltip */}
              {showValues && (
                <div
                  className={cn(
                    "mb-1 rounded px-1 py-0.5 text-xs font-medium opacity-0 transition-opacity",
                    darkMode ? "bg-white/10 text-white" : "bg-black/10 text-black",
                    hoveredIndex === index && "opacity-100",
                  )}
                >
                  {item.value}
                </div>
              )}

              {/* Bar */}
              <motion.div
                className="relative w-full"
                initial={animated ? { height: 0 } : undefined}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                style={{ maxWidth: barWidth * 2 + barGap }}
              >
                <div
                  className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 transform transition-all duration-200 group-hover:opacity-80"
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                    width: barWidth,
                    backgroundColor: item.color,
                    borderRadius: `${barRadius}px ${barRadius}px 0 0`,
                  }}
                />

                {hasSecondaryValues && item.secondaryValue !== undefined && (
                  <div
                    className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 transform transition-all duration-200 group-hover:opacity-80"
                    style={{
                      height: `${(item.secondaryValue / maxValue) * 100}%`,
                      width: barWidth,
                      backgroundColor: item.secondaryColor,
                      borderRadius: `${barRadius}px ${barRadius}px 0 0`,
                      left: barWidth + barGap,
                    }}
                  />
                )}
              </motion.div>

              {/* Label */}
              {showLabels && (
                <div className={cn("mt-2 text-center text-xs", darkMode ? "text-white/70" : "text-black/70")}>
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderDonutChart = () => {
    const centerX = 50
    const centerY = 50
    const radius = 40
    const innerRadius = radius - donutThickness

    let startAngle = 0
    const paths = dataWithColors.map((item, index) => {
      const percentage = item.value / total
      const angle = percentage * 360
      const endAngle = startAngle + angle

      // Calculate SVG arc path
      const startRad = (startAngle - 90) * (Math.PI / 180)
      const endRad = (endAngle - 90) * (Math.PI / 180)

      const x1 = centerX + radius * Math.cos(startRad)
      const y1 = centerY + radius * Math.sin(startRad)
      const x2 = centerX + radius * Math.cos(endRad)
      const y2 = centerY + radius * Math.sin(endRad)

      const largeArcFlag = angle > 180 ? 1 : 0

      // For inner arc (donut hole)
      const x3 = centerX + innerRadius * Math.cos(endRad)
      const y3 = centerY + innerRadius * Math.sin(endRad)
      const x4 = centerX + innerRadius * Math.cos(startRad)
      const y4 = centerY + innerRadius * Math.sin(startRad)

      // Path for donut segment
      const path = [
        `M ${x1} ${y1}`, // Move to outer start point
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Outer arc
        `L ${x3} ${y3}`, // Line to inner end point
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Inner arc (reverse direction)
        "Z", // Close path
      ].join(" ")

      const result = (
        <motion.path
          key={index}
          d={path}
          fill={item.color}
          stroke={darkMode ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.5)"}
          strokeWidth="0.5"
          initial={animated ? { opacity: 0 } : undefined}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onClick?.(item, index)}
          className="cursor-pointer transition-all duration-200 hover:opacity-80"
          style={{
            transform:
              hoveredIndex === index
                ? `translateX(${Math.cos((startAngle + angle / 2 - 90) * (Math.PI / 180)) * 5}px) translateY(${Math.sin((startAngle + angle / 2 - 90) * (Math.PI / 180)) * 5}px)`
                : "none",
          }}
        />
      )

      startAngle = endAngle
      return result
    })

    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative h-full max-h-full w-auto max-w-full">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {/* Background circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill={darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
            />

            {/* Donut segments */}
            {paths}

            {/* Inner circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={innerRadius}
              fill={darkMode ? "#1f2937" : "#ffffff"}
              stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="0.5"
            />

            {/* Center text */}
            <text
              x={centerX}
              y={centerY - 5}
              textAnchor="middle"
              className={cn("text-lg font-bold", darkMode ? "fill-white" : "fill-black")}
            >
              {total}
            </text>
            <text
              x={centerX}
              y={centerY + 10}
              textAnchor="middle"
              className={cn("text-xs", darkMode ? "fill-white/70" : "fill-black/70")}
            >
              Total
            </text>
          </svg>

          {/* Tooltip */}
          {hoveredIndex !== null && tooltips && (
            <div
              className={cn(
                "absolute rounded-md px-3 py-1.5 text-sm font-medium shadow-lg",
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black",
              )}
              style={{
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y - 40,
                transform: "translateX(-50%)",
                zIndex: 50,
              }}
            >
              <div className="font-medium">{data[hoveredIndex].label}</div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: dataWithColors[hoveredIndex].color }} />
                <span>{data[hoveredIndex].value}</span>
                <span className="text-xs opacity-70">({Math.round((data[hoveredIndex].value / total) * 100)}%)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderLineChart = () => {
    // Implementation for line chart
    return <div>Line chart implementation</div>
  }

  const renderAreaChart = () => {
    // Implementation for area chart
    return <div>Area chart implementation</div>
  }

  const renderPieChart = () => {
    // Similar to donut but without inner circle
    return <div>Pie chart implementation</div>
  }

  const renderStackedBarChart = () => {
    // Implementation for stacked bar chart
    return <div>Stacked bar chart implementation</div>
  }

  const renderChart = () => {
    switch (type) {
      case "bar":
        return renderBarChart()
      case "donut":
        return renderDonutChart()
      case "line":
        return renderLineChart()
      case "area":
        return renderAreaChart()
      case "pie":
        return renderPieChart()
      case "stacked-bar":
        return renderStackedBarChart()
      default:
        return renderBarChart()
    }
  }

  const renderLegend = () => {
    if (!showLegend) return null

    return (
      <div
        className={cn(
          "flex flex-wrap gap-4",
          legendPosition === "top" && "mb-4",
          legendPosition === "bottom" && "mt-4",
          legendPosition === "left" && "mr-4 flex-col",
          legendPosition === "right" && "ml-4 flex-col",
        )}
      >
        {dataWithColors.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className={cn("text-sm", darkMode ? "text-white/70" : "text-black/70")}>{item.label}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("w-full overflow-hidden", darkMode ? "text-white" : "text-black", className)}>
      {/* Chart header */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className={cn("text-sm", darkMode ? "text-white/70" : "text-black/70")}>{subtitle}</p>}
        </div>
      )}

      {/* Chart layout with legend */}
      <div
        className={cn(
          "flex",
          legendPosition === "left" && "flex-row",
          legendPosition === "right" && "flex-row-reverse",
          legendPosition === "top" && "flex-col",
          legendPosition === "bottom" && "flex-col-reverse",
        )}
      >
        {(legendPosition === "top" || legendPosition === "left") && renderLegend()}

        {/* Chart container */}
        <div ref={chartRef} className="flex-1" style={{ height: `${height}px` }}>
          {isVisible && renderChart()}
        </div>

        {(legendPosition === "bottom" || legendPosition === "right") && renderLegend()}
      </div>
    </div>
  )
}
