"use client"
import { Download, Trash2, FolderPlus, Tag, Star, CheckSquare, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { MediaItem } from "@/lib/types/media-types"

interface BatchOperationsProps {
  selectedItems: MediaItem[]
  onClearSelection: () => void
  onDownloadSelected: () => void
  onDeleteSelected: () => void
  onMoveSelected: () => void
  onTagSelected: () => void
  onFavoriteSelected: () => void
  onSelectAll: () => void
  onDeselectAll: () => void
  totalItems: number
}

export function BatchOperations({
  selectedItems,
  onClearSelection,
  onDownloadSelected,
  onDeleteSelected,
  onMoveSelected,
  onTagSelected,
  onFavoriteSelected,
  onSelectAll,
  onDeselectAll,
  totalItems,
}: BatchOperationsProps) {
  const selectedCount = selectedItems.length
  const isAllSelected = selectedCount === totalItems && totalItems > 0

  if (selectedCount === 0) {
    return (
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 border-border/40">
              <Square className="h-3.5 w-3.5" />
              <span>Select</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={onSelectAll}>
              <CheckSquare className="mr-2 h-4 w-4" />
              <span>Select All</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 bg-primary/5 px-3 py-2 rounded-md border border-primary/10 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-1.5 text-sm font-medium">
        <CheckSquare className="h-4 w-4 text-primary" />
        <span>{selectedCount} selected</span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onDownloadSelected}
          title="Download selected"
        >
          <Download className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onMoveSelected}
          title="Move selected"
        >
          <FolderPlus className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onTagSelected}
          title="Tag selected"
        >
          <Tag className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onFavoriteSelected}
          title="Favorite selected"
        >
          <Star className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onDeleteSelected}
          title="Delete selected"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="ml-auto h-8 px-2 text-muted-foreground hover:text-foreground"
        onClick={onClearSelection}
      >
        <X className="mr-2 h-3.5 w-3.5" />
        <span>Clear selection</span>
      </Button>
    </div>
  )
}
