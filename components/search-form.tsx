"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchForm() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search for:", query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
