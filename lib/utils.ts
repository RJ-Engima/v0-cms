import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to format file size according to the requirements:
// - Files > 1MB should be displayed with MB unit
// - Files < 1MB should be displayed with KB unit
export function formatFileSize(bytes: number): string {
  const MB = 1024 * 1024

  if (bytes >= MB) {
    // Display as MB if >= 1MB
    return (bytes / MB).toFixed(1) + " MB"
  } else {
    // Display as KB if < 1MB
    return Math.round(bytes / 1024) + " KB"
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 6) {
    return date.toLocaleDateString()
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else {
    return "Just now"
  }
}
