"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, Calculator, Info, Pill, BookOpen } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  url: string
  relevance: number
}

interface SearchResultsProps {
  query: string
  results: SearchResult[]
  isLoading?: boolean
}

export function SearchResults({ query, results, isLoading = false }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No results found for "{query}". Try different keywords or browse our sections.
        </p>
      </div>
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "calculator":
        return <Calculator className="h-4 w-4" />
      case "information":
        return <Info className="h-4 w-4" />
      case "treatments":
        return <Pill className="h-4 w-4" />
      case "resources":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "calculator":
        return "bg-blue-100 text-blue-800"
      case "information":
        return "bg-green-100 text-green-800"
      case "treatments":
        return "bg-purple-100 text-purple-800"
      case "resources":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
        </p>
      </div>

      {results.map((result) => (
        <Card key={result.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">
                  <Link href={result.url} className="hover:text-primary transition-colors">
                    {result.title}
                  </Link>
                </CardTitle>
                <CardDescription className="mt-1">{result.description}</CardDescription>
              </div>
              <Badge variant="secondary" className={`ml-2 ${getCategoryColor(result.category)}`}>
                <span className="flex items-center gap-1">
                  {getCategoryIcon(result.category)}
                  {result.category}
                </span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Link href={result.url} className="text-sm text-primary hover:underline">
              View details →
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
