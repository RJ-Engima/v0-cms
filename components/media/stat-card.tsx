// Create an enhanced stat card component with animations
"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  iconBgColor: string
  iconTextColor: string
  badge?: {
    text: string
    icon?: React.ReactNode
  }
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
}

export function StatCard({ title, value, icon, iconBgColor, iconTextColor, badge, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      className="rounded-xl border bg-card p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 stat-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <div className="flex items-center justify-between">
        <motion.h3
          className="font-medium text-muted-foreground"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
        >
          {title}
        </motion.h3>
        <motion.div
          className={`rounded-full ${iconBgColor} p-1.5 ${iconTextColor}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: delay + 0.2,
          }}
          whileHover={{
            scale: 1.1,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 },
          }}
        >
          {icon}
        </motion.div>
      </div>

      <motion.div
        className="mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.3 }}
      >
        <motion.p
          className="text-2xl font-bold"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
        >
          {value}
        </motion.p>

        {badge && (
          <motion.div
            className="mt-1 flex items-center text-xs"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.5 }}
          >
            <Badge variant="outline" className={`${iconBgColor} ${iconTextColor} hover:${iconBgColor}`}>
              {badge.icon && <span className="mr-1">{badge.icon}</span>}
              {badge.text}
            </Badge>
          </motion.div>
        )}

        {trend && (
          <motion.div
            className="mt-1 flex items-center text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.5 }}
          >
            <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
