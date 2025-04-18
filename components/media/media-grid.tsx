"use client"
import { MoreHorizontal, Download, Trash2, Edit, Star, Eye, Clock } from "lucide-react"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { MediaItem } from "@/lib/types/media-types"
import { MediaImage } from "@/components/media-image"
import { formatFileSize, formatDate } from "@/lib/utils"

interface MediaGridProps {
  items: MediaItem[]
  onSelect: (item: MediaItem) => void
  onDelete: (id: string) => void
  onEdit: (item: MediaItem) => void
  onDownload: (item: MediaItem) => void
  onToggleFavorite: (id: string, isFavorite: boolean) => void
}

export function MediaGrid({ items, onSelect, onDelete, onEdit, onDownload, onToggleFavorite }: MediaGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm transition-all duration-200 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20"
        >
          <div className="relative aspect-square overflow-hidden">
            <div
              className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={() => onSelect(item)}
            ></div>

            <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onEdit(item)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit Details</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownload(item)}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleFavorite(item.id, !item.isFavorite)}>
                    <Star className={`mr-2 h-4 w-4 ${item.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                    <span>{item.isFavorite ? "Remove Favorite" : "Add to Favorites"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete(item.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 z-20 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={() => onSelect(item)}
            >
              <h3 className="text-sm font-medium text-white truncate">{item.filename}</h3>
              <p className="text-xs text-white/70">{formatFileSize(item.size)}</p>
            </div>

            {item.isFavorite && (
              <div className="absolute top-2 left-2 z-20">
                <Badge variant="secondary" className="bg-yellow-500/90 hover:bg-yellow-500 text-white">
                  <Star className="h-3 w-3 fill-current mr-1" />
                  <span className="text-xs">Favorite</span>
                </Badge>
              </div>
            )}

            <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
              <MediaImage
                src={item.url}
                alt={item.filename}
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <CardFooter className="flex justify-between items-center p-3 bg-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                <span>{item.views || 0}</span>
              </div>
              <div className="flex items-center">
                <Download className="h-3 w-3 mr-1" />
                <span>{item.downloads || 0}</span>
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(item.dateCreated)}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
