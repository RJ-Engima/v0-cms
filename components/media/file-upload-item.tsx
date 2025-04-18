"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  X,
  Edit,
  Save,
  Folder,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ImageIcon,
  FileText,
  Film,
  Music,
  File,
} from "lucide-react"
import type { FileUploadState, FileMetadata } from "@/lib/types/media-types"
import type { Folder as FolderType } from "@/lib/api/media-service"

interface FileUploadItemProps {
  fileUpload: FileUploadState
  index: number
  folders: FolderType[]
  isUploading: boolean
  onRemove: (index: number) => void
  onRetry: (index: number) => void
  onUpdateMetadata: (index: number, field: keyof FileMetadata, value: string | string[]) => void
  onToggleEdit: (index: number) => void
  onAddTag: (index: number, tag: string) => void
  onRemoveTag: (index: number, tag: string) => void
}

export function FileUploadItem({
  fileUpload,
  index,
  folders,
  isUploading,
  onRemove,
  onRetry,
  onUpdateMetadata,
  onToggleEdit,
  onAddTag,
  onRemoveTag,
}: FileUploadItemProps) {
  const [newTag, setNewTag] = useState("")

  // Get folder name by ID
  const getFolderName = (folderId: string) => {
    if (folderId === "root") return "Root"
    const folder = folders.find((f) => f.id === folderId)
    return folder ? folder.name : "Unknown Folder"
  }

  // Get icon for file type
  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() || ""

    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) {
      return <ImageIcon className="h-5 w-5" />
    } else if (["mp4", "webm", "mov", "avi"].includes(extension)) {
      return <Film className="h-5 w-5" />
    } else if (["mp3", "wav", "ogg"].includes(extension)) {
      return <Music className="h-5 w-5" />
    } else if (["pdf", "doc", "docx", "txt"].includes(extension)) {
      return <FileText className="h-5 w-5" />
    } else {
      return <File className="h-5 w-5" />
    }
  }

  return (
    <AccordionItem
      value={`file-${index}`}
      className={`border rounded-lg mb-3 ${
        fileUpload.status === "success"
          ? "border-green-200 bg-green-50"
          : fileUpload.status === "error"
            ? "border-red-200 bg-red-50"
            : fileUpload.status === "uploading"
              ? "border-blue-200 bg-blue-50"
              : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3 flex-1">
          <div
            className={`p-2 rounded-md ${
              fileUpload.status === "success"
                ? "bg-green-100"
                : fileUpload.status === "error"
                  ? "bg-red-100"
                  : fileUpload.status === "uploading"
                    ? "bg-blue-100"
                    : "bg-muted"
            }`}
          >
            {fileUpload.preview ? (
              <div className="h-10 w-10 rounded overflow-hidden">
                <img
                  src={fileUpload.preview || "/placeholder.svg"}
                  alt={fileUpload.file.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              getFileTypeIcon(fileUpload.file.name)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate">{fileUpload.file.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>{(fileUpload.file.size / 1024 / 1024).toFixed(2)} MB</span>
              <span>•</span>
              <span>
                <Folder className="h-3 w-3 inline mr-1" />
                {getFolderName(fileUpload.metadata.folderId)}
              </span>
              {fileUpload.status === "uploading" && <span>• Uploading...</span>}
              {fileUpload.status === "success" && <span>• Completed</span>}
              {fileUpload.status === "error" && <span>• Failed</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {fileUpload.status === "uploading" && (
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: `${fileUpload.progress}%` }}
                />
              </div>
              <span className="text-xs font-medium">{fileUpload.progress}%</span>
              <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
            </div>
          )}

          {fileUpload.status === "success" && <CheckCircle2 className="h-5 w-5 text-green-500" />}

          {fileUpload.status === "error" && (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => onRetry(index)}
              >
                Retry
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onRemove(index)}
            disabled={isUploading && fileUpload.status === "uploading"}
          >
            <X className="h-4 w-4" />
          </Button>

          <AccordionTrigger className="p-0 hover:no-underline" />
        </div>
      </div>

      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">File Metadata</h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 flex items-center gap-1"
              onClick={() => onToggleEdit(index)}
              disabled={isUploading && fileUpload.status === "uploading"}
            >
              {fileUpload.isEditing ? (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`file-${index}-folder`}>Folder</Label>
              {fileUpload.isEditing ? (
                <Select
                  value={fileUpload.metadata.folderId}
                  onValueChange={(value) => onUpdateMetadata(index, "folderId", value)}
                  disabled={isUploading && fileUpload.status === "uploading"}
                >
                  <SelectTrigger id={`file-${index}-folder`}>
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
              ) : (
                <div className="text-sm p-2 border rounded-md bg-background">
                  {getFolderName(fileUpload.metadata.folderId)}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`file-${index}-alt`}>Alt Text (for images)</Label>
              {fileUpload.isEditing ? (
                <Input
                  id={`file-${index}-alt`}
                  placeholder="Describe the image for accessibility"
                  value={fileUpload.metadata.altText}
                  onChange={(e) => onUpdateMetadata(index, "altText", e.target.value)}
                  disabled={isUploading && fileUpload.status === "uploading"}
                />
              ) : (
                <div className="text-sm p-2 border rounded-md bg-background min-h-[36px]">
                  {fileUpload.metadata.altText || <span className="text-muted-foreground italic">No alt text</span>}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 p-2 rounded-md border min-h-[80px] bg-background">
              {fileUpload.metadata.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  {fileUpload.isEditing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-muted"
                      onClick={() => onRemoveTag(index, tag)}
                      disabled={isUploading && fileUpload.status === "uploading"}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </Badge>
              ))}
              {fileUpload.isEditing && (
                <Input
                  className="flex-1 min-w-[120px] border-0 p-0 h-7 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newTag.trim()) {
                      e.preventDefault()
                      onAddTag(index, newTag.trim())
                      setNewTag("")
                    }
                  }}
                  disabled={isUploading && fileUpload.status === "uploading"}
                />
              )}
              {!fileUpload.isEditing && fileUpload.metadata.tags.length === 0 && (
                <span className="text-sm text-muted-foreground italic">No tags</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`file-${index}-description`}>Description</Label>
            {fileUpload.isEditing ? (
              <Textarea
                id={`file-${index}-description`}
                rows={3}
                placeholder="Add a description for this file"
                value={fileUpload.metadata.description}
                onChange={(e) => onUpdateMetadata(index, "description", e.target.value)}
                disabled={isUploading && fileUpload.status === "uploading"}
              />
            ) : (
              <div className="text-sm p-2 border rounded-md bg-background min-h-[80px]">
                {fileUpload.metadata.description || (
                  <span className="text-muted-foreground italic">No description</span>
                )}
              </div>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
