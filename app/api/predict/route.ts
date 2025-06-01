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

// Simplified ML model weights (replace with your actual model logic)
// These weights are approximated based on typical CTCL risk factors
const MODEL_WEIGHTS = {
  multiple_biopsies: 0.18,
  failed_steroids: 0.22,
  otherrash: 0.12,
  scaly_patch_plaque: 0.16,
  erythema: 0.10,
  xerosis: 0.08,
  pruritus: 0.14,
  other_failed_therapies: 0.15
} as const

// Feature importance for risk calculation
const BASE_RISK = 0.05 // 5% baseline risk

/**
 * Calculate risk score based on selected features
 * This mimics your ML model's predict_proba functionality
 */
function calculateRiskScore(features: PredictionRequest): number {
  let riskScore = BASE_RISK
  
  // Add weighted contributions from each feature
  Object.entries(features).forEach(([feature, isPresent]) => {
    if (isPresent && feature in MODEL_WEIGHTS) {
      const weight = MODEL_WEIGHTS[feature as keyof typeof MODEL_WEIGHTS]
      riskScore += weight
    }
  })
  
  // Apply interaction effects (some combinations increase risk more)
  const interactions = calculateInteractionEffects(features)
  riskScore += interactions
  
  // Apply sigmoid-like transformation for realistic probabilities
  riskScore = applySigmoidTransform(riskScore)
  
  // Ensure score is between 0 and 1
  return Math.max(0, Math.min(1, riskScore))
}

/**
 * Calculate interaction effects between features
 * Some combinations of symptoms increase risk more than individual features
 */
function calculateInteractionEffects(features: PredictionRequest): number {
  let interactionBonus = 0
  
  // High-risk combinations
  if (features.multiple_biopsies && features.failed_steroids) {
    interactionBonus += 0.08 // Treatment-resistant cases
  }
  
  if (features.scaly_patch_plaque && features.pruritus) {
    interactionBonus += 0.06 // Classic presentation
  }
  
  if (features.failed_steroids && features.other_failed_therapies) {
    interactionBonus += 0.07 // Multiple treatment failures
  }
  
  if (features.erythema && features.xerosis && features.pruritus) {
    interactionBonus += 0.05 // Skin barrier dysfunction triad
  }
  
  // Count total positive features for complexity bonus
  const positiveFeatures = Object.values(features).filter(Boolean).length
  if (positiveFeatures >= 5) {
    interactionBonus += 0.04 // Multiple symptom complexity
  }
  
  return interactionBonus
}

/**
 * Apply sigmoid-like transformation to make risk scores more realistic
 * This mimics the non-linear decision boundaries of ML models
 */
function applySigmoidTransform(x: number): number {
  // Modified sigmoid to map linear combination to probability
  const k = 4 // Steepness parameter
  const x0 = 0.5 // Midpoint
  
  return 1 / (1 + Math.exp(-k * (x - x0)))
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

// Export additional utility functions for testing
export const utils = {
  calculateRiskScore,
  calculateInteractionEffects,
  applySigmoidTransform,
  validateRequest,
  MODEL_WEIGHTS
}
