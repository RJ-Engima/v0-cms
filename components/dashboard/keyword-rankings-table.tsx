"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, Minus, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface KeywordRanking {
  keyword: string
  position: number
  change: number
  volume: number
}

interface KeywordRankingsTableProps {
  keywords: KeywordRanking[]
}

export function KeywordRankingsTable({ keywords }: KeywordRankingsTableProps) {
  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Keyword Rankings</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800">
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                  Keyword
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                  Position
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                  Change
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((keyword, index) => (
                <motion.tr
                  key={keyword.keyword}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-t hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-slate-400" />
                      <span className="font-medium">{keyword.keyword}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="font-mono">
                      #{keyword.position}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={cn(
                        "flex items-center gap-1",
                        keyword.change > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : keyword.change < 0
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-slate-500 dark:text-slate-400",
                      )}
                    >
                      {keyword.change > 0 ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : keyword.change < 0 ? (
                        <ArrowDown className="h-4 w-4" />
                      ) : (
                        <Minus className="h-4 w-4" />
                      )}
                      <span>{Math.abs(keyword.change)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{keyword.volume.toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
