// api/predict/route.ts - Next.js App Router API Route
import { NextRequest, NextResponse } from "next/server"
import { FEATURE_IDS, computeRiskScore, type RiskFeatures } from "@/lib/risk-model"

// Interface for prediction response
interface PredictionResponse {
  risk_score: number
  features_processed: number
  features_selected: number
  status: string
}

/**
 * Validate the incoming request
 */
function validateRequest(body: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check for missing features
  const missingFeatures = FEATURE_IDS.filter((feature) => !(feature in body))
  if (missingFeatures.length > 0) {
    errors.push(`Missing required features: ${missingFeatures.join(", ")}`)
  }

  // Check for invalid types
  FEATURE_IDS.forEach((feature) => {
    if (feature in body && typeof body[feature] !== "boolean") {
      errors.push(`Feature '${feature}' must be a boolean value`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * GET handler - Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    message: "CTCL Risk Prediction API is running",
    status: "healthy",
    model_type: "Weighted clinical risk score",
    version: "1.0.0",
    endpoints: {
      predict: "POST /api/predict",
      health: "GET /api/predict",
    },
  })
}

/**
 * POST handler - Make risk prediction
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: any
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        {
          error: "Invalid JSON in request body",
          details: "Request body must be valid JSON",
          type: "json_error",
        },
        { status: 400 },
      )
    }

    // Validate request
    const validation = validateRequest(body)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.errors,
          type: "validation_error",
        },
        { status: 400 },
      )
    }

    // Calculate risk score using the shared model
    const features = body as RiskFeatures
    const riskScore = computeRiskScore(features)

    // Count selected features
    const featuresSelected = FEATURE_IDS.filter((id) => features[id]).length

    // Log prediction for monitoring
    console.log(`Prediction: ${riskScore.toFixed(3)} (${featuresSelected}/${FEATURE_IDS.length} features selected)`)

    // Return successful prediction
    const response: PredictionResponse = {
      risk_score: riskScore,
      features_processed: FEATURE_IDS.length,
      features_selected: featuresSelected,
      status: "success",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Prediction error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error occurred",
        type: "server_error",
      },
      { status: 500 },
    )
  }
}

/**
 * OPTIONS handler - CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
