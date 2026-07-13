/**
 * Client-side lesion / photo tracking for longitudinal MF follow-up.
 * Data lives in the browser's localStorage only — nothing is uploaded to a
 * server, which keeps patient photos on-device. MF evolves slowly, so serial
 * photography of the same lesion over months is genuinely useful.
 */

export type LesionType = "patch" | "plaque" | "tumor" | "other"
export type BodyView = "front" | "back"

export interface LesionPhoto {
  id: string
  dataUrl: string
  date: string
  note?: string
}

export interface Lesion {
  id: string
  label: string
  view: BodyView
  /** Position on the body map as a percentage (0–100) of the SVG box. */
  x: number
  y: number
  type: LesionType
  region: string
  notes: string
  createdAt: string
  photos: LesionPhoto[]
}

const STORAGE_KEY = "ctcl-lesion-tracker"

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.floor(Math.random() * 1e9)}`
}

export function loadLesions(): Lesion[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Lesion[]) : []
  } catch {
    return []
  }
}

/** Returns true on success, false if persistence failed (e.g., quota exceeded). */
export function saveLesions(lesions: Lesion[]): boolean {
  if (typeof window === "undefined") return false
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lesions))
    return true
  } catch {
    return false
  }
}

export const LESION_TYPE_LABELS: Record<LesionType, string> = {
  patch: "Patch",
  plaque: "Plaque",
  tumor: "Tumor",
  other: "Other",
}

export const LESION_TYPE_COLORS: Record<LesionType, string> = {
  patch: "#f59e0b",
  plaque: "#ef4444",
  tumor: "#7c3aed",
  other: "#0ea5e9",
}

/**
 * Downscale an uploaded image to keep localStorage usage reasonable.
 * Resolves to a JPEG data URL no wider/taller than maxDimension.
 */
export function downscaleImage(file: File, maxDimension = 900, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Could not read file"))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error("Could not load image"))
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
        const width = Math.round(img.width * scale)
        const height = Math.round(img.height * scale)
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Canvas not supported"))
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL("image/jpeg", quality))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}
