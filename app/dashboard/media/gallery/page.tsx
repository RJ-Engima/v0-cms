"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Grid,
  List,
  Search,
  Upload,
  MoreHorizontal,
  Trash2,
  Download,
  Copy,
  Edit,
  X,
  FolderPlus,
  Folder,
  ImageIcon,
  FileText,
  Film,
  File,
  Music,
  Info,
  Link2,
  AlertCircle,
  Eye,
  Check,
  Calendar,
  Clock,
  Star,
  StarOff,
  Filter,
  ArrowUpDown,
  ChevronRight,
  ChevronDown,
  BarChart2,
  PieChart,
  Share2,
} from "lucide-react"
import { useMediaLibrary } from "@/hooks/use-media-library"
import type { MediaType } from "@/lib/api/media-service"
import { useToast } from "@/hooks/use-toast"
import { MediaImage } from "@/components/media-image"
import { FolderBreadcrumb } from "@/components/folder-breadcrumb"
import { UploadDialog } from "@/components/media/upload-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

export default function MediaLibraryPage() {
  const { toast } = useToast()
  const [
    {
      media,
      folders,
      loading,
      error,
      selectedMedia,
      selectedFolder,
      searchQuery,
      filterType,
      sortBy,
      totalItems,
      folderCounts,
    },
    {
      fetchMedia,
      fetchFolders,
      selectMedia,
      selectFolder,
      setSearchQuery,
      setFilterType,
      setSortBy,
      updateMedia,
      deleteMedia,
      createFolder,
      deleteFolder,
      refreshMediaLibrary,
    },
  ] = useMediaLibrary()

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState<"all" | "recent" | "favorites">("all")
  const [showStats, setShowStats] = useState(true)

  // Dialog states
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false)

  // Form states
  const [newFolderName, setNewFolderName] = useState("")
  const [newFolderParent, setNewFolderParent] = useState("root")

  // Edit states
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editAltText, setEditAltText] = useState("")
  const [editTags, setEditTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Add state for copied URL
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  // Add state for favorites
  const [favorites, setFavorites] = useState<string[]>([])

  // Handle media selection
  const handleSelectMedia = async (id: string) => {
    await selectMedia(id)

    // Initialize edit form with selected media data
    if (selectedMedia) {
      setEditName(selectedMedia.name)
      setEditDescription(selectedMedia.description || "")
      setEditAltText(selectedMedia.alt || "")
      setEditTags(selectedMedia.tags || [])
    }
  }

  // Handle media details view
  const handleViewDetails = async (id: string) => {
    await handleSelectMedia(id)
    setShowDetailsDialog(true)
  }

  // Handle media deletion
  const handleDeleteMedia = async () => {
    if (!selectedMedia) return

    try {
      await deleteMedia(selectedMedia.id)
      setShowDeleteDialog(false)
      toast({
        title: "Media deleted",
        description: "The media file has been deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: "There was an error deleting the media file",
        variant: "destructive",
      })
    }
  }

  // Handle media update
  const handleUpdateMedia = async () => {
    if (!selectedMedia) return

    try {
      await updateMedia(selectedMedia.id, {
        name: editName,
        description: editDescription,
        alt: editAltText,
        tags: editTags,
      })

      setShowDetailsDialog(false)
      toast({
        title: "Media updated",
        description: "The media file has been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating the media file",
        variant: "destructive",
      })
    }
  }

  // Handle folder creation
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return

    try {
      await createFolder(newFolderName, newFolderParent)
      setShowNewFolderDialog(false)
      setNewFolderName("")
      setNewFolderParent("root")
      toast({
        title: "Folder created",
        description: "The folder has been created successfully",
      })
    } catch (error) {
      toast({
        title: "Folder creation failed",
        description: "There was an error creating the folder",
        variant: "destructive",
      })
    }
  }

  // Update handleCopyUrl function to show animation
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)

    // Show a more subtle toast notification
    toast({
      title: "URL copied to clipboard",
      description: "You can now paste it anywhere",
      variant: "default",
    })

    // Reset after animation
    setTimeout(() => {
      setCopiedUrl(null)
    }, 2000)
  }

  // Handle edit tag addition
  const handleAddEditTag = () => {
    if (newTag.trim() && !editTags.includes(newTag.trim())) {
      setEditTags((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  // Handle edit tag removal
  const handleRemoveEditTag = (tag: string) => {
    setEditTags((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Get icon for media type
  const getMediaTypeIcon = (type: MediaType) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Film className="h-5 w-5" />
      case "audio":
        return <Music className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  // Get child folders for the current folder
  const getChildFolders = () => {
    return folders.filter((folder) => folder.parentId === (selectedFolder === "all" ? "root" : selectedFolder))
  }

  // Filter media based on active tab
  const getFilteredMedia = () => {
    if (activeTab === "recent") {
      // In a real app, you'd have a proper date comparison
      return media.slice(0, 8) // Just show first 8 items as "recent" for demo
    } else if (activeTab === "favorites") {
      // Filter by favorites
      return media.filter((item) => favorites.includes(item.id))
    }
    return media
  }

  // Get media type distribution for stats
  const getMediaTypeStats = () => {
    const stats = {
      image: 0,
      video: 0,
      audio: 0,
      document: 0,
      other: 0,
    }

    media.forEach((item) => {
      if (stats[item.type]) {
        stats[item.type]++
      } else {
        stats.other++
      }
    })

    return stats
  }

  const mediaTypeStats = getMediaTypeStats()

  return (
    <div className="space-y-6">
      {/* Header with stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 stat-card">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Total Media</h3>
            <div className="rounded-full bg-blue-500/10 p-1.5 text-blue-500">
              <ImageIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">{totalItems}</p>
            <div className="mt-1 flex items-center text-xs">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                <ArrowUpDown className="mr-1 h-3 w-3" />
                {media.length} in current view
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 stat-card">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Storage Used</h3>
            <div className="rounded-full bg-purple-500/10 p-1.5 text-purple-500">
              <BarChart2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">12.4 GB</p>
            <div className="mt-1">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">62% of 20 GB used</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 stat-card">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Media Types</h3>
            <div className="rounded-full bg-emerald-500/10 p-1.5 text-emerald-500">
              <PieChart className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                <ImageIcon className="h-4 w-4 text-blue-500" />
              </div>
              <p className="mt-1 text-xs font-medium">{mediaTypeStats.image}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10">
                <Film className="h-4 w-4 text-purple-500" />
              </div>
              <p className="mt-1 text-xs font-medium">{mediaTypeStats.video}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                <Music className="h-4 w-4 text-amber-500" />
              </div>
              <p className="mt-1 text-xs font-medium">{mediaTypeStats.audio}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                <FileText className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mt-1 text-xs font-medium">{mediaTypeStats.document}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-500/10">
                <File className="h-4 w-4 text-slate-500" />
              </div>
              <p className="mt-1 text-xs font-medium">{mediaTypeStats.other}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 stat-card">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Recent Activity</h3>
            <div className="rounded-full bg-amber-500/10 p-1.5 text-amber-500">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-xs">
              <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
              <p className="flex-1 text-muted-foreground">5 files uploaded</p>
              <p className="font-medium">2h ago</p>
            </div>
            <div className="flex items-center text-xs">
              <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
              <p className="flex-1 text-muted-foreground">Folder "Marketing" created</p>
              <p className="font-medium">5h ago</p>
            </div>
            <div className="flex items-center text-xs">
              <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
              <p className="flex-1 text-muted-foreground">3 files deleted</p>
              <p className="font-medium">1d ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your media files and assets</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowNewFolderDialog(true)} className="shadow-sm">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button
            onClick={() => setShowUploadDialog(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:from-blue-700 hover:to-indigo-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3 p-1 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger
              value="all"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              All Files
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Recent
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Favorites
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder="Search media..."
                className="pl-9 w-full md:w-[250px] bg-muted/50 border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="shadow-sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] backdrop-blur-lg bg-white/90 dark:bg-slate-900/90">
                <div className="p-2">
                  <p className="text-sm font-medium mb-2">Filter by type</p>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="bg-transparent">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="document">Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-2 pt-0">
                  <p className="text-sm font-medium mb-2">Sort by</p>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-transparent">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="size-asc">Size (Small-Large)</SelectItem>
                      <SelectItem value="size-desc">Size (Large-Small)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center rounded-md border shadow-sm overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowStats(!showStats)}
              className="text-muted-foreground"
            >
              {showStats ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          {/* Breadcrumb navigation */}
          <FolderBreadcrumb currentFolderId={selectedFolder} folders={folders} onFolderSelect={selectFolder} />

          {/* Main content area */}
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
              <div className="rounded-xl border bg-card shadow-sm overflow-hidden dark:border-slate-800 dark:bg-slate-900/50">
                <div className="p-2">
                  <div className="space-y-1">
                    <button
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedFolder === "all"
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => selectFolder("all")}
                    >
                      <div className="flex items-center">
                        <Folder
                          className={`mr-2 h-4 w-4 ${selectedFolder === "all" ? "text-white" : "text-muted-foreground"}`}
                        />
                        <span>All Files</span>
                      </div>
                      <Badge
                        variant={selectedFolder === "all" ? "outline" : "secondary"}
                        className={selectedFolder === "all" ? "border-white/50 text-white bg-white/10" : "bg-muted"}
                      >
                        {folderCounts.all || 0}
                      </Badge>
                    </button>

                    {folders
                      .filter((folder) => folder.parentId === "root") // Only show top-level folders
                      .map((folder) => (
                        <button
                          key={folder.id}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                            selectedFolder === folder.id
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => selectFolder(folder.id)}
                        >
                          <div className="flex items-center">
                            <Folder
                              className={`mr-2 h-4 w-4 ${selectedFolder === folder.id ? "text-white" : "text-muted-foreground"}`}
                            />
                            <span>{folder.name}</span>
                          </div>
                          <Badge
                            variant={selectedFolder === folder.id ? "outline" : "secondary"}
                            className={
                              selectedFolder === folder.id ? "border-white/50 text-white bg-white/10" : "bg-muted"
                            }
                          >
                            {folderCounts[folder.id] || 0}
                          </Badge>
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Storage info */}
              <div className="mt-4 rounded-xl border bg-card p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                <h3 className="text-sm font-medium">Storage</h3>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">12.4 GB / 20 GB</span>
                    <span className="font-medium">62%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-muted-foreground">Images</span>
                    </div>
                    <span className="font-medium">8.2 GB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
                      <span className="text-muted-foreground">Videos</span>
                    </div>
                    <span className="font-medium">3.1 GB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="text-muted-foreground">Other</span>
                    </div>
                    <span className="font-medium">1.1 GB</span>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-4 rounded-xl border bg-card p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                <h3 className="text-sm font-medium">Quick Actions</h3>
                <div className="mt-2 space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowUploadDialog(true)}>
                    <Upload className="mr-2 h-4 w-4 text-blue-500" />
                    Upload Files
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowNewFolderDialog(true)}
                  >
                    <FolderPlus className="mr-2 h-4 w-4 text-indigo-500" />
                    New Folder
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-4">
              {/* Child folders */}
              {getChildFolders().length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {getChildFolders().map((folder) => (
                    <motion.button
                      key={folder.id}
                      className="folder-card flex flex-col items-center p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
                      onClick={() => selectFolder(folder.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-3">
                        <Folder className="h-8 w-8 text-blue-500" />
                      </div>
                      <span className="text-sm font-medium text-center truncate w-full">{folder.name}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {folderCounts[folder.id] || 0} {folderCounts[folder.id] === 1 ? "item" : "items"}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Media display */}
              <div
                className={`rounded-xl border bg-card shadow-sm overflow-hidden min-h-[400px] relative dark:border-slate-800 dark:bg-slate-900/50`}
                onDragEnter={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowUploadDialog(true)
                }}
              >
                {loading && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                      <p className="mt-4 text-sm font-medium">Loading media...</p>
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {getFilteredMedia().length > 0 ? (
                    <>
                      {viewMode === "grid" ? (
                        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                          {getFilteredMedia().map((item) => (
                            <motion.div
                              key={item.id}
                              className={`media-card group relative rounded-xl border overflow-hidden transition-all hover:shadow-md ${
                                selectedMedia?.id === item.id ? "ring-2 ring-primary" : ""
                              } dark:border-slate-800 bg-card`}
                              onClick={() => handleSelectMedia(item.id)}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="aspect-square relative bg-muted">
                                {item.type === "image" ? (
                                  <MediaImage
                                    src={item.thumbnail || item.url}
                                    alt={item.alt || item.name}
                                    className="w-full h-full"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full">
                                    <div className="p-6 rounded-full bg-muted-foreground/10">
                                      {getMediaTypeIcon(item.type)}
                                    </div>
                                  </div>
                                )}

                                {/* Favorite button */}
                                <button
                                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(item.id)
                                  }}
                                >
                                  {favorites.includes(item.id) ? (
                                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                  ) : (
                                    <Star className="h-4 w-4" />
                                  )}
                                </button>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 bg-background/80 hover:bg-background"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleViewDetails(item.id)
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="p-3">
                                <div className="truncate text-sm font-medium">{item.name}</div>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  {getMediaTypeIcon(item.type)}
                                  <span className="ml-1">{item.size}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="divide-y dark:divide-slate-800">
                          {getFilteredMedia().map((item) => (
                            <motion.div
                              key={item.id}
                              className={`group flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                                selectedMedia?.id === item.id ? "bg-muted" : ""
                              }`}
                              onClick={() => handleSelectMedia(item.id)}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                {item.type === "image" ? (
                                  <MediaImage
                                    src={item.thumbnail || item.url}
                                    alt={item.alt || item.name}
                                    className="w-full h-full"
                                  />
                                ) : (
                                  <div className="p-2 rounded-full bg-muted-foreground/10">
                                    {getMediaTypeIcon(item.type)}
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="truncate font-medium">{item.name}</div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                  <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                                  <span>•</span>
                                  <span>{item.size}</span>
                                  {item.dimensions && (
                                    <>
                                      <span>•</span>
                                      <span>{item.dimensions}</span>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="text-sm text-muted-foreground hidden md:flex items-center gap-2">
                                <Calendar className="h-3 w-3 mr-1" />
                                {item.uploadedAt}
                              </div>

                              <div className="text-sm text-muted-foreground hidden lg:block">{item.folder}</div>

                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(item.id)
                                  }}
                                >
                                  {favorites.includes(item.id) ? (
                                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                  ) : (
                                    <Star className="h-4 w-4" />
                                  )}
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleViewDetails(item.id)
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCopyUrl(item.url)
                                  }}
                                >
                                  <Link2 className="h-4 w-4" />
                                </Button>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-[180px]">
                                    <DropdownMenuItem onClick={() => handleViewDetails(item.id)}>
                                      <Info className="mr-2 h-4 w-4" />
                                      Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => window.open(item.url, "_blank")}>
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleCopyUrl(item.url)}>
                                      <Copy className="mr-2 h-4 w-4" />
                                      Copy URL
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleViewDetails(item.id)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toggleFavorite(item.id)}>
                                      {favorites.includes(item.id) ? (
                                        <>
                                          <StarOff className="mr-2 h-4 w-4" />
                                          Remove Favorite
                                        </>
                                      ) : (
                                        <>
                                          <Star className="mr-2 h-4 w-4" />
                                          Add to Favorites
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600 dark:text-red-400"
                                      onClick={() => {
                                        handleSelectMedia(item.id)
                                        setShowDeleteDialog(true)
                                      }}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center p-8 h-[400px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="rounded-full bg-muted p-6">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold">No media found</h3>
                      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                        We couldn't find any media files matching your search criteria. Try adjusting your filters or
                        upload new media.
                      </p>
                      <Button
                        className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:from-blue-700 hover:to-indigo-700"
                        onClick={() => setShowUploadDialog(true)}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Media
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {getFilteredMedia().length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{getFilteredMedia().length}</span> of{" "}
                    <span className="font-medium">{totalItems}</span> media files
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recently Added</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              Last 7 days
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {getFilteredMedia().map((item) => (
              <motion.div
                key={item.id}
                className="media-card group relative rounded-xl border overflow-hidden transition-all hover:shadow-md dark:border-slate-800 bg-card"
                onClick={() => handleSelectMedia(item.id)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-square relative bg-muted">
                  {item.type === "image" ? (
                    <MediaImage
                      src={item.thumbnail || item.url}
                      alt={item.alt || item.name}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="p-6 rounded-full bg-muted-foreground/10">{getMediaTypeIcon(item.type)}</div>
                    </div>
                  )}

                  {/* Favorite button */}
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(item.id)
                    }}
                  >
                    {favorites.includes(item.id) ? (
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </button>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 bg-background/80 hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDetails(item.id)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-3">
                  <div className="truncate text-sm font-medium">{item.name}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.uploadedAt}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Favorites</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>Manage favorites</span>
            </Button>
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {getFilteredMedia().map((item) => (
                <motion.div
                  key={item.id}
                  className="media-card group relative rounded-xl border overflow-hidden transition-all hover:shadow-md dark:border-slate-800 bg-card"
                  onClick={() => handleSelectMedia(item.id)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-square relative bg-muted">
                    {item.type === "image" ? (
                      <MediaImage
                        src={item.thumbnail || item.url}
                        alt={item.alt || item.name}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="p-6 rounded-full bg-muted-foreground/10">{getMediaTypeIcon(item.type)}</div>
                      </div>
                    )}

                    {/* Favorite button */}
                    <button
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-100 z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(item.id)
                      }}
                    >
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    </button>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 bg-background/80 hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewDetails(item.id)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="truncate text-sm font-medium">{item.name}</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      {getMediaTypeIcon(item.type)}
                      <span className="ml-1">{item.size}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 h-[400px] rounded-xl border bg-card dark:border-slate-800 dark:bg-slate-900/50">
              <div className="rounded-full bg-muted p-6">
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">No favorites yet</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                Add files to your favorites by clicking the star icon on any media item.
              </p>
              <Button
                className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:from-blue-700 hover:to-indigo-700"
                onClick={() => setActiveTab("all")}
              >
                <Search className="mr-2 h-4 w-4" />
                Browse All Files
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Upload Dialog */}
      <UploadDialog open={showUploadDialog} onOpenChange={setShowUploadDialog} />

      {/* Media Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] w-[90vw] p-0 overflow-hidden bg-card dark:bg-slate-900/90 backdrop-blur-sm">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>Media Details</DialogTitle>
            <DialogDescription>View and edit details for this media file</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-180px)]">
            <div className="px-6 pb-6">
              {selectedMedia && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border overflow-hidden bg-muted aspect-square flex items-center justify-center dark:border-slate-800">
                      {selectedMedia.type === "image" ? (
                        <MediaImage
                          src={selectedMedia.url || "/placeholder.svg"}
                          alt={selectedMedia.alt || selectedMedia.name}
                          objectFit="contain"
                          className="w-full h-full"
                        />
                      ) : selectedMedia.type === "video" ? (
                        <div className="flex flex-col items-center justify-center p-4">
                          <Film className="h-16 w-16 text-muted-foreground" />
                          <span className="mt-4 text-sm text-muted-foreground">Video Preview</span>
                        </div>
                      ) : selectedMedia.type === "audio" ? (
                        <div className="flex flex-col items-center justify-center p-4">
                          <Music className="h-16 w-16 text-muted-foreground" />
                          <span className="mt-4 text-sm text-muted-foreground">Audio File</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4">
                          <FileText className="h-16 w-16 text-muted-foreground" />
                          <span className="mt-4 text-sm text-muted-foreground">Document</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">File URL</span>
                      </div>
                      <div className="relative">
                        <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2.5 pr-12 overflow-x-auto dark:border-slate-800">
                          <code className="text-xs font-mono whitespace-nowrap">
                            {selectedMedia.type === "image"
                              ? `https://m2p-website-file.s3.ap-south-1.amazonaws.com/marketing/${selectedMedia.folder.toLowerCase().replace(/[() ]/g, "-")}/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${selectedMedia.name}`
                              : selectedMedia.url}
                          </code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2"
                          onClick={() => {
                            const fullUrl =
                              selectedMedia.type === "image"
                                ? `https://m2p-website-file.s3.ap-south-1.amazonaws.com/marketing/${selectedMedia.folder.toLowerCase().replace(/[() ]/g, "-")}/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${selectedMedia.name}`
                                : selectedMedia.url
                            handleCopyUrl(fullUrl)
                          }}
                        >
                          {copiedUrl ? (
                            <div className="flex items-center gap-1 text-green-500">
                              <Check className="h-3.5 w-3.5" />
                              <span className="text-xs">Copied</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Copy className="h-3.5 w-3.5" />
                              <span className="text-xs">Copy</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">File Information</h4>
                      <div className="rounded-md border divide-y dark:border-slate-800 dark:divide-slate-800">
                        <div className="flex items-center justify-between p-2.5">
                          <span className="text-sm text-muted-foreground">Type</span>
                          <span className="text-sm font-medium">
                            {selectedMedia.type.charAt(0).toUpperCase() + selectedMedia.type.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-2.5">
                          <span className="text-sm text-muted-foreground">Size</span>
                          <span className="text-sm font-medium">{selectedMedia.size}</span>
                        </div>
                        {selectedMedia.dimensions && (
                          <div className="flex items-center justify-between p-2.5">
                            <span className="text-sm text-muted-foreground">Dimensions</span>
                            <span className="text-sm font-medium">{selectedMedia.dimensions}</span>
                          </div>
                        )}
                        {selectedMedia.duration && (
                          <div className="flex items-center justify-between p-2.5">
                            <span className="text-sm text-muted-foreground">Duration</span>
                            <span className="text-sm font-medium">{selectedMedia.duration}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between p-2.5">
                          <span className="text-sm text-muted-foreground">Uploaded</span>
                          <span className="text-sm font-medium">{selectedMedia.uploadedAt}</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5">
                          <span className="text-sm text-muted-foreground">Folder</span>
                          <span className="text-sm font-medium">{selectedMedia.folder}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="media-name">File Name</Label>
                      <Input
                        id="media-name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-muted/50 border-slate-200 dark:border-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="media-description">Description</Label>
                      <Textarea
                        id="media-description"
                        rows={3}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Add a description for this media file"
                        className="bg-muted/50 border-slate-200 dark:border-slate-800"
                      />
                    </div>

                    {selectedMedia.type === "image" && (
                      <div className="space-y-2">
                        <Label htmlFor="media-alt">Alt Text</Label>
                        <Input
                          id="media-alt"
                          value={editAltText}
                          onChange={(e) => setEditAltText(e.target.value)}
                          placeholder="Describe the image for accessibility"
                          className="bg-muted/50 border-slate-200 dark:border-slate-800"
                        />
                        <p className="text-xs text-muted-foreground">
                          Alt text helps make your content accessible to people using screen readers
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2 p-2 rounded-md border min-h-[80px] bg-muted/50 dark:border-slate-800">
                        {editTags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-muted">
                            {tag}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1 hover:bg-muted"
                              onClick={() => handleRemoveEditTag(tag)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                        <Input
                          className="flex-1 min-w-[120px] border-0 p-0 h-7 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                          placeholder="Add tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              handleAddEditTag()
                            }
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Press Enter to add a tag</p>
                    </div>

                    <div className="pt-4 space-y-2">
                      <h4 className="text-sm font-medium">Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5"
                          onClick={() => window.open(selectedMedia.url, "_blank")}
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Download</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5"
                          onClick={() => toggleFavorite(selectedMedia.id)}
                        >
                          {favorites.includes(selectedMedia.id) ? (
                            <>
                              <StarOff className="h-3.5 w-3.5" />
                              <span>Remove Favorite</span>
                            </>
                          ) : (
                            <>
                              <Star className="h-3.5 w-3.5" />
                              <span>Add to Favorites</span>
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Share2 className="h-3.5 w-3.5" />
                          <span>Share</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 dark:text-red-400"
                          onClick={() => {
                            setShowDetailsDialog(false)
                            setShowDeleteDialog(true)
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="px-6 py-4 border-t dark:border-slate-800">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateMedia}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm hover:from-blue-700 hover:to-indigo-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[500px] bg-card dark:bg-slate-900/90 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Delete Media</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this media file? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedMedia && (
            <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50 dark:border-slate-800">
              <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                {selectedMedia.type === "image" ? (
                  <MediaImage
                    src={selectedMedia.thumbnail || selectedMedia.url}
                    alt={selectedMedia.alt || selectedMedia.name}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="p-2 rounded-full bg-muted-foreground/10">{getMediaTypeIcon(selectedMedia.type)}</div>
                )}
              </div>

              <div>
                <div className="font-medium">{selectedMedia.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {selectedMedia.type.charAt(0).toUpperCase() + selectedMedia.type.slice(1)} • {selectedMedia.size}
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800 dark:text-red-400">Warning</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Deleting this file will remove it from all content that uses it. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMedia}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
        <DialogContent className="sm:max-w-[500px] bg-card dark:bg-slate-900/90 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>Create a new folder to organize your media files</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                placeholder="e.g. Blog Images"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="bg-muted/50 border-slate-200 dark:border-slate-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="folder-parent">Parent Folder (Optional)</Label>
              <Select value={newFolderParent} onValueChange={setNewFolderParent}>
                <SelectTrigger id="folder-parent" className="bg-muted/50 border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Select a parent folder" />
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
              <p className="text-xs text-muted-foreground">Leave as Root to create a folder at the top level</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewFolderDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              disabled={!newFolderName.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm hover:from-blue-700 hover:to-indigo-700"
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
