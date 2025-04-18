"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ActivityItemProps {
  avatar?: string
  action: string
  description: string
  time: string
  user?: string
  actionIcon?: ReactNode
  iconColor?: string
  className?: string
  delay?: number
}

export function ActivityItem({
  avatar,
  action,
  description,
  time,
  user,
  actionIcon,
  iconColor = "bg-blue-500",
  className,
  delay = 0,
}: ActivityItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn("flex items-start gap-4", className)}
    >
      <div className="relative">
        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-background">
          <img src={avatar || "/placeholder.svg"} alt={user || "User"} className="h-full w-full object-cover" />
        </div>
        {actionIcon && (
          <div
            className={cn(
              "absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center border-2 border-background",
              iconColor,
            )}
          >
            {actionIcon}
          </div>
        )}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{action}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {user && (
          <div className="flex items-center text-xs">
            <span className="text-blue-600 dark:text-blue-400">{user}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
