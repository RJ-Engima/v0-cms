import {
  FileText,
  ImageIcon,
  ShoppingBag,
  MessageSquare,
  FileQuestion,
  Video,
  Newspaper,
  Calendar,
  Search,
  ThumbsUp,
  CheckCircle,
  Edit,
  Upload,
} from "lucide-react"

// Content Types Data
export const contentTypesData = [
  {
    id: 1,
    name: "Blog Posts",
    count: 347,
    icon: FileText,
    color: "blue",
    published: 289,
    draft: 58,
    trend: 12,
    description: "Articles and blog content",
  },
  {
    id: 2,
    name: "Pages",
    count: 84,
    icon: Newspaper,
    color: "purple",
    published: 76,
    draft: 8,
    trend: 3,
    description: "Static website pages",
  },
  {
    id: 3,
    name: "Products",
    count: 532,
    icon: ShoppingBag,
    color: "emerald",
    published: 498,
    draft: 34,
    trend: 24,
    description: "E-commerce products",
  },
  {
    id: 4,
    name: "Comments",
    count: 1247,
    icon: MessageSquare,
    color: "amber",
    published: 1128,
    draft: 119,
    trend: 56,
    description: "User comments and reviews",
  },
  {
    id: 5,
    name: "FAQs",
    count: 68,
    icon: FileQuestion,
    color: "rose",
    published: 62,
    draft: 6,
    trend: 2,
    description: "Frequently asked questions",
  },
  {
    id: 6,
    name: "Events",
    count: 42,
    icon: Calendar,
    color: "cyan",
    published: 38,
    draft: 4,
    trend: 5,
    description: "Upcoming and past events",
  },
]

// Content Growth Data
export const contentGrowthData = [
  { month: "Jan", posts: 24, pages: 3, products: 18 },
  { month: "Feb", posts: 18, pages: 2, products: 22 },
  { month: "Mar", posts: 32, pages: 5, products: 28 },
  { month: "Apr", posts: 26, pages: 1, products: 32 },
  { month: "May", posts: 28, pages: 4, products: 36 },
  { month: "Jun", posts: 36, pages: 6, products: 42 },
  { month: "Jul", posts: 42, pages: 8, products: 38 },
  { month: "Aug", posts: 48, pages: 7, products: 46 },
  { month: "Sep", posts: 52, pages: 9, products: 52 },
  { month: "Oct", posts: 58, pages: 12, products: 58 },
  { month: "Nov", posts: 62, pages: 8, products: 64 },
  { month: "Dec", posts: 68, pages: 10, products: 72 },
]

// Media Library Stats
export const mediaStatsData = [
  { type: "Images", count: 2843, size: 4.2, icon: ImageIcon, color: "blue" },
  { type: "Videos", count: 182, size: 12.8, icon: Video, color: "purple" },
  { type: "Documents", count: 684, size: 2.1, icon: FileText, color: "amber" },
]

// Media Usage by Type
export const mediaUsageData = [
  { name: "Images", value: 68, color: "#3b82f6" },
  { name: "Videos", value: 12, color: "#8b5cf6" },
  { name: "Documents", value: 20, color: "#f59e0b" },
]

// SEO Performance Data
export const seoPerformanceData = [
  { month: "Jan", organic: 12400, direct: 5800, referral: 3200 },
  { month: "Feb", organic: 13200, direct: 6100, referral: 3400 },
  { month: "Mar", organic: 14800, direct: 6300, referral: 3600 },
  { month: "Apr", organic: 16200, direct: 6500, referral: 3800 },
  { month: "May", organic: 18400, direct: 6800, referral: 4200 },
  { month: "Jun", organic: 21200, direct: 7200, referral: 4600 },
  { month: "Jul", organic: 19800, direct: 7000, referral: 4400 },
  { month: "Aug", organic: 22400, direct: 7400, referral: 4800 },
  { month: "Sep", organic: 24600, direct: 7800, referral: 5200 },
  { month: "Oct", organic: 26800, direct: 8200, referral: 5600 },
  { month: "Nov", organic: 28400, direct: 8600, referral: 6000 },
  { month: "Dec", organic: 32600, direct: 9200, referral: 6400 },
]

// Keyword Rankings
export const keywordRankingsData = [
  { keyword: "content management system", position: 3, change: 2, volume: 12400 },
  { keyword: "headless cms", position: 5, change: -1, volume: 8200 },
  { keyword: "best cms for blogs", position: 2, change: 4, volume: 6800 },
  { keyword: "enterprise cms solutions", position: 8, change: 3, volume: 5400 },
  { keyword: "cms for e-commerce", position: 4, change: 0, volume: 9600 },
]

// Recent Activities
export const recentActivitiesData = [
  {
    id: "act1",
    action: "Published new blog post",
    description: "How to Optimize Your Content for SEO",
    time: "10 minutes ago",
    user: "Sarah Johnson",
    avatar: "/colorful-abstract-shapes.png",
    actionIcon: <FileText className="h-3 w-3" />,
  },
  {
    id: "act2",
    action: "Updated product details",
    description: "Premium Content Management Plan",
    time: "42 minutes ago",
    user: "Michael Chen",
    avatar: "/colorful-abstract-shapes.png",
    actionIcon: <Edit className="h-3 w-3" />,
  },
  {
    id: "act3",
    action: "Uploaded new media",
    description: "Added 12 new product images to the media library",
    time: "1 hour ago",
    user: "Jessica Williams",
    avatar: "/abstract-geometric-shapes.png",
    actionIcon: <Upload className="h-3 w-3" />,
  },
  {
    id: "act4",
    action: "Created new page",
    description: "About Us page with team information",
    time: "3 hours ago",
    user: "Robert Davis",
    avatar: "/abstract-geometric-shapes.png",
    actionIcon: <Newspaper className="h-3 w-3" />,
  },
  {
    id: "act5",
    action: "Approved comments",
    description: "Approved 24 new user comments",
    time: "5 hours ago",
    user: "Amanda Lee",
    avatar: "/abstract-geometric-shapes.png",
    actionIcon: <CheckCircle className="h-3 w-3" />,
  },
]

// Top Posts Data
export const topPostsData = [
  {
    id: "post1",
    title: "10 Essential Tips for Content Strategy",
    views: 24680,
    likes: 842,
    shares: 367,
    category: "Content Strategy",
    image: "/placeholder.svg?height=80&width=120&query=content+strategy",
    author: "Sarah Johnson",
    publishDate: "2023-11-15",
  },
  {
    id: "post2",
    title: "The Future of Headless CMS Architecture",
    views: 18920,
    likes: 756,
    shares: 289,
    category: "Technology",
    image: "/placeholder.svg?height=80&width=120&query=headless+cms",
    author: "Michael Chen",
    publishDate: "2023-11-10",
  },
  {
    id: "post3",
    title: "How to Improve Your SEO Rankings in 2023",
    views: 16540,
    likes: 684,
    shares: 412,
    category: "SEO",
    image: "/placeholder.svg?height=80&width=120&query=seo+rankings",
    author: "Jessica Williams",
    publishDate: "2023-11-05",
  },
  {
    id: "post4",
    title: "Building Scalable E-commerce with Modern CMS",
    views: 14280,
    likes: 592,
    shares: 245,
    category: "E-commerce",
    image: "/placeholder.svg?height=80&width=120&query=ecommerce+cms",
    author: "Robert Davis",
    publishDate: "2023-10-28",
  },
]

// Latest Posts Data
export const latestPostsData = [
  {
    id: "latest1",
    title: "Implementing AI-Powered Content Recommendations",
    excerpt: "Learn how to leverage artificial intelligence to deliver personalized content experiences to your users.",
    category: "Artificial Intelligence",
    image: "/placeholder.svg?height=200&width=400&query=ai+content+recommendations",
    author: "Sarah Johnson",
    avatar: "/colorful-abstract-shapes.png",
    publishDate: "2023-12-02",
    readTime: "8 min read",
  },
  {
    id: "latest2",
    title: "The Complete Guide to Content Localization",
    excerpt: "Discover strategies for effectively translating and adapting your content for global audiences.",
    category: "Global Content",
    image: "/placeholder.svg?height=200&width=400&query=content+localization",
    author: "Michael Chen",
    avatar: "/colorful-abstract-shapes.png",
    publishDate: "2023-12-01",
    readTime: "12 min read",
  },
  {
    id: "latest3",
    title: "Optimizing Media Performance for Better UX",
    excerpt: "Techniques for improving load times and user experience through optimized media delivery.",
    category: "Performance",
    image: "/placeholder.svg?height=200&width=400&query=media+optimization",
    author: "Jessica Williams",
    avatar: "/abstract-geometric-shapes.png",
    publishDate: "2023-11-30",
    readTime: "6 min read",
  },
  {
    id: "latest4",
    title: "Content Governance Best Practices for Enterprise",
    excerpt: "How to establish effective content governance frameworks for large organizations.",
    category: "Enterprise",
    image: "/placeholder.svg?height=200&width=400&query=content+governance",
    author: "Robert Davis",
    avatar: "/abstract-geometric-shapes.png",
    publishDate: "2023-11-29",
    readTime: "10 min read",
  },
  {
    id: "latest5",
    title: "Measuring Content ROI: Beyond Pageviews",
    excerpt: "Advanced metrics and approaches for measuring the true business impact of your content.",
    category: "Analytics",
    image: "/placeholder.svg?height=200&width=400&query=content+roi",
    author: "Amanda Lee",
    avatar: "/abstract-geometric-shapes.png",
    publishDate: "2023-11-28",
    readTime: "9 min read",
  },
]

// User Engagement Data
export const userEngagementData = [
  { day: "Mon", pageviews: 12400, uniqueVisitors: 8200 },
  { day: "Tue", pageviews: 14600, uniqueVisitors: 9400 },
  { day: "Wed", pageviews: 13800, uniqueVisitors: 8800 },
  { day: "Thu", pageviews: 15200, uniqueVisitors: 9600 },
  { day: "Fri", pageviews: 16400, uniqueVisitors: 10200 },
  { day: "Sat", pageviews: 11800, uniqueVisitors: 7600 },
  { day: "Sun", pageviews: 10600, uniqueVisitors: 6800 },
]

// Device Distribution Data
export const deviceDistributionData = [
  { name: "Mobile", value: 52, color: "#3b82f6" },
  { name: "Desktop", value: 38, color: "#10b981" },
  { name: "Tablet", value: 10, color: "#f59e0b" },
]

// Content Status Distribution
export const contentStatusData = [
  { name: "Published", value: 68, color: "#10b981" },
  { name: "Draft", value: 22, color: "#f59e0b" },
  { name: "Scheduled", value: 6, color: "#3b82f6" },
  { name: "Under Review", value: 4, color: "#8b5cf6" },
]

// Quick Stats
export const quickStatsData = [
  {
    title: "Total Content",
    value: "2,348",
    trend: { value: 12, label: "vs last month", positive: true },
    icon: <FileText className="h-5 w-5" />,
    color: "blue",
  },
  {
    title: "Media Files",
    value: "3,709",
    trend: { value: 8, label: "vs last month", positive: true },
    icon: <ImageIcon className="h-5 w-5" />,
    color: "purple",
  },
  {
    title: "Avg. Engagement",
    value: "4.2m",
    trend: { value: 3, label: "vs last month", positive: true },
    icon: <ThumbsUp className="h-5 w-5" />,
    color: "emerald",
  },
  {
    title: "SEO Score",
    value: "86/100",
    trend: { value: 5, label: "vs last month", positive: true },
    icon: <Search className="h-5 w-5" />,
    color: "amber",
  },
]
