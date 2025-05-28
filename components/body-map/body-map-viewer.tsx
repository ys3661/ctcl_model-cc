"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { LesionMapping, Lesion } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

// Mock data - in a real app, this would come from an API or database
const mockLesionMappings: Record<string, LesionMapping[]> = {
  p1: [
    {
      id: "lm1",
      patientId: "p1",
      assessmentId: "a2",
      date: "2023-06-22",
      lesions: [
        {
          id: "l1",
          location: { x: 30, y: 40, side: "front" },
          type: "plaque",
          size: 3.5,
          description: "Erythematous plaque with slight scaling",
        },
        {
          id: "l2",
          location: { x: 70, y: 35, side: "front" },
          type: "plaque",
          size: 2.8,
          description: "Similar to left side, slightly smaller",
        },
        {
          id: "l3",
          location: { x: 50, y: 60, side: "front" },
          type: "patch",
          size: 5.0,
          description: "Hypopigmented patch with minimal scaling",
        },
        {
          id: "l4",
          location: { x: 40, y: 30, side: "back" },
          type: "tumor",
          size: 2.0,
          description: "Raised, firm nodule",
        },
      ],
    },
  ],
}

interface BodyMapViewerProps {
  patientId: string
}

export function BodyMapViewer({ patientId }: BodyMapViewerProps) {
  const [lesionMappings, setLesionMappings] = useState<LesionMapping[]>([])
  const [selectedMapping, setSelectedMapping] = useState<LesionMapping | null>(null)
  const [selectedLesion, setSelectedLesion] = useState<Lesion | null>(null)
  const [view, setView] = useState<"front" | "back">("front")

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedMappings = mockLesionMappings[patientId] || []
    setLesionMappings(fetchedMappings)

    if (fetchedMappings.length > 0) {
      setSelectedMapping(fetchedMappings[0])
    }
  }, [patientId])

  const handleLesionClick = (lesion: Lesion) => {
    setSelectedLesion(lesion)
  }

  const getLesionColor = (type: string) => {
    switch (type) {
      case "patch":
        return "bg-blue-500"
      case "plaque":
        return "bg-yellow-500"
      case "tumor":
        return "bg-red-500"
      case "erythroderma":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLesionSize = (size: number) => {
    // Convert size in cm to pixel size for display
    const baseSize = 16
    return Math.max(baseSize, size * 5)
  }

  return (
    <div className="space-y-4">
      {lesionMappings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No body mapping data available</p>
          <Button>Create New Body Map</Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              {lesionMappings.map((mapping) => (
                <Button
                  key={mapping.id}
                  variant={selectedMapping?.id === mapping.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMapping(mapping)}
                >
                  {mapping.date}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              Add New Mapping
            </Button>
          </div>

          {selectedMapping && (
            <>
              <div className="flex justify-center mb-4">
                <Tabs value={view} onValueChange={(v) => setView(v as "front" | "back")}>
                  <TabsList>
                    <TabsTrigger value="front">Front View</TabsTrigger>
                    <TabsTrigger value="back">Back View</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="relative w-full aspect-[3/4] border rounded-lg overflow-hidden bg-slate-50">
                <div className="absolute inset-0">
                  <Image
                    src={`/images/body-map-${view}.png`}
                    alt={`Human body ${view} view`}
                    fill
                    className="object-contain"
                  />
                </div>

                {selectedMapping.lesions
                  .filter((lesion) => lesion.location.side === view)
                  .map((lesion) => (
                    <div
                      key={lesion.id}
                      className={`absolute rounded-full cursor-pointer border-2 border-white ${getLesionColor(lesion.type)}`}
                      style={{
                        left: `${lesion.location.x}%`,
                        top: `${lesion.location.y}%`,
                        width: `${getLesionSize(lesion.size)}px`,
                        height: `${getLesionSize(lesion.size)}px`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={() => handleLesionClick(lesion)}
                    />
                  ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Patch
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    Plaque
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    Tumor
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    Erythroderma
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Print Body Map
                </Button>
              </div>
            </>
          )}
        </>
      )}

      <Dialog open={!!selectedLesion} onOpenChange={(open) => !open && setSelectedLesion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lesion Details</DialogTitle>
          </DialogHeader>
          {selectedLesion && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{selectedLesion.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Size</p>
                  <p className="font-medium">{selectedLesion.size} cm</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="font-medium capitalize">
                    {selectedLesion.location.side} side, {selectedLesion.location.x}% from left,{" "}
                    {selectedLesion.location.y}% from top
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p>{selectedLesion.description || "No description provided"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
