"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  value: string
  label?: string
  className?: string
  disabled?: boolean
}

export function CopyButton({ value, label = "Copy", className, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers / non-secure contexts
      const textarea = document.createElement("textarea")
      textarea.value = value
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand("copy")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        /* no-op */
      }
      document.body.removeChild(textarea)
    }
  }

  return (
    <Button type="button" variant="outline" onClick={handleCopy} disabled={disabled} className={cn(className)}>
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4 text-green-600" /> Copied
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" /> {label}
        </>
      )}
    </Button>
  )
}
