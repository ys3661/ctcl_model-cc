"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle, Clock, Eye, Send, Stethoscope } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { REFERRAL_FLAGS, WHAT_TO_SEND, routeReferral, type ReferralInput, type UrgencyTier } from "@/lib/referral"

const emptyInput: ReferralInput = {
  erythroderma: false,
  tumors: false,
  lymphadenopathy: false,
  rapidProgression: false,
  bloodInvolvement: false,
  largeCellTransformation: false,
  biopsyProvenCtcl: false,
  refractoryPersistent: false,
}

const TIER_STYLES: Record<UrgencyTier, { badge: string; icon: typeof AlertTriangle; alert: string }> = {
  urgent: { badge: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle, alert: "border-red-200 bg-red-50" },
  routine: { badge: "bg-amber-100 text-amber-800 border-amber-200", icon: Clock, alert: "border-amber-200 bg-amber-50" },
  observe: { badge: "bg-green-100 text-green-800 border-green-200", icon: Eye, alert: "border-green-200 bg-green-50" },
}

export function ReferralRouter() {
  const [input, setInput] = useState<ReferralInput>(emptyInput)
  const recommendation = routeReferral(input)
  const anySelected = Object.values(input).some(Boolean)
  const TierIcon = TIER_STYLES[recommendation.tier].icon

  const toggle = (id: keyof ReferralInput) => {
    setInput((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const sendList = WHAT_TO_SEND.map((s) => `• ${s}`).join("\n")

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Stethoscope className="mr-2 h-5 w-5" /> Clinical features
          </CardTitle>
          <p className="text-sm text-muted-foreground">Select all that apply to route the referral.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {REFERRAL_FLAGS.map((flag) => (
            <label
              key={flag.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/40"
            >
              <input
                type="checkbox"
                className="accent-green-600 mt-0.5 h-5 w-5 flex-shrink-0"
                checked={input[flag.id]}
                onChange={() => toggle(flag.id)}
              />
              <span>
                <span className="block text-sm font-medium">{flag.label}</span>
                <span className="block text-xs text-muted-foreground">{flag.description}</span>
              </span>
            </label>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!anySelected ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Select clinical features to see a routing recommendation.
              </p>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={`${TIER_STYLES[recommendation.tier].badge} px-3 py-1`}>
                    <TierIcon className="mr-1.5 h-3.5 w-3.5" />
                    {recommendation.timeframe}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{recommendation.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{recommendation.summary}</p>
                </div>
                <Alert className={TIER_STYLES[recommendation.tier].alert}>
                  <AlertTitle>Where to send</AlertTitle>
                  <AlertDescription>{recommendation.destination}</AlertDescription>
                </Alert>
                {recommendation.redFlags.length > 0 && (
                  <div className="text-sm">
                    <p className="font-medium">Red flags identified:</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {recommendation.redFlags.map((rf) => (
                        <Badge key={rf} variant="outline" className="border-red-200 bg-red-50 text-red-700">
                          {rf}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Send className="mr-2 h-5 w-5" /> What to send with the referral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2 text-sm">
              {WHAT_TO_SEND.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <CopyButton value={sendList} label="Copy checklist" />
              <Link href="/resources">
                <Button variant="outline">Find specialist centers</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
