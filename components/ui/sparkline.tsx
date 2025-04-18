"use client"
import { motion } from "framer-motion"

interface SparklineProps {
  data: number[]
  height?: number
  width?: number
  color?: string
  strokeWidth?: number
  filled?: boolean
  fillColor?: string
  className?: string
}

export function Sparkline({
  data,
  height = 40,
  width = 120,
  color = "currentColor",
  strokeWidth = 2,
  filled = false,
  fillColor = "rgba(59, 130, 246, 0.2)",
  className,
}: SparklineProps) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  // Normalize data to fit within the height
  const normalizedData = data.map((value) => height - ((value - min) / range) * height)

  // Calculate points for the path
  const points = normalizedData
    .map((y, i) => {
      const x = (i / (data.length - 1)) * width
      return `${x},${y}`
    })
    .join(" ")

  // Create the path
  const linePath = `M ${points}`

  // Create the filled area path if needed
  const areaPath = filled ? `${linePath} L ${width},${height} L 0,${height} Z` : ""

  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {filled && (
          <motion.path
            d={areaPath}
            fill={fillColor}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
        <motion.path
          d={linePath}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
}
