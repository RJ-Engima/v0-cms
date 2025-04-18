"use client"

import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface UploadStatisticsProps {
  total: number
  inProgress: number
  completed: number
  failed: number
}

export function UploadStatistics({ total, inProgress, completed, failed }: UploadStatisticsProps) {
  if (total === 0) return null

  return (
    <div className="p-4 rounded-lg border bg-muted/30">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Upload Status</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-background">
              Total: {total}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 rounded-md bg-blue-50 border border-blue-100">
            <div className="text-lg font-semibold text-blue-600">{inProgress}</div>
            <div className="text-xs text-blue-600">In Progress</div>
          </div>

          <div className="flex flex-col items-center p-2 rounded-md bg-green-50 border border-green-100">
            <div className="text-lg font-semibold text-green-600">{completed}</div>
            <div className="text-xs text-green-600">Completed</div>
          </div>

          <div className="flex flex-col items-center p-2 rounded-md bg-red-50 border border-red-100">
            <div className="text-lg font-semibold text-red-600">{failed}</div>
            <div className="text-xs text-red-600">Failed</div>
          </div>
        </div>

        {inProgress > 0 && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading {inProgress} file(s)...</span>
          </div>
        )}
      </div>
    </div>
  )
}
