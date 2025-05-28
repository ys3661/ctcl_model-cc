"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { type SearchResult, searchData } from "@/lib/search-data"

interface SearchContextType {
  searchQuery: string
  searchResults: SearchResult[]
  isSearching: boolean
  setSearchQuery: (query: string) => void
  performSearch: (query?: string) => void
  clearSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const performSearch = useCallback(
    (query?: string) => {
      const searchTerm = query !== undefined ? query : searchQuery

      if (!searchTerm.trim()) {
        setSearchResults([])
        return
      }

      setIsSearching(true)

      // Simple search implementation
      const queryLower = searchTerm.toLowerCase().trim()
      const results = searchData.filter((item) => {
        return item.title.toLowerCase().includes(queryLower) || item.content.toLowerCase().includes(queryLower)
      })

      setSearchResults(results)
      setIsSearching(false)
    },
    [searchQuery],
  )

  const clearSearch = useCallback(() => {
    setSearchQuery("")
    setSearchResults([])
  }, [])

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        isSearching,
        setSearchQuery,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
