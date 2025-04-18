"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  avatar: string
  publishDate: string
  readTime: string
}

interface LatestPostsCarouselProps {
  posts: Post[]
}

export function LatestPostsCarousel({ posts }: LatestPostsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [posts])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === posts.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1))
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <Card className="overflow-hidden border shadow-sm dark:border-slate-800">
      <CardContent className="p-0">
        <div className="relative">
          <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
            <Badge className="bg-white/90 text-slate-800 backdrop-blur-sm dark:bg-slate-900/90 dark:text-white">
              Latest Posts
            </Badge>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm dark:bg-slate-800/80"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm dark:bg-slate-800/80"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] overflow-hidden">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-full w-full">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Badge className="mb-3 bg-blue-500 text-white">{post.category}</Badge>
                    <h3 className="mb-2 text-2xl font-bold">{post.title}</h3>
                    <p className="mb-4 line-clamp-2 text-sm text-slate-200">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {posts.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.5 w-8 rounded-full transition-all",
                  index === currentIndex ? "bg-white" : "bg-white/40",
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
