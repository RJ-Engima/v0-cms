"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, X } from "lucide-react"
import type { Folder } from "@/lib/api/media-service"
import type { FileMetadata } from "@/lib/types/media-types"

interface UrlUploadFormProps {
  folders: Folder[]
  isUploading: boolean
  onUpload: (url: string, metadata: FileMetadata) => Promise<void>
}

export function UrlUploadForm({ folders, isUploading, onUpload }: UrlUploadFormProps) {
  const [url, setUrl] = useState("")
  const [metadata, setMetadata] = useState<FileMetadata>({
    tags: [],
    description: "",
    altText: "",
    folderId: "root",
  })
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !metadata.tags.includes(newTag.trim())) {
      setMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = async () => {
    if (!url) return
    await onUpload(url, metadata)
    // Reset form after successful upload
    setUrl("")
    setMetadata({
      tags: [],
      description: "",
      altText: "",
      folderId: "root",
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="media-url">Media URL</Label>
        <Input
          id="media-url"
          placeholder="https://example.com/image.jpg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isUploading}
        />
        <p className="text-xs text-muted-foreground">Enter the URL of the media file you want to add to your library</p>
      </div>

      {/* URL-specific metadata */}
      <div className="space-y-4 border rounded-md p-4 bg-muted/10">
        <h3 className="text-sm font-medium">File Details</h3>

        <div className="space-y-2">
          <Label htmlFor="url-folder">Folder</Label>
          <Select
            value={metadata.folderId}
            onValueChange={(value) => setMetadata((prev) => ({ ...prev, folderId: value }))}
          >
            <SelectTrigger id="url-folder">
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
          <Label htmlFor="url-alt-text">Alt Text (for images)</Label>
          <Input
            id="url-alt-text"
            placeholder="Describe the image for accessibility"
            value={metadata.altText}
            onChange={(e) => setMetadata((prev) => ({ ...prev, altText: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 p-2 rounded-md border min-h-[80px] bg-background">
            {metadata.tags.map((tag, index) => (
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
          <Label htmlFor="url-description">Description</Label>
          <Textarea
            id="url-description"
            rows={3}
            placeholder="Add a description for this file"
            value={metadata.description}
            onChange={(e) => setMetadata((prev) => ({ ...prev, description: e.target.value }))}
          />
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={!url || isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>Add URL</>
        )}
      </Button>
    </div>
  )
}
