"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Search, Bell, Download, Sun, Moon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ContentTypeCard } from "@/components/dashboard/content-type-card"
import { LatestPostsCarousel } from "@/components/dashboard/latest-posts-carousel"
import { TopPostsList } from "@/components/dashboard/top-posts-list"
import { SEOPerformanceChart } from "@/components/dashboard/seo-performance-chart"
import { MediaUsageChart } from "@/components/dashboard/media-usage-chart"
import { ContentGrowthChart } from "@/components/dashboard/content-growth-chart"
import { KeywordRankingsTable } from "@/components/dashboard/keyword-rankings-table"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { DeviceDistributionChart } from "@/components/dashboard/device-distribution-chart"

// Import data
import {
  contentTypesData,
  contentGrowthData,
  mediaStatsData,
  mediaUsageData,
  seoPerformanceData,
  keywordRankingsData,
  recentActivitiesData,
  topPostsData,
  latestPostsData,
  deviceDistributionData,
  quickStatsData,
} from "@/data/cms-analytics-data"

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white p-6 transition-colors duration-300">
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[1600px] mx-auto space-y-6"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Content Management Analytics</h1>
                <p className="text-slate-500 dark:text-slate-400">Comprehensive overview of your content performance</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search content..."
                    className="h-10 w-full md:w-[250px] rounded-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="relative rounded-full bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
                      >
                        <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
                          5
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Theme Toggle */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
                    >
                      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-slate-600" />
                      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-300" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <span className="mr-2 flex h-4 w-4 items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      </span>
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 rounded-full text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStatsData.map((stat, index) => (
                <motion.div key={stat.title} variants={itemVariants}>
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                        <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
                        {stat.trend && (
                          <div className="mt-1 flex items-center text-sm">
                            <span
                              className={cn(
                                "flex items-center gap-0.5",
                                stat.trend.positive
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400",
                              )}
                            >
                              {stat.trend.positive ? "↑" : "↓"} {Math.abs(stat.trend.value)}%
                            </span>
                            {stat.trend.label && (
                              <span className="ml-1 text-slate-500 dark:text-slate-400">{stat.trend.label}</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-xl",
                          stat.color === "blue" && "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400",
                          stat.color === "purple" &&
                            "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400",
                          stat.color === "emerald" &&
                            "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
                          stat.color === "amber" &&
                            "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400",
                        )}
                      >
                        {stat.icon}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Latest Posts Carousel */}
            <motion.div variants={itemVariants}>
              <LatestPostsCarousel posts={latestPostsData} />
            </motion.div>

            {/* Content Types Grid */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentTypesData.map((type, index) => (
                  <ContentTypeCard
                    key={type.id}
                    name={type.name}
                    count={type.count}
                    icon={<type.icon className="h-5 w-5" />}
                    color={type.color}
                    published={type.published}
                    draft={type.draft}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Content Growth and SEO Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <ContentGrowthChart data={contentGrowthData} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <SEOPerformanceChart data={seoPerformanceData} />
              </motion.div>
            </div>

            {/* Media Stats */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-4">Media Library</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mediaStatsData.map((item, index) => (
                    <motion.div
                      key={item.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className={cn(
                        "bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-4",
                        item.color === "blue" &&
                          "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/30",
                        item.color === "purple" &&
                          "bg-purple-50/50 dark:bg-purple-950/20 border-purple-200/50 dark:border-purple-800/30",
                        item.color === "amber" &&
                          "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-800/30",
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-lg",
                            item.color === "blue" && "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400",
                            item.color === "purple" &&
                              "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400",
                            item.color === "amber" &&
                              "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400",
                          )}
                        >
                          <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.type}</h3>
                          <p className="text-2xl font-bold mt-1">{item.count.toLocaleString()}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.size} GB Storage</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Media Usage, Device Distribution, and Recent Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div variants={itemVariants}>
                <MediaUsageChart data={mediaUsageData} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <DeviceDistributionChart data={deviceDistributionData} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <RecentActivities activities={recentActivitiesData} />
              </motion.div>
            </div>

            {/* Top Posts and Keyword Rankings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <TopPostsList posts={topPostsData} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <KeywordRankingsTable keywords={keywordRankingsData} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
