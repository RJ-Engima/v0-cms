"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  gradient: string
  delay?: number
}

export function QuickActionCard({ title, description, icon, onClick, gradient, delay = 0 }: QuickActionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("group relative overflow-hidden rounded-2xl p-6 text-white", gradient)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background elements */}
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 transition-all duration-700 group-hover:scale-150" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/5 transition-all duration-700 group-hover:scale-125" />

      <div className="relative z-10">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
          {icon}
        </div>

        <h3 className="mb-1 text-xl font-bold">{title}</h3>
        <p className="mb-4 text-sm text-white/80">{description}</p>

        <motion.div animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <Button onClick={onClick} className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
            Get Started
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
