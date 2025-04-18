"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import type { Folder } from "@/lib/api/media-service"

interface FolderBreadcrumbProps {
  currentFolderId: string
  folders: Folder[]
  onFolderSelect: (folderId: string) => void
}

export function FolderBreadcrumb({ currentFolderId, folders, onFolderSelect }: FolderBreadcrumbProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<Folder[]>([])

  useEffect(() => {
    if (currentFolderId === "all") {
      setBreadcrumbs([])
      return
    }

    const buildBreadcrumbs = (folderId: string, acc: Folder[] = []): Folder[] => {
      const folder = folders.find((f) => f.id === folderId)
      if (!folder) return acc

      const newAcc = [folder, ...acc]

      if (folder.parentId) {
        return buildBreadcrumbs(folder.parentId, newAcc)
      }

      return newAcc
    }

    setBreadcrumbs(buildBreadcrumbs(currentFolderId))
  }, [currentFolderId, folders])

  if (breadcrumbs.length === 0) {
    return (
      <div className="flex items-center text-sm mb-4">
        <span className="font-medium">All Files</span>
      </div>
    )
  }

  return (
    <div className="flex items-center flex-wrap text-sm mb-4">
      <button
        className="text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => onFolderSelect("all")}
      >
        All Files
      </button>

      {breadcrumbs.map((folder, index) => (
        <div key={folder.id} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium">{folder.name}</span>
          ) : (
            <button
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => onFolderSelect(folder.id)}
            >
              {folder.name}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
