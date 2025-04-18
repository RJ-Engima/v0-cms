"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MediaImageProps {
  src: string
  alt: string
  className?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

export function MediaImage({ src, alt, className = "", objectFit = "cover" }: MediaImageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setImageSrc(src)
    setLoading(true)
    setError(false)
  }, [src])

  const handleLoad = () => {
    setLoading(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
    // Set fallback image
    setImageSrc("/colorful-abstract-flow.png")
  }

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-muted/30 backdrop-blur-sm z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">Loading...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/10 z-0">
          <div className="text-xs text-muted-foreground text-center p-2">Unable to load image</div>
        </div>
      )}

      <motion.img
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        className={`w-full h-full object-${objectFit}`}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{
          opacity: loading ? 0 : 1,
          filter: loading ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}
