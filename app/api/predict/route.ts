// api/predict/route.ts - Next.js App Router API Route
import { NextRequest, NextResponse } from 'next/server'

// Interface for prediction request
interface PredictionRequest {
  multiple_biopsies: boolean
  failed_steroids: boolean
  otherrash: boolean
  scaly_patch_plaque: boolean
  erythema: boolean
  xerosis: boolean
  pruritus: boolean
  other_failed_therapies: boolean
}

// Interface for prediction response
interface PredictionResponse {
  risk_score: number
  features_processed: number
  features_selected: number
  status: string
}

// Model weights based on provided relative weightings
const MODEL_WEIGHTS = {
  multiple_biopsies: 0.230368,
  failed_steroids: 0.210547,
  otherrash: 0.130172,
  scaly_patch_plaque: 0.112930,
  erythema: 0.083891,
  xerosis: 0.082167,
  pruritus: 0.079507,
  other_failed_therapies: 0.070418
} as const

/**
 * Calculate risk score based on selected features
 * Logic: sum (feature_weight * 10) for each present feature
 */
function calculateRiskScore(features: PredictionRequest): number {
  let riskScore = 0

  Object.entries(features).forEach(([feature, isPresent]) => {
    if (isPresent && feature in MODEL_WEIGHTS) {
      const weight = MODEL_WEIGHTS[feature as keyof typeof MODEL_WEIGHTS]
      riskScore += weight
    }
  })

  return riskScore
}

/**
 * Validate the incoming request
 */
function validateRequest(body: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  const requiredFeatures = [
    'multiple_biopsies', 'failed_steroids', 'otherrash',
    'scaly_patch_plaque', 'erythema', 'xerosis', 
    'pruritus', 'other_failed_therapies'
  ]

  // Check for missing features
  const missingFeatures = requiredFeatures.filter(feature => !(feature in body))
  if (missingFeatures.length > 0) {
    errors.push(`Missing required features: ${missingFeatures.join(', ')}`)
  }

  // Check for invalid types
  requiredFeatures.forEach(feature => {
    if (feature in body && typeof body[feature] !== 'boolean') {
      errors.push(`Feature '${feature}' must be a boolean value`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * GET handler - Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    message: "CTCL Risk Prediction API is running",
    status: "healthy",
    model_type: "TypeScript ML Implementation",
    version: "1.0.0",
    endpoints: {
      predict: "POST /api/predict",
      health: "GET /api/predict"
    }
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
          type: "json_error"
        },
        { status: 400 }
      )
    }

    // Validate request
    const validation = validateRequest(body)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.errors,
          type: "validation_error"
        },
        { status: 400 }
      )
    }

    // Calculate risk score
    const features = body as PredictionRequest
    const riskScore = calculateRiskScore(features)

    // Count selected features
    const featuresSelected = Object.values(features).filter(Boolean).length

    // Log prediction for monitoring
    console.log(`Prediction: ${riskScore.toFixed(3)} (${featuresSelected}/8 features selected)`)

    // Return successful prediction
    const response: PredictionResponse = {
      risk_score: riskScore,
      features_processed: 8,
      features_selected: featuresSelected,
      status: "success"
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Prediction error:', error)

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error occurred",
        type: "server_error"
      },
      { status: 500 }
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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Export utility for testing
export const utils = {
  calculateRiskScore,
  validateRequest,
  MODEL_WEIGHTS
}
