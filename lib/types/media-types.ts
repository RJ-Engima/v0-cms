import type { MediaItem } from "@/lib/api/media-service"

export interface FileMetadata {
  tags: string[]
  description: string
  altText: string
  folderId: string
}

export interface FileUploadState {
  file: File
  progress: number
  status: "idle" | "uploading" | "success" | "error"
  metadata: FileMetadata
  isEditing: boolean
  preview?: string
  error?: string
  result?: MediaItem
}

export interface UploadStats {
  total: number
  inProgress: number
  completed: number
  failed: number
}
