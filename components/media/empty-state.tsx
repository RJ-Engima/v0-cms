// Create a new component for empty states with animations
"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Search, Upload, Star, FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  type: "search" | "favorites" | "folder"
  title: string
  description: string
  actionLabel: string
  onAction: () => void
  icon?: React.ReactNode
}

export function EmptyState({ type, title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  // Define different animations based on type
  const animations = {
    search: {
      icon: {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
          scale: [0.8, 1.1, 1],
          opacity: 1,
          rotate: [0, -10, 10, -10, 0],
        },
        transition: { duration: 0.5, delay: 0.2 },
      },
      content: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3, delay: 0.4 },
      },
      button: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3, delay: 0.6 },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      },
    },
    favorites: {
      icon: {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
          scale: 1,
          opacity: 1,
          rotate: [0, 15, -15, 15, 0],
        },
        transition: { duration: 0.5, delay: 0.2 },
      },
      content: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3, delay: 0.4 },
      },
      button: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3, delay: 0.6 },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      },
    },
    folder: {
      icon: {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
          scale: 1,
          opacity: 1,
          y: [0, -10, 0],
        },
        transition: { duration: 0.5, delay: 0.2 },
      },
      content: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3, delay: 0.4 },
      },
      button: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3, delay: 0.6 },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      },
    },
  }

  // Get the correct animation set
  const animation = animations[type]

  // Default icons based on type
  const defaultIcon = {
    search: <Search className="h-8 w-8 text-muted-foreground" />,
    favorites: <Star className="h-8 w-8 text-muted-foreground" />,
    folder: <FolderPlus className="h-8 w-8 text-muted-foreground" />,
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 h-[400px] rounded-xl border bg-card dark:border-slate-800 dark:bg-slate-900/50">
      <motion.div className="rounded-full bg-muted p-6" {...animation.icon}>
        {icon || defaultIcon[type]}
      </motion.div>

      <motion.div className="text-center" {...animation.content}>
        <h3 className="mt-6 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">{description}</p>
      </motion.div>

      <motion.div {...animation.button}>
        <Button
          className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:from-blue-700 hover:to-indigo-700"
          onClick={onAction}
        >
          {type === "search" && <Search className="mr-2 h-4 w-4" />}
          {type === "favorites" && <Star className="mr-2 h-4 w-4" />}
          {type === "folder" && <Upload className="mr-2 h-4 w-4" />}
          {actionLabel}
        </Button>
      </motion.div>
    </div>
  )
}
