"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import type { Folder } from "@/lib/api/media-service"
import type { FileMetadata } from "@/lib/types/media-types"

interface FileMetadataDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  file: File
  metadata: FileMetadata
  folders: Folder[]
  onSave: (metadata: FileMetadata) => void
}

export function FileMetadataDialog({ open, onOpenChange, file, metadata, folders, onSave }: FileMetadataDialogProps) {
  const [editedMetadata, setEditedMetadata] = useState<FileMetadata>({ ...metadata })
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !editedMetadata.tags.includes(newTag.trim())) {
      setEditedMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setEditedMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleSave = () => {
    onSave(editedMetadata)
  }

  // Get file type icon
  const getFileTypeIcon = () => {
    if (file.type.startsWith("image/")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-image"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      )
    } else if (file.type.startsWith("video/")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-film"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 3v18" />
          <path d="M3 7h18" />
          <path d="M3 11h18" />
          <path d="M3 15h18" />
          <path d="M3 19h18" />
          <path d="M17 3v18" />
        </svg>
      )
    } else if (file.type.startsWith("audio/")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-music"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-file"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit File Metadata</DialogTitle>
          <DialogDescription>Update information for this file before uploading</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={file.name}
                  className="h-full w-full object-cover"
                  onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                />
              ) : (
                <div className="text-muted-foreground">{getFileTypeIcon()}</div>
              )}
            </div>

            <div>
              <h3 className="font-medium">{file.name}</h3>
              <p className="text-sm text-muted-foreground">
                {file.type} • {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-folder">Folder</Label>
            <Select
              value={editedMetadata.folderId}
              onValueChange={(value) => setEditedMetadata((prev) => ({ ...prev, folderId: value }))}
            >
              <SelectTrigger id="file-folder">
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="root">Root</SelectItem>
                {folders
                  .filter((folder) => folder.id !== "root")
                  .map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {file.type.startsWith("image/") && (
            <div className="space-y-2">
              <Label htmlFor="file-alt-text">Alt Text</Label>
              <Input
                id="file-alt-text"
                placeholder="Describe the image for accessibility"
                value={editedMetadata.altText}
                onChange={(e) => setEditedMetadata((prev) => ({ ...prev, altText: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground">
                Alt text helps make your content accessible to people using screen readers
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 p-2 rounded-md border min-h-[80px]">
              {editedMetadata.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-muted"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Input
                className="flex-1 min-w-[120px] border-0 p-0 h-7 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Press Enter to add a tag</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-description">Description</Label>
            <Textarea
              id="file-description"
              rows={3}
              placeholder="Add a description for this file"
              value={editedMetadata.description}
              onChange={(e) => setEditedMetadata((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
