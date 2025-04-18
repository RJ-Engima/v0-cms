// Types
export type MediaType = "image" | "video" | "audio" | "document" | "other"

export interface MediaItem {
  id: string
  name: string
  type: MediaType
  size: string
  dimensions?: string
  duration?: string
  url: string
  thumbnail?: string
  folder: string
  folderId: string
  tags?: string[]
  uploadedBy: string
  uploadedAt: string
  description?: string
  alt?: string
}

export interface MediaUploadOptions {
  folder: string
  folderId: string
  tags?: string[]
  description?: string
  alt?: string
}

export interface MediaUpdateOptions {
  name?: string
  description?: string
  alt?: string
  tags?: string[]
}

export interface Folder {
  id: string
  name: string
  parentId?: string
}

// Update the sample folders to match the URL structure
const sampleFolders: Folder[] = [
  { id: "root", name: "Root" },
  { id: "marketing", name: "Marketing", parentId: "root" },
  { id: "m2p-blog", name: "M2P Blog", parentId: "marketing" },
  { id: "m2p-events", name: "M2P Events", parentId: "marketing" },
  { id: "m2p-press", name: "M2P Press", parentId: "marketing" },
  { id: "m2p-webinars", name: "M2P Webinars", parentId: "marketing" },
  { id: "2025", name: "2025", parentId: "m2p-blog" },
  { id: "2025-events", name: "2025", parentId: "m2p-events" },
  { id: "2025-press", name: "2025", parentId: "m2p-press" },
  { id: "2025-webinars", name: "2025", parentId: "m2p-webinars" },
  { id: "04-blog", name: "April", parentId: "2025" },
  { id: "04-events", name: "April", parentId: "2025-events" },
  { id: "04-press", name: "April", parentId: "2025-press" },
  { id: "04-webinars", name: "April", parentId: "2025-webinars" },
  { id: "products", name: "Products", parentId: "root" },
  { id: "docs", name: "Documentation", parentId: "root" },
]

// Update some of the sample media to use the new folder structure
const sampleMedia: MediaItem[] = [
  {
    id: "img1",
    name: "hero-banner.jpg",
    type: "image",
    size: "1.2 MB",
    dimensions: "1920 x 1080",
    url: "/vibrant-cityscape.png",
    thumbnail: "/vibrant-cityscape.png",
    folder: "April (Blog)",
    folderId: "04-blog",
    tags: ["banner", "hero"],
    uploadedBy: "Admin User",
    uploadedAt: "2 hours ago",
    description: "Main hero banner for the homepage",
    alt: "Company product showcase",
  },
  {
    id: "img2",
    name: "events-01-1.jpg",
    type: "image",
    size: "800 KB",
    dimensions: "800 x 600",
    url: "/vibrant-tech-conference.png",
    thumbnail: "/vibrant-tech-conference.png",
    folder: "April (Events)",
    folderId: "04-events",
    tags: ["event", "conference"],
    uploadedBy: "Admin User",
    uploadedAt: "1 day ago",
    description: "Tech conference event photo",
    alt: "People at tech conference",
  },
  {
    id: "img3",
    name: "events-02-1.jpg",
    type: "image",
    size: "1.5 MB",
    dimensions: "1200 x 800",
    url: "/assorted-products-display.png",
    thumbnail: "/assorted-products-display.png",
    folder: "April (Events)",
    folderId: "04-events",
    tags: ["event", "meetup"],
    uploadedBy: "Admin User",
    uploadedAt: "3 days ago",
    description: "Industry meetup event photo",
    alt: "Industry professionals networking",
  },
  {
    id: "doc1",
    name: "user-manual.pdf",
    type: "document",
    size: "2.4 MB",
    url: "/digital-document.png",
    folder: "Documentation",
    folderId: "docs",
    tags: ["manual", "instructions"],
    uploadedBy: "Admin User",
    uploadedAt: "3 days ago",
    description: "User manual for the product",
  },
  {
    id: "vid1",
    name: "product-demo.mp4",
    type: "video",
    size: "24.6 MB",
    dimensions: "1920 x 1080",
    duration: "2:34",
    url: "/abstract-colorful-flow.png",
    thumbnail: "/abstract-colorful-flow.png",
    folder: "Products",
    folderId: "products",
    tags: ["demo", "product", "video"],
    uploadedBy: "Admin User",
    uploadedAt: "1 week ago",
    description: "Product demonstration video",
  },
  {
    id: "aud1",
    name: "podcast-episode.mp3",
    type: "audio",
    size: "12.8 MB",
    duration: "18:22",
    url: "/audio-waveform-abstract.png",
    folder: "April (Blog)",
    folderId: "04-blog",
    tags: ["podcast", "episode"],
    uploadedBy: "Admin User",
    uploadedAt: "2 weeks ago",
    description: "Latest podcast episode",
  },
  {
    id: "img4",
    name: "press-release-01.jpg",
    type: "image",
    size: "900 KB",
    dimensions: "1000 x 667",
    url: "/vibrant-stack-of-organic-produce.png",
    thumbnail: "/vibrant-stack-of-organic-produce.png",
    folder: "April (Press)",
    folderId: "04-press",
    tags: ["press", "release"],
    uploadedBy: "Admin User",
    uploadedAt: "2 weeks ago",
    description: "Press release announcement photo",
    alt: "Company press release",
  },
  {
    id: "img5",
    name: "webinar-01.jpg",
    type: "image",
    size: "1.1 MB",
    dimensions: "1280 x 720",
    url: "/abstract-thumbnail.png",
    thumbnail: "/abstract-thumbnail.png",
    folder: "April (Webinars)",
    folderId: "04-webinars",
    tags: ["webinar", "online"],
    uploadedBy: "Admin User",
    uploadedAt: "3 weeks ago",
    description: "Webinar promotional image",
    alt: "Upcoming webinar announcement",
  },
  {
    id: "doc2",
    name: "brand-guidelines.pdf",
    type: "document",
    size: "5.6 MB",
    url: "/digital-document.png",
    folder: "Products",
    folderId: "products",
    tags: ["guidelines", "branding"],
    uploadedBy: "Admin User",
    uploadedAt: "1 month ago",
    description: "Company brand guidelines",
  },
  {
    id: "vid2",
    name: "webinar-recording.mp4",
    type: "video",
    size: "48.2 MB",
    dimensions: "1920 x 1080",
    duration: "45:12",
    url: "/abstract-colorful-flow.png",
    thumbnail: "/abstract-colorful-flow.png",
    folder: "April (Webinars)",
    folderId: "04-webinars",
    tags: ["webinar", "recording"],
    uploadedBy: "Admin User",
    uploadedAt: "1 month ago",
    description: "Recorded webinar session",
  },
  {
    id: "img6",
    name: "blog-feature-image.jpg",
    type: "image",
    size: "1.3 MB",
    dimensions: "1600 x 900",
    url: "/modern-workspace.png",
    thumbnail: "/modern-workspace.png",
    folder: "April (Blog)",
    folderId: "04-blog",
    tags: ["blog", "feature"],
    uploadedBy: "Admin User",
    uploadedAt: "1 month ago",
    description: "Feature image for blog post",
    alt: "Blog post feature image",
  },
  {
    id: "img7",
    name: "background-pattern.jpg",
    type: "image",
    size: "1.5 MB",
    dimensions: "1500 x 1500",
    url: "/abstract-geometric-flow.png",
    thumbnail: "/abstract-geometric-flow.png",
    folder: "Products",
    folderId: "products",
    tags: ["background", "pattern"],
    uploadedBy: "Admin User",
    uploadedAt: "3 months ago",
    description: "Repeatable background pattern",
    alt: "Background pattern",
  },
  {
    id: "img8",
    name: "icon-set.png",
    type: "image",
    size: "450 KB",
    dimensions: "500 x 500",
    url: "/abstract-geometric-flow.png",
    thumbnail: "/abstract-geometric-flow.png",
    folder: "Products",
    folderId: "products",
    tags: ["icons", "ui"],
    uploadedBy: "Admin User",
    uploadedAt: "2 months ago",
    description: "UI icon set",
    alt: "Collection of UI icons",
  },
  {
    id: "img9",
    name: "small-thumbnail.jpg",
    type: "image",
    size: "120 KB",
    dimensions: "300 x 200",
    url: "/abstract-thumbnail.png",
    thumbnail: "/abstract-thumbnail.png",
    folder: "April (Blog)",
    folderId: "04-blog",
    tags: ["thumbnail", "small"],
    uploadedBy: "Admin User",
    uploadedAt: "1 week ago",
    description: "Small thumbnail image",
    alt: "Small thumbnail for blog post",
  },
]

// Simulated API service
class MediaService {
  private media: MediaItem[] = [...sampleMedia]
  private folders: Folder[] = [...sampleFolders]

  // Helper to simulate API delay
  private async delay(ms = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Generate a random ID
  private generateId(): string {
    return Math.random().toString(36).substring(2, 9)
  }

  // Get all media with filtering, sorting, and pagination
  async getMedia({
    folderId = "all",
    search = "",
    type = "all",
    sortBy = "newest",
    page = 1,
    limit = 50,
  }: {
    folderId?: string
    search?: string
    type?: string
    sortBy?: string
    page?: number
    limit?: number
  }): Promise<{ media: MediaItem[]; total: number }> {
    await this.delay()

    // Filter by folder
    let filteredMedia = [...this.media]
    if (folderId !== "all") {
      filteredMedia = filteredMedia.filter((item) => item.folderId === folderId)
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      filteredMedia = filteredMedia.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          (item.description && item.description.toLowerCase().includes(searchLower)) ||
          (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchLower))),
      )
    }

    // Filter by type
    if (type !== "all") {
      filteredMedia = filteredMedia.filter((item) => item.type === type)
    }

    // Helper function to convert file size to bytes for proper comparison
    const sizeToBytes = (sizeStr: string): number => {
      const units = {
        B: 1,
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
      }

      const match = sizeStr.match(/^([\d.]+)\s*([A-Z]+)$/)
      if (!match) return 0

      const size = Number.parseFloat(match[1])
      const unit = match[2] as keyof typeof units

      return size * (units[unit] || 0)
    }

    // Sort
    filteredMedia.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return -1 // In a real app, we'd compare dates
        case "oldest":
          return 1
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "size-asc":
          return sizeToBytes(a.size) - sizeToBytes(b.size)
        case "size-desc":
          return sizeToBytes(b.size) - sizeToBytes(a.size)
        default:
          return 0
      }
    })

    // Pagination
    const start = (page - 1) * limit
    const paginatedMedia = filteredMedia.slice(start, start + limit)

    return { media: paginatedMedia, total: filteredMedia.length }
  }

  // Get folder counts
  async getFolderCounts(): Promise<Record<string, number>> {
    await this.delay()

    const counts: Record<string, number> = {
      all: this.media.length,
    }

    this.folders.forEach((folder) => {
      counts[folder.id] = this.media.filter((item) => item.folderId === folder.id).length
    })

    return counts
  }

  // Get all folders
  async getFolders(): Promise<Folder[]> {
    await this.delay()
    return [...this.folders]
  }

  // Get a single media item
  async getMediaById(id: string): Promise<MediaItem | null> {
    await this.delay()
    return this.media.find((item) => item.id === id) || null
  }

  // Upload a file
  async uploadFile(file: File, options: MediaUploadOptions): Promise<MediaItem> {
    // Log the input parameters
    console.log("Upload File Input:", {
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
      },
      options,
    })

    // Calculate a more realistic upload time based on file size
    // Larger files take longer to upload
    const uploadTimeMs = Math.max(500, Math.min(3000, file.size / 50000))
    await this.delay(uploadTimeMs)

    const fileType = this.getFileType(file.name)
    const fileSize = this.formatFileSize(file.size)

    // Generate dimensions for images
    let dimensions: string | undefined = undefined
    if (fileType === "image") {
      // Simulate extracting dimensions from an image
      const width = Math.floor(Math.random() * 1000) + 800
      const height = Math.floor(Math.random() * 800) + 600
      dimensions = `${width} x ${height}`
    }

    // Generate duration for audio/video
    let duration: string | undefined = undefined
    if (fileType === "audio" || fileType === "video") {
      const minutes = Math.floor(Math.random() * 10)
      const seconds = Math.floor(Math.random() * 60)
      duration = `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    // Generate a unique ID
    const id = this.generateId()

    // Create URL for the file (in a real app, this would be a server URL)
    const url = URL.createObjectURL(file)

    // Create thumbnail URL for images
    const thumbnail = fileType === "image" ? url : undefined

    // Create the new media item with all MediaItem properties
    const newMedia: MediaItem = {
      id,
      name: file.name,
      type: fileType,
      size: fileSize,
      dimensions,
      duration,
      url,
      thumbnail,
      folder: options.folder,
      folderId: options.folderId,
      tags: options.tags || [],
      uploadedBy: "Current User",
      uploadedAt: "Just now",
      description: options.description,
      alt: options.alt,
    }

    // Log the complete MediaItem that will be returned
    console.log("Complete MediaItem created:", newMedia)

    // Simulate random failure for testing (15% chance)
    // Disable simulated failures in production
    // if (Math.random() < 0.15) {
    //   console.error(`Simulated upload failure for ${file.name}`)
    //   throw new Error(`Simulated upload failure for ${file.name}`)
    // }

    // Log success instead
    console.log(`Upload successful for ${file.name}`)

    this.media.unshift(newMedia)
    return newMedia
  }

  // Upload from URL
  async uploadFromUrl(url: string, options: MediaUploadOptions): Promise<MediaItem> {
    // Log the input parameters
    console.log("Upload URL Input:", {
      url,
      options,
    })

    await this.delay(1000) // Longer delay to simulate upload

    const fileName = url.split("/").pop() || "file-from-url"
    const fileType = this.getFileType(fileName)

    // Generate a unique ID
    const id = this.generateId()

    // Create the new media item with all MediaItem properties
    const newMedia: MediaItem = {
      id,
      name: fileName,
      type: fileType,
      size: "1.0 MB", // Placeholder size
      url: url,
      thumbnail: fileType === "image" ? url : undefined,
      folder: options.folder,
      folderId: options.folderId,
      tags: options.tags || [],
      uploadedBy: "Current User",
      uploadedAt: "Just now",
      description: options.description,
      alt: options.alt,
    }

    // Log the complete MediaItem that will be returned
    console.log("Complete MediaItem created:", newMedia)

    this.media.unshift(newMedia)
    return newMedia
  }

  // Update a media item
  async updateMedia(id: string, updates: MediaUpdateOptions): Promise<MediaItem> {
    await this.delay()

    const index = this.media.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error("Media not found")
    }

    this.media[index] = {
      ...this.media[index],
      ...updates,
    }

    return this.media[index]
  }

  // Delete a media item
  async deleteMedia(id: string): Promise<void> {
    await this.delay()

    const index = this.media.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error("Media not found")
    }

    this.media.splice(index, 1)
  }

  // Create a folder
  async createFolder(name: string, parentId = "root"): Promise<Folder> {
    await this.delay()

    const newFolder: Folder = {
      id: this.generateId(),
      name,
      parentId,
    }

    this.folders.push(newFolder)
    return newFolder
  }

  // Delete a folder
  async deleteFolder(id: string): Promise<void> {
    await this.delay()

    // Don't allow deleting the root folder
    if (id === "root") {
      throw new Error("Cannot delete root folder")
    }

    const index = this.folders.findIndex((folder) => folder.id === id)
    if (index === -1) {
      throw new Error("Folder not found")
    }

    // Move all media in this folder to the parent folder
    const folder = this.folders[index]
    const parentId = folder.parentId || "root"

    this.media = this.media.map((item) => {
      if (item.folderId === id) {
        const parentFolder = this.folders.find((f) => f.id === parentId)
        return {
          ...item,
          folderId: parentId,
          folder: parentFolder ? parentFolder.name : "Root",
        }
      }
      return item
    })

    // Delete the folder
    this.folders.splice(index, 1)
  }

  // Helper to determine file type from extension
  private getFileType(fileName: string): MediaType {
    const extension = fileName.split(".").pop()?.toLowerCase() || ""

    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) {
      return "image"
    } else if (["mp4", "webm", "mov", "avi"].includes(extension)) {
      return "video"
    } else if (["mp3", "wav", "ogg"].includes(extension)) {
      return "audio"
    } else if (["pdf", "doc", "docx", "txt", "xls", "xlsx", "ppt", "pptx"].includes(extension)) {
      return "document"
    } else {
      return "other"
    }
  }

  // Helper to format file size according to the requirements:
  // - Files > 1MB should be displayed with MB unit
  // - Files < 1MB should be displayed with KB unit
  private formatFileSize(bytes: number): string {
    const MB = 1024 * 1024

    if (bytes >= MB) {
      // Display as MB if >= 1MB
      return (bytes / MB).toFixed(1) + " MB"
    } else {
      // Display as KB if < 1MB
      return Math.round(bytes / 1024) + " KB"
    }
  }
}

// Export a singleton instance
export const mediaService = new MediaService()
