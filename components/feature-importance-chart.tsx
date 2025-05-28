"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FeatureImportance {
  id: string
  name: string
  importance: number
  direction: "positive" | "negative" | "neutral"
}

interface FeatureImportanceChartProps {
  featureImportance: FeatureImportance[]
  maxBars?: number
}

export default function FeatureImportanceChart({ featureImportance, maxBars = 7 }: FeatureImportanceChartProps) {
  // Sort features by importance and take top N
  const topFeatures = [...featureImportance].sort((a, b) => b.importance - a.importance).slice(0, maxBars)

  // Find the maximum importance value for scaling
  const maxImportance = Math.max(...topFeatures.map((f) => f.importance))

  // Get color based on direction
  const getBarColor = (direction: string) => {
    switch (direction) {
      case "positive":
        return "bg-blue-500"
      case "negative":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get badge variant based on direction
  const getBadgeVariant = (direction: string) => {
    switch (direction) {
      case "positive":
        return "default"
      case "negative":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Feature Importance</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  This chart shows which factors contributed most to the risk assessment. Longer bars indicate stronger
                  influence on the final prediction.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {topFeatures.length > 0 ? (
          <div className="space-y-3">
            {topFeatures.map((feature) => (
              <div key={feature.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{feature.name}</span>
                    <Badge variant={getBadgeVariant(feature.direction)} className="ml-2 text-xs">
                      {feature.direction === "positive"
                        ? "Present"
                        : feature.direction === "negative"
                          ? "Absent"
                          : "Neutral"}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {((feature.importance * 100) / maxImportance).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`${getBarColor(feature.direction)} h-2 rounded-full`}
                    style={{ width: `${(feature.importance / maxImportance) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">No feature importance data available</div>
        )}

        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
          <p>
            These factors are ranked by their influence on the risk assessment. The presence of high-importance factors
            may warrant closer clinical attention.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
