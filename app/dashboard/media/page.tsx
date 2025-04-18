"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ImageIcon,
  FileText,
  FileArchive,
  FileVideo,
  FileAudio,
  Upload,
  Filter,
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
  FolderPlus,
  ArrowUpRight,
} from "lucide-react"

// Import chart components
import { BarChart, LineChart, DonutChart } from "@/components/ui/chart"
import { MetricCard } from "@/components/ui/metric-card"

// Sample data for charts
const sparklineData = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 50 },
  { month: "May", value: 45 },
  { month: "Jun", value: 60 },
  { month: "Jul", value: 55 },
  { month: "Aug", value: 70 },
  { month: "Sep", value: 65 },
  { month: "Oct", value: 80 },
  { month: "Nov", value: 75 },
  { month: "Dec", value: 90 },
]

const uploadStats = [
  {
    type: "Images",
    count: 1247,
    icon: <ImageIcon className="h-6 w-6" />,
    color: "purple",
  },
  {
    type: "Documents",
    count: 3734,
    icon: <FileText className="h-6 w-6" />,
    color: "blue",
  },
  {
    type: "Videos",
    count: 342,
    icon: <FileVideo className="h-6 w-6" />,
    color: "emerald",
  },
  {
    type: "Audio",
    count: 156,
    icon: <FileAudio className="h-6 w-6" />,
    color: "amber",
  },
  {
    type: "Archives",
    count: 345,
    icon: <FileArchive className="h-6 w-6" />,
    color: "rose",
  },
]

const mediaTypeData = [
  { name: "Images", value: 1247, color: "#8b5cf6" },
  { name: "Videos", value: 342, color: "#3b82f6" },
  { name: "Audio", value: 156, color: "#10b981" },
  { name: "Documents", value: 3734, color: "#f59e0b" },
  { name: "Archives", value: 345, color: "#ef4444" },
]

const weeklyUploadData = [
  { day: "Mon", uploads: 42 },
  { day: "Tue", uploads: 65 },
  { day: "Wed", uploads: 48 },
  { day: "Thu", uploads: 72 },
  { day: "Fri", uploads: 58 },
  { day: "Sat", uploads: 32 },
  { day: "Sun", uploads: 28 },
]

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/80 dark:from-background dark:via-background/95 dark:to-background/90">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] left-[20%] h-[500px] w-[800px] rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
        <div className="absolute -bottom-[20%] right-[10%] h-[400px] w-[700px] rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute top-[30%] right-[30%] h-[300px] w-[500px] rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/10" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="space-y-8" initial="hidden" animate="show" variants={containerVariants}>
          {/* Header with search and actions */}
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            variants={itemVariants}
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
              <p className="text-muted-foreground">Manage your media files and assets.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search media..."
                  className="h-10 w-full sm:w-[250px] rounded-full bg-background pl-9 pr-4 text-sm border border-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-10 gap-1.5 rounded-full">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
                <Button
                  size="sm"
                  className="h-10 gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Media stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Files"
              value="5,824"
              icon={<FileText className="h-5 w-5" />}
              trend={{ value: 14.2, label: "vs last month", positive: true }}
              variant="gradient"
              colorScheme="purple"
              delay={0.1}
            >
              <LineChart
                data={sparklineData}
                index="month"
                categories={[{ key: "value", name: "Value" }]}
                colors={["#ffffff"]}
                showLegend={false}
                showXAxis={false}
                showYAxis={false}
                showGrid={false}
                height={60}
                className="mt-2"
              />
            </MetricCard>

            <MetricCard
              title="Storage Used"
              value="12.8 GB"
              icon={<FileArchive className="h-5 w-5" />}
              trend={{ value: 8.5, label: "vs last month", positive: true }}
              variant="gradient"
              colorScheme="blue"
              delay={0.2}
            >
              <LineChart
                data={sparklineData}
                index="month"
                categories={[{ key: "value", name: "Value" }]}
                colors={["#ffffff"]}
                showLegend={false}
                showXAxis={false}
                showYAxis={false}
                showGrid={false}
                height={60}
                className="mt-2"
              />
            </MetricCard>

            <MetricCard
              title="Uploads Today"
              value="124"
              icon={<Upload className="h-5 w-5" />}
              trend={{ value: 32.5, label: "vs yesterday", positive: true }}
              variant="gradient"
              colorScheme="emerald"
              delay={0.3}
            >
              <LineChart
                data={sparklineData}
                index="month"
                categories={[{ key: "value", name: "Value" }]}
                colors={["#ffffff"]}
                showLegend={false}
                showXAxis={false}
                showYAxis={false}
                showGrid={false}
                height={60}
                className="mt-2"
              />
            </MetricCard>

            <MetricCard
              title="Storage Limit"
              value="64%"
              icon={<SlidersHorizontal className="h-5 w-5" />}
              variant="gradient"
              colorScheme="amber"
              delay={0.4}
            >
              <div className="mt-4 h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: "64%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="mt-1 text-xs text-white/70">12.8 GB of 20 GB</div>
            </MetricCard>
          </div>

          {/* Media overview */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold">Media Distribution</CardTitle>
                      <CardDescription>File types breakdown</CardDescription>
                    </div>
                    <Tabs defaultValue="all">
                      <TabsList className="h-8">
                        <TabsTrigger value="all" className="text-xs">
                          All Time
                        </TabsTrigger>
                        <TabsTrigger value="month" className="text-xs">
                          This Month
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col items-center justify-center">
                      <DonutChart
                        data={mediaTypeData}
                        showLabel={false}
                        height={220}
                        innerRadius={60}
                        outerRadius={80}
                        valueFormatter={(value) => `${value.toLocaleString()} files`}
                      />
                      <div className="mt-2 text-center">
                        <div className="text-2xl font-bold">5,824</div>
                        <div className="text-sm text-muted-foreground">Total Files</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">File Types</h4>
                      {uploadStats.map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-8 w-8 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400`}
                            >
                              {stat.icon}
                            </div>
                            <span className="text-sm font-medium">{stat.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{stat.count.toLocaleString()}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted">
                              {Math.round((stat.count / 5824) * 100)}%
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="overflow-hidden border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    <Upload className="h-5 w-5" />
                    <div className="flex flex-col items-start">
                      <span>Upload Files</span>
                      <span className="text-xs text-white/70">Add new media</span>
                    </div>
                  </Button>

                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <FolderPlus className="h-5 w-5" />
                    <div className="flex flex-col items-start">
                      <span>New Folder</span>
                      <span className="text-xs text-muted-foreground">Organize your media</span>
                    </div>
                  </Button>

                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <SlidersHorizontal className="h-5 w-5" />
                    <div className="flex flex-col items-start">
                      <span>Bulk Edit</span>
                      <span className="text-xs text-muted-foreground">Edit multiple files</span>
                    </div>
                  </Button>

                  <div className="pt-4 border-t border-border/50">
                    <h4 className="font-medium mb-3">Storage Usage</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Images</span>
                          <span className="text-sm font-medium">4.2 GB</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: "32%" }}
                            transition={{ duration: 1, delay: 0.7 }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Videos</span>
                          <span className="text-sm font-medium">5.8 GB</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: "45%" }}
                            transition={{ duration: 1, delay: 0.8 }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Documents</span>
                          <span className="text-sm font-medium">2.1 GB</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500"
                            initial={{ width: 0 }}
                            animate={{ width: "16%" }}
                            transition={{ duration: 1, delay: 0.9 }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Other</span>
                          <span className="text-sm font-medium">0.7 GB</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: "5%" }}
                            transition={{ duration: 1, delay: 1.0 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload activity */}
          <Card className="overflow-hidden border shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">Upload Activity</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span className="text-xs">View All</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <BarChart
                    data={weeklyUploadData}
                    index="day"
                    categories={[{ key: "uploads", name: "Uploads" }]}
                    colors={["#8b5cf6"]}
                    valueFormatter={(value) => `${value}`}
                    height={200}
                  />
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">345</div>
                      <div className="text-sm text-muted-foreground">Uploads this week</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600">
                      <ImageIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">124</div>
                      <div className="text-sm text-muted-foreground">Images uploaded today</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">8.2</div>
                      <div className="text-sm text-muted-foreground">Average MB/s upload speed</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
