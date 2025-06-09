"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSearch } from "@/context/search-context"
import { Calculator, FileText, BookOpen, Pill, InfoIcon } from "lucide-react"

export function SearchResults() {
  const { searchQuery, searchResults, setSearchQuery, performSearch } = useSearch()
  const searchParams = useSearchParams()
  const initialSearchDone = useRef(false)

  useEffect(() => {
    // Only run this effect once when the component mounts
    if (!initialSearchDone.current) {
      const query = searchParams.get("q")
      if (query) {
        setSearchQuery(query)
        // Pass the query directly to performSearch to avoid dependency on searchQuery
        performSearch(query)
      }
      initialSearchDone.current = true
    }
  }, [searchParams, setSearchQuery, performSearch])

  if (!searchQuery) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Enter a search term to find content across the application.</p>
      </div>
    )
  }

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No results found for "{searchQuery}".</p>
        <p className="text-sm text-muted-foreground mt-2">Try using different keywords or check your spelling.</p>
      </div>
    )
  }

  // Group results by section
  const groupedResults = searchResults.reduce(
    (acc, result) => {
      if (!acc[result.section]) {
        acc[result.section] = []
      }
      acc[result.section].push(result)
      return acc
    },
    {} as Record<string, typeof searchResults>,
  )

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "calculator":
        return <Calculator className="h-4 w-4" />
      case "information":
        return <InfoIcon className="h-4 w-4" />
      case "resources":
        return <BookOpen className="h-4 w-4" />
      case "treatments":
        return <Pill className="h-4 w-4" />
      case "about":
        return <FileText className="h-4 w-4" />
      default:
        return null
    }
  }

  const getSectionTitle = (section: string) => {
    return section.charAt(0).toUpperCase() + section.slice(1)
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Found {searchResults.length} results for "{searchQuery}"
      </p>

      {Object.entries(groupedResults).map(([section, results]) => (
        <div key={section} className="space-y-4">
          <div className="flex items-center gap-2">
            {getSectionIcon(section)}
            <h2 className="text-lg font-semibold">{getSectionTitle(section)}</h2>
            <Badge variant="outline">{results.length}</Badge>
          </div>

          <div className="space-y-3">
            {results.map((result) => (
              <Link key={result.id} href={result.url} className="block">
                <Card className="transition-all hover:shadow-md hover:border-primary/50">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">{result.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{result.content}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
