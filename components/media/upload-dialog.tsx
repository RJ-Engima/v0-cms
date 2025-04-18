"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
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
import { Upload, X, ImageIcon, FileText, Film, Music, File, Check, Plus, Loader2 } from "lucide-react"
import { useMediaLibrary } from "@/hooks/use-media-library"
import { useToast } from "@/hooks/use-toast"
import type { MediaUploadOptions } from "@/lib/api/media-service"
import type { FileMetadata, FileUploadState, UploadStats } from "@/lib/types/media-types"
import { motion, AnimatePresence } from "framer-motion"

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const { toast } = useToast()
  const [{ folders }, { uploadFile, uploadFromUrl, refreshMediaLibrary }] = useMediaLibrary()

  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file")
  const [fileUploads, setFileUploads] = useState<FileUploadState[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadStats, setUploadStats] = useState<UploadStats>({
    total: 0,
    completed: 0,
    failed: 0,
    inProgress: 0,
  })

  // URL upload state
  const [urlToUpload, setUrlToUpload] = useState("")
  const [urlMetadata, setUrlMetadata] = useState<FileMetadata>({
    tags: [],
    description: "",
    altText: "",
    folderId: "root",
  })
  const [newUrlTag, setNewUrlTag] = useState("")

  // Default metadata for new uploads
  const [defaultMetadata, setDefaultMetadata] = useState<FileMetadata>({
    tags: [],
    description: "",
    altText: "",
    folderId: "root",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update upload statistics whenever fileUploads changes
  useEffect(() => {
    const stats = {
      total: fileUploads.length,
      completed: fileUploads.filter((item) => item.status === "success").length,
      failed: fileUploads.filter((item) => item.status === "error").length,
      inProgress: fileUploads.filter((item) => item.status === "uploading").length,
    }
    setUploadStats(stats)
  }, [fileUploads])

  // Add this function to handle new file uploads
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files)
    const newFileUploads: FileUploadState[] = newFiles.map((file) => {
      // Create preview URLs for image files
      let preview: string | undefined = undefined
      if (file.type.startsWith("image/")) {
        preview = URL.createObjectURL(file)
      }

      return {
        file,
        progress: 0,
        status: "idle",
        metadata: {
          tags: [...defaultMetadata.tags],
          description: defaultMetadata.description,
          altText: defaultMetadata.altText,
          folderId: defaultMetadata.folderId,
        },
        isEditing: false,
        preview,
      }
    })

    setFileUploads((prev) => [...prev, ...newFileUploads])
  }

  // Handle file removal
  const handleRemoveFile = (index: number) => {
    setFileUploads((prev) => {
      const updated = [...prev]
      // Revoke object URL if it exists
      if (updated[index].preview) {
        URL.revokeObjectURL(updated[index].preview)
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  // Handle URL upload
  const handleUrlUpload = async () => {
    if (!urlToUpload) return

    setIsUploading(true)

    try {
      // Prepare upload options
      const uploadOptions: MediaUploadOptions = {
        folder: folders.find((f) => f.id === urlMetadata.folderId)?.name || "Root",
        folderId: urlMetadata.folderId,
        tags: urlMetadata.tags,
        description: urlMetadata.description,
        alt: urlMetadata.altText,
      }

      // Upload from URL
      await uploadFromUrl(urlToUpload, uploadOptions)

      toast({
        title: "Upload complete",
        description: "Successfully uploaded file from URL",
      })

      // Reset form
      setUrlToUpload("")
      setUrlMetadata({
        tags: [],
        description: "",
        altText: "",
        folderId: "root",
      })

      // Refresh media library
      await refreshMediaLibrary()

      // Close dialog
      onOpenChange(false)
    } catch (error) {
      console.error("URL upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading from the URL",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Add a retry button for failed uploads
  const handleRetryUpload = (index: number) => {
    setFileUploads((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], status: "idle", progress: 0, error: undefined }
      return updated
    })
  }

  // Handle file uploads
  const handleFileUpload = async () => {
    if (fileUploads.length === 0) return

    setIsUploading(true)

    // Find files that are in idle state
    const pendingUploads = fileUploads
      .map((item, index) => ({ ...item, index }))
      .filter((item) => item.status === "idle")

    if (pendingUploads.length === 0) {
      setIsUploading(false)
      return
    }

    // Process files one by one to avoid race conditions
    for (const { file, index, metadata } of pendingUploads) {
      // Update status to uploading
      setFileUploads((prev) => {
        const updated = [...prev]
        updated[index] = { ...updated[index], status: "uploading", progress: 0 }
        return updated
      })

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setFileUploads((prev) => {
          const updated = [...prev]
          if (updated[index] && updated[index].status === "uploading") {
            const currentProg = updated[index].progress
            // Slow down progress as it gets closer to 100%
            const increment = Math.max(1, Math.floor((100 - currentProg) / 10))
            const newProgress = Math.min(currentProg + increment, 95)
            updated[index] = { ...updated[index], progress: newProgress }
          }
          return updated
        })
      }, 200)

      try {
        // Prepare upload options with file-specific metadata
        const uploadOptions: MediaUploadOptions = {
          folder: folders.find((f) => f.id === metadata.folderId)?.name || "Root",
          folderId: metadata.folderId,
          tags: metadata.tags,
          description: metadata.description,
          alt: metadata.altText,
        }

        // Upload the file with its specific metadata
        const result = await uploadFile(file, uploadOptions)

        // Clear interval and mark as success
        clearInterval(progressInterval)
        setFileUploads((prev) => {
          const updated = [...prev]
          updated[index] = {
            ...updated[index],
            progress: 100,
            status: "success",
            result: result,
          }
          return updated
        })
      } catch (error) {
        // Clear interval and mark as error
        clearInterval(progressInterval)
        setFileUploads((prev) => {
          const updated = [...prev]
          updated[index] = {
            ...updated[index],
            progress: 0,
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error",
          }
          return updated
        })
      }
    }

    // All uploads are complete
    setIsUploading(false)

    // Show toast with summary
    const successCount = fileUploads.filter((item) => item.status === "success").length
    const failedCount = fileUploads.filter((item) => item.status === "error").length

    if (successCount > 0) {
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${successCount} file(s)${failedCount > 0 ? `, ${failedCount} failed` : ""}`,
      })

      // Refresh media library
      await refreshMediaLibrary()

      // Close dialog if there were any successful uploads
      if (successCount > 0) {
        onOpenChange(false)
      }
    } else if (failedCount > 0) {
      toast({
        title: "Upload failed",
        description: `Failed to upload ${failedCount} file(s)`,
        variant: "destructive",
      })
    }
  }

  // Handle URL tag addition
  const handleAddUrlTag = () => {
    if (newUrlTag.trim() && !urlMetadata.tags.includes(newUrlTag.trim())) {
      setUrlMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, newUrlTag.trim()],
      }))
      setNewUrlTag("")
    }
  }

  // Handle URL tag removal
  const handleRemoveUrlTag = (tag: string) => {
    setUrlMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  // Get file type icon
  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() || ""

    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />
    } else if (["mp4", "webm", "mov", "avi"].includes(extension)) {
      return <Film className="h-5 w-5 text-purple-500" />
    } else if (["mp3", "wav", "ogg"].includes(extension)) {
      return <Music className="h-5 w-5 text-amber-500" />
    } else if (["pdf", "doc", "docx", "txt"].includes(extension)) {
      return <FileText className="h-5 w-5 text-emerald-500" />
    } else {
      return <File className="h-5 w-5 text-slate-500" />
    }
  }

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      // Store the previews to clean up
      const previewsToCleanup = fileUploads.filter((upload) => upload.preview).map((upload) => upload.preview as string)

      // Reset all state
      setFileUploads([])
      setUploadMethod("file")
      setDragActive(false)
      setIsUploading(false)
      setUrlToUpload("")
      setUrlMetadata({
        tags: [],
        description: "",
        altText: "",
        folderId: "root",
      })

      // Clean up previews
      previewsToCleanup.forEach((url) => {
        try {
          URL.revokeObjectURL(url)
        } catch (e) {
          console.error("Error revoking URL:", e)
        }
      })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] w-[90vw] p-0 overflow-hidden bg-card dark:bg-slate-900/90 backdrop-blur-sm">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>
            Upload media files to your library. You can upload files from your device or from a URL.
          </DialogDescription>
        </DialogHeader>

        {/* Modern progress bar that stays fixed at the top */}
        {uploadStats.total > 0 && (
          <div className="sticky top-0 z-10 bg-background/50 backdrop-blur-sm px-6 pt-2 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">
                {isUploading
                  ? "Uploading..."
                  : uploadStats.completed === uploadStats.total
                    ? "Complete"
                    : "Ready to upload"}
              </div>
              <div className="text-sm text-muted-foreground">
                {uploadStats.completed} of {uploadStats.total} complete
                {uploadStats.failed > 0 && `, ${uploadStats.failed} failed`}
              </div>
            </div>

            <Progress
              value={(uploadStats.completed / uploadStats.total) * 100}
              className={`h-2 ${
                uploadStats.failed > 0
                  ? "bg-gradient-to-r from-green-500 to-red-500"
                  : uploadStats.completed === uploadStats.total
                    ? "bg-green-500"
                    : ""
              }`}
            />
          </div>
        )}

        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <Tabs
            defaultValue="file"
            className="mt-4"
            onValueChange={(value) => setUploadMethod(value as "file" | "url")}
          >
            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger
                value="file"
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Upload File
              </TabsTrigger>
              <TabsTrigger
                value="url"
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                From URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="file" className="mt-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 dark:border-muted-foreground/15"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <motion.div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: dragActive ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload className="h-10 w-10 text-primary" />
                </motion.div>
                <h3 className="mt-4 text-xl font-semibold">Drag & Drop your files</h3>
                <p className="mt-2 text-sm text-muted-foreground">or click to browse from your computer</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  multiple
                />
                <Button
                  variant="outline"
                  className="mt-6 px-8 bg-muted/50 border-slate-200 dark:border-slate-800"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  Select Files
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="url" className="mt-4">
              <div className="space-y-6 bg-muted/10 p-6 rounded-lg border border-border/40">
                <div className="space-y-2">
                  <Label htmlFor="media-url">Media URL</Label>
                  <Input
                    id="media-url"
                    placeholder="https://example.com/image.jpg"
                    value={urlToUpload}
                    onChange={(e) => setUrlToUpload(e.target.value)}
                    disabled={isUploading}
                    className="bg-muted/50 border-slate-200 dark:border-slate-800"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the URL of the media file you want to add to your library
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="url-folder">Folder</Label>
                    <Select
                      value={urlMetadata.folderId}
                      onValueChange={(value) => setUrlMetadata((prev) => ({ ...prev, folderId: value }))}
                    >
                      <SelectTrigger id="url-folder" className="bg-muted/50 border-slate-200 dark:border-slate-800">
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
                      value={urlMetadata.altText}
                      onChange={(e) => setUrlMetadata((prev) => ({ ...prev, altText: e.target.value }))}
                      className="bg-muted/50 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 p-2 rounded-md border min-h-[80px] bg-muted/50 dark:border-slate-800">
                    {urlMetadata.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-muted">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-muted"
                          onClick={() => handleRemoveUrlTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    <div className="flex items-center gap-2 flex-1 min-w-[120px]">
                      <Input
                        className="flex-1 border-0 p-0 h-7 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                        placeholder="Add tag..."
                        value={newUrlTag}
                        onChange={(e) => setNewUrlTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddUrlTag()
                          }
                        }}
                      />
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleAddUrlTag}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Press Enter to add a tag</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url-description">Description</Label>
                  <textarea
                    id="url-description"
                    rows={3}
                    className="w-full min-h-[80px] rounded-md border border-input bg-muted/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800"
                    placeholder="Add a description for this file"
                    value={urlMetadata.description}
                    onChange={(e) => setUrlMetadata((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Selected files list */}
          <AnimatePresence>
            {fileUploads.length > 0 && (
              <motion.div
                className="mt-6 space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Selected Files ({fileUploads.length})</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setFileUploads([])} disabled={isUploading}>
                      Clear All
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {fileUploads.map((fileUpload, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        fileUpload.status === "success"
                          ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
                          : fileUpload.status === "error"
                            ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                            : fileUpload.status === "uploading"
                              ? "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20"
                              : "border-gray-200 dark:border-gray-800 bg-muted/50"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* File preview/icon */}
                      <div
                        className={`h-12 w-12 rounded-md overflow-hidden flex items-center justify-center ${
                          fileUpload.status === "success"
                            ? "bg-green-100 dark:bg-green-900/30"
                            : fileUpload.status === "error"
                              ? "bg-red-100 dark:bg-red-900/30"
                              : fileUpload.status === "uploading"
                                ? "bg-blue-100 dark:bg-blue-900/30"
                                : "bg-muted"
                        }`}
                      >
                        {fileUpload.preview ? (
                          <img
                            src={fileUpload.preview || "/placeholder.svg"}
                            alt={fileUpload.file.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="text-muted-foreground">{getFileTypeIcon(fileUpload.file.name)}</div>
                        )}
                      </div>

                      {/* File info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{fileUpload.file.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span>{(fileUpload.file.size / 1024 / 1024).toFixed(2)} MB</span>
                          {fileUpload.status === "uploading" && (
                            <div className="flex items-center gap-2">
                              <Progress value={fileUpload.progress} className="w-20 h-1.5" />
                              <span>{fileUpload.progress}%</span>
                            </div>
                          )}
                          {fileUpload.status === "success" && (
                            <span className="flex items-center text-green-600 dark:text-green-400">
                              <Check className="h-3 w-3 mr-1" /> Completed
                            </span>
                          )}
                          {fileUpload.status === "error" && (
                            <span className="flex items-center text-red-600 dark:text-red-400">
                              <X className="h-3 w-3 mr-1" /> Failed
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {fileUpload.status === "error" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/20"
                            onClick={() => handleRetryUpload(index)}
                          >
                            Retry
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 dark:text-red-400"
                          onClick={() => handleRemoveFile(index)}
                          disabled={isUploading && fileUpload.status === "uploading"}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className="px-6 py-4 border-t dark:border-slate-800">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
            Cancel
          </Button>
          {uploadMethod === "file" ? (
            <Button
              onClick={handleFileUpload}
              disabled={isUploading || fileUploads.length === 0 || fileUploads.every((item) => item.status !== "idle")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm hover:from-blue-700 hover:to-indigo-700"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {fileUploads.filter((item) => item.status === "idle").length} File(s)
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleUrlUpload}
              disabled={!urlToUpload || isUploading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm hover:from-blue-700 hover:to-indigo-700"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Add URL
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
