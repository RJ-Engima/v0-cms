"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ThumbsUp, Share2, ArrowUpRight } from "lucide-react"

interface Post {
  id: string
  title: string
  views: number
  likes: number
  shares: number
  category: string
  image: string
  author: string
  publishDate: string
}

interface TopPostsListProps {
  posts: Post[]
}

export function TopPostsList({ posts }: TopPostsListProps) {
  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Top Performing Content</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative flex gap-4 rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-normal">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.publishDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mt-1 line-clamp-2 font-medium leading-tight">{post.title}</h3>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="h-3.5 w-3.5" />
                      <span>{post.shares.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
