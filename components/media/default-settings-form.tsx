"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import type { Folder } from "@/lib/api/media-service"
import type { FileMetadata } from "@/lib/types/media-types"

interface DefaultSettingsFormProps {
  folders: Folder[]
  defaultMetadata: FileMetadata
  onUpdateDefaultMetadata: (field: keyof FileMetadata, value: string | string[]) => void
  onApplyToAll: () => void
  isUploading: boolean
  fileCount: number
}

export function DefaultSettingsForm({
  folders,
  defaultMetadata,
  onUpdateDefaultMetadata,
  onApplyToAll,
  isUploading,
  fileCount,
}: DefaultSettingsFormProps) {
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !defaultMetadata.tags.includes(newTag.trim())) {
      onUpdateDefaultMetadata("tags", [...defaultMetadata.tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    onUpdateDefaultMetadata(
      "tags",
      defaultMetadata.tags.filter((t) => t !== tag),
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="default-folder">Default Folder</Label>
        <Select value={defaultMetadata.folderId} onValueChange={(value) => onUpdateDefaultMetadata("folderId", value)}>
          <SelectTrigger id="default-folder">
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

      <div className="space-y-2">
        <Label htmlFor="default-alt-text">Default Alt Text (for images)</Label>
        <Input
          id="default-alt-text"
          placeholder="Describe the image for accessibility"
          value={defaultMetadata.altText}
          onChange={(e) => onUpdateDefaultMetadata("altText", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Alt text helps make your content accessible to people using screen readers
        </p>
      </div>

      <div className="space-y-2">
        <Label>Default Tags</Label>
        <div className="flex flex-wrap gap-2 p-2 rounded-md border min-h-[80px]">
          {defaultMetadata.tags.map((tag, index) => (
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
        <Label htmlFor="default-description">Default Description</Label>
        <Textarea
          id="default-description"
          rows={3}
          placeholder="Add a description for these files"
          value={defaultMetadata.description}
          onChange={(e) => onUpdateDefaultMetadata("description", e.target.value)}
        />
      </div>

      {fileCount > 0 && (
        <Button className="w-full mt-4" onClick={onApplyToAll} disabled={isUploading}>
          Apply to All Files ({fileCount})
        </Button>
      )}
    </div>
  )
}
