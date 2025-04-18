// Create a new component for folder tree items with animations
"use client"

import type React from "react"

import { useState } from "react"
import { Folder, ChevronRight, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Folder as FolderType } from "@/lib/api/media-service"

interface MediaFolderTreeItemProps {
  folder: FolderType
  level: number
  selectedFolder: string
  folderCounts: Record<string, number>
  childFolders: FolderType[]
  onSelectFolder: (id: string) => void
  onCreateFolder: (parentId: string) => void
  onRenameFolder: (id: string) => void
  onDeleteFolder: (id: string) => void
}

export function MediaFolderTreeItem({
  folder,
  level,
  selectedFolder,
  folderCounts,
  childFolders,
  onSelectFolder,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
}: MediaFolderTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = childFolders.length > 0
  const isSelected = selectedFolder === folder.id

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="select-none">
      <div
        className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
          isSelected ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : "hover:bg-muted"
        }`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={() => onSelectFolder(folder.id)}
      >
        <div className="flex items-center min-w-0">
          {hasChildren && (
            <motion.button
              className={`mr-1 p-0.5 rounded-sm ${isSelected ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
              onClick={toggleExpand}
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </motion.button>
          )}

          <Folder className={`mr-2 h-4 w-4 ${isSelected ? "text-white" : "text-muted-foreground"}`} />

          <span className="truncate">{folder.name}</span>
        </div>

        <div className="flex items-center gap-1">
          <Badge
            variant={isSelected ? "outline" : "secondary"}
            className={isSelected ? "border-white/50 text-white bg-white/10" : "bg-muted"}
          >
            {folderCounts[folder.id] || 0}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 ${
                  isSelected ? "text-white hover:bg-white/10" : "hover:bg-muted-foreground/10"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onCreateFolder(folder.id)}>
                <Folder className="mr-2 h-4 w-4" />
                <span>New Subfolder</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRenameFolder(folder.id)}>
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
                  className="mr-2 h-4 w-4"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                onClick={() => onDeleteFolder(folder.id)}
              >
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
                  className="mr-2 h-4 w-4"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {childFolders.map((childFolder) => (
              <MediaFolderTreeItem
                key={childFolder.id}
                folder={childFolder}
                level={level + 1}
                selectedFolder={selectedFolder}
                folderCounts={folderCounts}
                childFolders={[]} // This would need to be populated with actual child folders
                onSelectFolder={onSelectFolder}
                onCreateFolder={onCreateFolder}
                onRenameFolder={onRenameFolder}
                onDeleteFolder={onDeleteFolder}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
