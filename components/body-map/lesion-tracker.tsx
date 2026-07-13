"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Camera, MapPin, ImageOff } from "lucide-react"
import { BODY_REGIONS } from "@/lib/mswat"
import {
  loadLesions,
  saveLesions,
  newId,
  downscaleImage,
  LESION_TYPE_LABELS,
  LESION_TYPE_COLORS,
  type Lesion,
  type LesionType,
  type BodyView,
} from "@/lib/lesion-tracker"

const VIEW_BOX = { w: 200, h: 440 }

function BodySilhouette() {
  return (
    <g fill="#e2e8f0" stroke="#94a3b8" strokeWidth={1.5} pointerEvents="none">
      <circle cx={100} cy={36} r={24} />
      <rect x={92} y={58} width={16} height={12} />
      <rect x={66} y={68} width={68} height={124} rx={22} />
      <rect x={40} y={72} width={20} height={116} rx={10} />
      <rect x={140} y={72} width={20} height={116} rx={10} />
      <rect x={70} y={184} width={60} height={22} rx={8} />
      <rect x={74} y={198} width={24} height={174} rx={12} />
      <rect x={102} y={198} width={24} height={174} rx={12} />
      <ellipse cx={86} cy={380} rx={14} ry={8} />
      <ellipse cx={114} cy={380} rx={14} ry={8} />
    </g>
  )
}

export function LesionTracker() {
  const [lesions, setLesions] = useState<Lesion[]>([])
  const [view, setView] = useState<BodyView>("front")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const hydrated = useRef(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLesions(loadLesions())
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (hydrated.current) saveLesions(lesions)
  }, [lesions])

  const selected = lesions.find((l) => l.id === selectedId) ?? null
  const visibleLesions = lesions.filter((l) => l.view === view)

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    const count = lesions.length + 1
    const lesion: Lesion = {
      id: newId(),
      label: `Lesion ${count}`,
      view,
      x,
      y,
      type: "patch",
      region: "",
      notes: "",
      createdAt: new Date().toISOString(),
      photos: [],
    }
    setLesions((prev) => [...prev, lesion])
    setSelectedId(lesion.id)
  }

  const updateSelected = (patch: Partial<Lesion>) => {
    if (!selected) return
    setLesions((prev) => prev.map((l) => (l.id === selected.id ? { ...l, ...patch } : l)))
  }

  const deleteLesion = (id: string) => {
    setLesions((prev) => prev.filter((l) => l.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = "" // allow re-selecting the same file
    if (!file || !selected) return
    setError(null)
    try {
      const dataUrl = await downscaleImage(file)
      const photo = { id: newId(), dataUrl, date: new Date().toISOString() }
      const next = lesions.map((l) =>
        l.id === selected.id ? { ...l, photos: [...l.photos, photo] } : l,
      )
      // Persist explicitly so we can detect a storage-quota failure on large writes.
      if (saveLesions(next)) {
        setLesions(next)
      } else {
        setError("Could not save photo — browser storage is full. Try removing older photos.")
      }
    } catch {
      setError("Could not process that image. Please try a different file.")
    }
  }

  const removePhoto = (photoId: string) => {
    if (!selected) return
    updateSelected({ photos: selected.photos.filter((p) => p.id !== photoId) })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <MapPin className="mr-2 h-5 w-5" /> Body map
            </CardTitle>
            <p className="text-sm text-muted-foreground">Click on the body to drop a lesion marker.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {(["front", "back"] as BodyView[]).map((v) => (
                <Button
                  key={v}
                  variant={view === v ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView(v)}
                  className="capitalize"
                >
                  {v}
                </Button>
              ))}
            </div>
            <div className="mx-auto max-w-[280px]">
              <svg
                viewBox={`0 0 ${VIEW_BOX.w} ${VIEW_BOX.h}`}
                className="w-full cursor-crosshair rounded-lg border bg-slate-50"
                onClick={handleMapClick}
                role="img"
                aria-label={`${view} body map`}
              >
                <BodySilhouette />
                {visibleLesions.map((l) => (
                  <g
                    key={l.id}
                    transform={`translate(${(l.x / 100) * VIEW_BOX.w} ${(l.y / 100) * VIEW_BOX.h})`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedId(l.id)
                    }}
                    className="cursor-pointer"
                  >
                    <circle
                      r={7}
                      fill={LESION_TYPE_COLORS[l.type]}
                      stroke={selectedId === l.id ? "#1e293b" : "#ffffff"}
                      strokeWidth={selectedId === l.id ? 3 : 2}
                    />
                  </g>
                ))}
              </svg>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              {(Object.keys(LESION_TYPE_LABELS) as LesionType[]).map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: LESION_TYPE_COLORS[t] }} />
                  {LESION_TYPE_LABELS[t]}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Lesions ({lesions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {lesions.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No lesions yet. Click on the body map to add one.
              </p>
            ) : (
              <ul className="space-y-2">
                {lesions.map((l) => (
                  <li
                    key={l.id}
                    className={`flex items-center justify-between rounded-lg border p-2 ${
                      selectedId === l.id ? "border-blue-400 bg-blue-50" : "border-border"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex flex-1 items-center gap-2 text-left text-sm"
                      onClick={() => {
                        setSelectedId(l.id)
                        setView(l.view)
                      }}
                    >
                      <span className="h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: LESION_TYPE_COLORS[l.type] }} />
                      <span className="font-medium">{l.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {LESION_TYPE_LABELS[l.type]} · {l.view}
                        {l.photos.length > 0 ? ` · ${l.photos.length} photo${l.photos.length > 1 ? "s" : ""}` : ""}
                      </span>
                    </button>
                    <Button variant="ghost" size="icon" onClick={() => deleteLesion(l.id)} aria-label="Delete lesion">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="lg:sticky lg:top-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{selected ? selected.label : "Lesion details"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selected ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Select a lesion to edit its details and track photos over time.
              </p>
            ) : (
              <>
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="lesion-label" className="text-sm">
                      Label
                    </Label>
                    <Input
                      id="lesion-label"
                      value={selected.label}
                      onChange={(e) => updateSelected({ label: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Type</Label>
                    <Select value={selected.type} onValueChange={(v) => updateSelected({ type: v as LesionType })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(LESION_TYPE_LABELS) as LesionType[]).map((t) => (
                          <SelectItem key={t} value={t}>
                            {LESION_TYPE_LABELS[t]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Body region</Label>
                  <Select value={selected.region} onValueChange={(v) => updateSelected({ region: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region..." />
                    </SelectTrigger>
                    <SelectContent>
                      {BODY_REGIONS.map((r) => (
                        <SelectItem key={r.key} value={r.key}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lesion-notes" className="text-sm">
                    Notes
                  </Label>
                  <Textarea
                    id="lesion-notes"
                    rows={2}
                    placeholder="Size, morphology, response to treatment..."
                    value={selected.notes}
                    onChange={(e) => updateSelected({ notes: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Photos ({selected.photos.length})</Label>
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Camera className="mr-2 h-4 w-4" /> Add photo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  {selected.photos.length === 0 ? (
                    <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed py-6 text-muted-foreground">
                      <ImageOff className="h-5 w-5" />
                      <span className="text-xs">No photos yet</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {selected.photos
                        .slice()
                        .sort((a, b) => a.date.localeCompare(b.date))
                        .map((photo) => (
                          <figure key={photo.id} className="overflow-hidden rounded-lg border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={photo.dataUrl}
                              alt={`${selected.label} on ${new Date(photo.date).toLocaleDateString()}`}
                              className="h-24 w-full object-cover"
                            />
                            <figcaption className="flex items-center justify-between px-2 py-1 text-[10px] text-muted-foreground">
                              <span>{new Date(photo.date).toLocaleDateString()}</span>
                              <button
                                type="button"
                                onClick={() => removePhoto(photo.id)}
                                className="text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            </figcaption>
                          </figure>
                        ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Photos are stored only in this browser on this device; they are never uploaded.
                  </p>
                </div>

                <Button variant="outline" className="w-full text-red-600" onClick={() => deleteLesion(selected.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete lesion
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
