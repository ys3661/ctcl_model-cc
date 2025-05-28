"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function OfflineMode() {
  const [isOnline, setIsOnline] = useState(true)
  const [showBanner, setShowBanner] = useState(false)
  const [offlineData, setOfflineData] = useState<{
    patients: number
    pendingUploads: number
  }>({
    patients: 3,
    pendingUploads: 2,
  })

  useEffect(() => {
    // Check if we're online
    const handleOnline = () => {
      setIsOnline(true)
      setShowBanner(true)
      setTimeout(() => setShowBanner(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowBanner(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial check
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const syncData = () => {
    // In a real app, this would sync data with the server
    if (isOnline) {
      setOfflineData({
        ...offlineData,
        pendingUploads: 0,
      })
    }
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 px-4 pb-2">
      <Alert
        className={`${
          isOnline ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
        } shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300`}
      >
        {isOnline ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-amber-600" />}
        <AlertTitle>{isOnline ? "Back Online" : "Offline Mode"}</AlertTitle>
        <AlertDescription className="text-sm">
          {isOnline
            ? "You're back online. All changes will be synced."
            : "You're working offline. Changes will be saved locally."}
        </AlertDescription>
        {!isOnline && offlineData.pendingUploads > 0 && (
          <div className="mt-2">
            <p className="text-xs text-amber-700">
              {offlineData.pendingUploads} assessment{offlineData.pendingUploads !== 1 ? "s" : ""} pending upload
            </p>
          </div>
        )}
        {isOnline && offlineData.pendingUploads > 0 && (
          <Button size="sm" variant="outline" className="mt-2" onClick={syncData}>
            <RefreshCw className="mr-1 h-3 w-3" /> Sync Now
          </Button>
        )}
      </Alert>
    </div>
  )
}
