"use client"

import type React from "react"
import { useState } from "react"
import { Search, Filter, X, Calendar, FileType, Tag, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface SearchFilters {
  type?: string
  dateFrom?: Date
  dateTo?: Date
  tags?: string[]
  favorites?: boolean
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void
}

export function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({})
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearch = () => {
    onSearch(query, filters)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const addFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    if (!activeFilters.includes(key)) {
      setActiveFilters((prev) => [...prev, key])
    }
  }

  const removeFilter = (key: string) => {
    const { [key]: _, ...rest } = filters
    setFilters(rest)
    setActiveFilters((prev) => prev.filter((f) => f !== key))
  }

  const getFilterLabel = (key: string) => {
    switch (key) {
      case "type":
        return `Type: ${filters.type}`
      case "dateFrom":
        return `From: ${filters.dateFrom?.toLocaleDateString()}`
      case "dateTo":
        return `To: ${filters.dateTo?.toLocaleDateString()}`
      case "favorites":
        return "Favorites only"
      case "tags":
        return `Tags: ${(filters.tags || []).join(", ")}`
      default:
        return key
    }
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search media files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9 bg-background/50 border-border/40 focus-visible:ring-primary/30"
          />
        </div>
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2 border-border/40">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">File Type</div>
                <Select onValueChange={(value) => addFilter("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Date Range</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="dateFrom" className="text-xs">
                      From
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal text-sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          {filters.dateFrom ? filters.dateFrom.toLocaleDateString() : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={filters.dateFrom}
                          onSelect={(date) => addFilter("dateFrom", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="dateTo" className="text-xs">
                      To
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal text-sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          {filters.dateTo ? filters.dateTo.toLocaleDateString() : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={filters.dateTo}
                          onSelect={(date) => addFilter("dateTo", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {["landscape", "portrait", "product", "banner", "social"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => {
                        const currentTags = filters.tags || []
                        if (currentTags.includes(tag)) {
                          addFilter(
                            "tags",
                            currentTags.filter((t) => t !== tag),
                          )
                        } else {
                          addFilter("tags", [...currentTags, tag])
                        }
                      }}
                    >
                      {tag}
                      {(filters.tags || []).includes(tag) && <span className="ml-1 text-primary">✓</span>}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="favorites"
                  checked={filters.favorites}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      addFilter("favorites", true)
                    } else {
                      removeFilter("favorites")
                    }
                  }}
                />
                <Label htmlFor="favorites" className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-yellow-500" />
                  <span>Show favorites only</span>
                </Label>
              </div>

              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilters({})
                    setActiveFilters([])
                  }}
                >
                  Clear All
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    handleSearch()
                    setIsFilterOpen(false)
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary"
            >
              {filter === "type" && <FileType className="h-3 w-3" />}
              {filter === "dateFrom" || (filter === "dateTo" && <Calendar className="h-3 w-3" />)}
              {filter === "tags" && <Tag className="h-3 w-3" />}
              {filter === "favorites" && <Star className="h-3 w-3" />}
              <span>{getFilterLabel(filter)}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1 text-primary hover:text-primary hover:bg-transparent"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          ))}

          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground"
              onClick={() => {
                setFilters({})
                setActiveFilters([])
              }}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
