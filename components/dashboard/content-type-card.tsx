"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentTypeCardProps {
  name: string
  count: number
  icon: React.ReactNode
  color: string
  published: number
  draft: number
  delay?: number
  glassEffect?: boolean
}

export function ContentTypeCard({
  name,
  count,
  icon,
  color,
  published,
  draft,
  delay = 0,
  glassEffect = false,
}: ContentTypeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate percentages
  const publishedPercent = Math.round((published / count) * 100) || 0
  const draftPercent = Math.round((draft / count) * 100) || 0

  // Map color strings to Tailwind classes
  const colorClasses = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-200/50 dark:border-blue-800/30",
      icon: "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400",
      progress: "bg-blue-500",
      badgePublished: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
      badgeDraft: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/20",
      border: "border-purple-200/50 dark:border-purple-800/30",
      icon: "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400",
      progress: "bg-purple-500",
      badgePublished: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
      badgeDraft: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      border: "border-emerald-200/50 dark:border-emerald-800/30",
      icon: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      progress: "bg-emerald-500",
      badgePublished: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
      badgeDraft: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/20",
      border: "border-amber-200/50 dark:border-amber-800/30",
      icon: "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400",
      progress: "bg-amber-500",
      badgePublished: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
      badgeDraft: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-950/20",
      border: "border-rose-200/50 dark:border-rose-800/30",
      icon: "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400",
      progress: "bg-rose-500",
      badgePublished: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
      badgeDraft: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-cyan-950/20",
      border: "border-cyan-200/50 dark:border-cyan-800/30",
      icon: "bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400",
      progress: "bg-cyan-500",
      badgePublished: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
      badgeDraft: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    },
  }

  const currentColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-md",
        currentColor.bg,
        currentColor.border,
        glassEffect
          ? "backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10"
          : "border",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", currentColor.icon)}>{icon}</div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-2xl font-bold">{count}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1"
        >
          <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0">
            <PlusCircle className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={cn("h-full transition-all duration-300 group-hover:opacity-80", currentColor.progress)}
          style={{ width: `${publishedPercent}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={currentColor.badgePublished}>
            {published} Published
          </Badge>
          <Badge variant="outline" className={currentColor.badgeDraft}>
            {draft} Draft
          </Badge>
        </div>
        <span>{publishedPercent}% published</span>
      </div>
    </motion.div>
  )
}
