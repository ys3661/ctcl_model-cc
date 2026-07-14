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

      // Diacritic-insensitive search so e.g. "sezary" matches "Sézary".
      const fold = (s: string) =>
        s
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .toLowerCase()
          .trim()
      const queryFolded = fold(searchTerm)
      const results = searchData.filter((item) => {
        return fold(item.title).includes(queryFolded) || fold(item.content).includes(queryFolded)
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
