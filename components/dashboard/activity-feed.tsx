"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ActivityItem {
  id: string
  action: string
  description: string
  time: string
  user: string
  avatar: string
  actionIcon: React.ReactNode
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
          {activities.map((activity, index) => (
            <motion.div key={activity.id} className="group" variants={item}>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {activity.actionIcon}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center text-xs">
                    <span className="text-primary">{activity.user}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
