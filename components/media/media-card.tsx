// Create a new enhanced media card component with micro-interactions
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Link2, Trash2, Star, Info, Copy, Download, Edit, MoreHorizontal, StarOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MediaImage } from "@/components/media-image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { MediaItem, MediaType } from "@/lib/api/media-service"

interface MediaCardProps {
  item: MediaItem
  isSelected: boolean
  isFavorite: boolean
  viewMode: "grid" | "list"
  getMediaTypeIcon: (type: MediaType) => JSX.Element
  onSelect: (id: string) => void
  onViewDetails: (id: string) => void
  onCopyUrl: (url: string) => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export function MediaCard({
  item,
  isSelected,
  isFavorite,
  viewMode,
  getMediaTypeIcon,
  onSelect,
  onViewDetails,
  onCopyUrl,
  onDelete,
  onToggleFavorite,
}: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (viewMode === "grid") {
    return (
      <motion.div
        className={`media-card group relative rounded-xl border overflow-hidden transition-all ${
          isSelected ? "ring-2 ring-primary" : ""
        } dark:border-slate-800 bg-card`}
        onClick={() => onSelect(item.id)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="aspect-square relative bg-muted">
          {item.type === "image" ? (
            <MediaImage src={item.thumbnail || item.url} alt={item.alt || item.name} className="w-full h-full" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <motion.div
                className="p-6 rounded-full bg-muted-foreground/10"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? [0, -5, 5, -5, 5, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {getMediaTypeIcon(item.type)}
              </motion.div>
            </div>
          )}

          {/* Favorite button */}
          <AnimatePresence>
            <motion.button
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isFavorite || isHovered ? 1 : 0,
                scale: isFavorite || isHovered ? 1 : 0.8,
                rotate: isFavorite ? [0, 15, 0] : 0,
              }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite(item.id)
              }}
            >
              {isFavorite ? <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> : <Star className="h-4 w-4" />}
            </motion.button>
          </AnimatePresence>

          {/* Hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 bg-background/80 hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation()
                            onViewDetails(item.id)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 bg-background/80 hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation()
                            onCopyUrl(item.url)
                          }}
                        >
                          <Link2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy URL</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 bg-background/80 hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(item.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-3">
          <div className="truncate text-sm font-medium">{item.name}</div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center text-xs text-muted-foreground">
              {getMediaTypeIcon(item.type)}
              <span className="ml-1">{item.size}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px] animate-in fade-in-0 zoom-in-95 duration-100">
                <DropdownMenuItem onClick={() => onViewDetails(item.id)}>
                  <Info className="mr-2 h-4 w-4" />
                  <span>Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open(item.url, "_blank")}>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCopyUrl(item.url)}>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Copy URL</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewDetails(item.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleFavorite(item.id)}>
                  {isFavorite ? (
                    <>
                      <StarOff className="mr-2 h-4 w-4" />
                      <span>Remove Favorite</span>
                    </>
                  ) : (
                    <>
                      <Star className="mr-2 h-4 w-4" />
                      <span>Add to Favorites</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    )
  }

  // List view
  return (
    <motion.div
      className={`group flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
        isSelected ? "bg-muted" : ""
      }`}
      onClick={() => onSelect(item.id)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ backgroundColor: "hsl(var(--muted) / 0.5)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
        {item.type === "image" ? (
          <MediaImage src={item.thumbnail || item.url} alt={item.alt || item.name} className="w-full h-full" />
        ) : (
          <div className="p-2 rounded-full bg-muted-foreground/10">{getMediaTypeIcon(item.type)}</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="truncate font-medium">{item.name}</div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
          <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
          <span>•</span>
          <span>{item.size}</span>
          {item.dimensions && (
            <>
              <span>•</span>
              <span>{item.dimensions}</span>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite(item.id)
              }}
            >
              {isFavorite ? <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> : <Star className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails(item.id)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onCopyUrl(item.url)
              }}
            >
              <Link2 className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px] animate-in fade-in-0 zoom-in-95 duration-100">
                <DropdownMenuItem onClick={() => onViewDetails(item.id)}>
                  <Info className="mr-2 h-4 w-4" />
                  <span>Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open(item.url, "_blank")}>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCopyUrl(item.url)}>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Copy URL</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewDetails(item.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleFavorite(item.id)}>
                  {isFavorite ? (
                    <>
                      <StarOff className="mr-2 h-4 w-4" />
                      <span>Remove Favorite</span>
                    </>
                  ) : (
                    <>
                      <Star className="mr-2 h-4 w-4" />
                      <span>Add to Favorites</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
