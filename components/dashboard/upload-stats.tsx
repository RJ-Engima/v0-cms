"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface UploadStatsProps {
  stats: {
    type: string
    count: number
    icon: React.ReactNode
    color: string
  }[]
  className?: string
}

export function UploadStats({ stats, className }: UploadStatsProps) {
  return (
    <div className={cn("grid gap-4 grid-cols-1 sm:grid-cols-3", className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          className="bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/50"
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full mb-3",
                `bg-${stat.color}-100 text-${stat.color}-600 dark:bg-${stat.color}-900/30 dark:text-${stat.color}-400`,
              )}
            >
              {stat.icon}
            </div>
            <h3 className="text-2xl font-bold">{stat.count.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">{stat.type}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
