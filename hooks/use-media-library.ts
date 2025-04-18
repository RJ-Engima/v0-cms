"use client"

import { useState, useEffect, useCallback } from "react"
import {
  mediaService,
  type MediaItem,
  type Folder,
  type MediaUploadOptions,
  type MediaUpdateOptions,
} from "@/lib/api/media-service"

type MediaLibraryState = {
  media: MediaItem[]
  folders: Folder[]
  loading: boolean
  error: string | null
  selectedMedia: MediaItem | null
  selectedFolder: string
  searchQuery: string
  filterType: string
  sortBy: string
  totalItems: number
  folderCounts: Record<string, number>
}

type MediaLibraryActions = {
  fetchMedia: () => Promise<void>
  fetchFolders: () => Promise<void>
  selectMedia: (id: string) => Promise<void>
  selectFolder: (id: string) => Promise<void>
  setSearchQuery: (query: string) => void
  setFilterType: (type: string) => void
  setSortBy: (sort: string) => void
  uploadFile: (file: File, options: MediaUploadOptions) => Promise<MediaItem>
  uploadFromUrl: (url: string, options: MediaUploadOptions) => Promise<MediaItem>
  updateMedia: (id: string, updates: MediaUpdateOptions) => Promise<MediaItem>
  deleteMedia: (id: string) => Promise<void>
  createFolder: (name: string, parentId?: string) => Promise<Folder>
  deleteFolder: (id: string) => Promise<void>
  refreshMediaLibrary: () => Promise<void>
}

export function useMediaLibrary(): [MediaLibraryState, MediaLibraryActions] {
  const [state, setState] = useState<MediaLibraryState>({
    media: [],
    folders: [],
    loading: true,
    error: null,
    selectedMedia: null,
    selectedFolder: "all",
    searchQuery: "",
    filterType: "all",
    sortBy: "newest",
    totalItems: 0,
    folderCounts: {},
  })

  // Fetch media based on current filters
  const fetchMedia = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      const { media, total } = await mediaService.getMedia({
        folderId: state.selectedFolder,
        search: state.searchQuery,
        type: state.filterType,
        sortBy: state.sortBy,
      })

      setState((prev) => ({
        ...prev,
        media,
        totalItems: total,
        loading: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to load media",
        loading: false,
      }))
    }
  }, [state.selectedFolder, state.searchQuery, state.filterType, state.sortBy])

  // Fetch folders
  const fetchFolders = useCallback(async () => {
    try {
      const folders = await mediaService.getFolders()
      const folderCounts = await mediaService.getFolderCounts()

      setState((prev) => ({
        ...prev,
        folders,
        folderCounts,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to load folders",
      }))
    }
  }, [])

  // Select a media item
  const selectMedia = useCallback(async (id: string) => {
    try {
      const mediaItem = await mediaService.getMediaById(id)
      setState((prev) => ({ ...prev, selectedMedia: mediaItem }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to load media details",
      }))
    }
  }, [])

  // Select a folder
  const selectFolder = useCallback((id: string) => {
    setState((prev) => ({ ...prev, selectedFolder: id }))
  }, [])

  // Set search query
  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query }))
  }, [])

  // Set filter type
  const setFilterType = useCallback((type: string) => {
    setState((prev) => ({ ...prev, filterType: type }))
  }, [])

  // Set sort by
  const setSortBy = useCallback((sort: string) => {
    setState((prev) => ({ ...prev, sortBy: sort }))
  }, [])

  // Upload a file
  const uploadFile = useCallback(async (file: File, options: MediaUploadOptions) => {
    try {
      const newMedia = await mediaService.uploadFile(file, options)
      await refreshMediaLibrary()
      return newMedia
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to upload file",
      }))
      throw error
    }
  }, [])

  // Upload from URL
  const uploadFromUrl = useCallback(async (url: string, options: MediaUploadOptions) => {
    try {
      const newMedia = await mediaService.uploadFromUrl(url, options)
      await refreshMediaLibrary()
      return newMedia
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to upload from URL",
      }))
      throw error
    }
  }, [])

  // Update media
  const updateMedia = useCallback(async (id: string, updates: MediaUpdateOptions) => {
    try {
      const updatedMedia = await mediaService.updateMedia(id, updates)
      await refreshMediaLibrary()
      return updatedMedia
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to update media",
      }))
      throw error
    }
  }, [])

  // Delete media
  const deleteMedia = useCallback(async (id: string) => {
    try {
      await mediaService.deleteMedia(id)
      setState((prev) => ({
        ...prev,
        selectedMedia: null,
      }))
      await refreshMediaLibrary()
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to delete media",
      }))
      throw error
    }
  }, [])

  // Create folder
  const createFolder = useCallback(
    async (name: string, parentId?: string) => {
      try {
        const newFolder = await mediaService.createFolder(name, parentId)
        await fetchFolders()
        return newFolder
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Failed to create folder",
        }))
        throw error
      }
    },
    [fetchFolders],
  )

  // Delete folder
  const deleteFolder = useCallback(
    async (id: string) => {
      try {
        await mediaService.deleteFolder(id)
        await fetchFolders()
        setState((prev) => ({
          ...prev,
          selectedFolder: "all",
        }))
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Failed to delete folder",
        }))
        throw error
      }
    },
    [fetchFolders],
  )

  // Refresh media library
  const refreshMediaLibrary = useCallback(async () => {
    await fetchMedia()
    await fetchFolders()
  }, [fetchMedia, fetchFolders])

  // Initial load
  useEffect(() => {
    refreshMediaLibrary()
  }, [refreshMediaLibrary])

  // Refetch when filters change
  useEffect(() => {
    fetchMedia()
  }, [state.selectedFolder, state.searchQuery, state.filterType, state.sortBy, fetchMedia])

  return [
    state,
    {
      fetchMedia,
      fetchFolders,
      selectMedia,
      selectFolder,
      setSearchQuery,
      setFilterType,
      setSortBy,
      uploadFile,
      uploadFromUrl,
      updateMedia,
      deleteMedia,
      createFolder,
      deleteFolder,
      refreshMediaLibrary,
    },
  ]
}
