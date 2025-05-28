/**
 * CTCL Risk Calculation Library
 * Enhanced risk calculation with feature importance visualization
 */

// Type definitions for dataset entries and results
interface DatasetEntry {
  features: number[]
  risk: string
  score: number
}

interface FeatureImportance {
  id: string
  name: string
  importance: number
  direction: "positive" | "negative" | "neutral"
}

export interface RiskResult {
  score: number
  risk: string
  description?: string
  recommendation?: string
  confidence?: number
  featureImportance?: FeatureImportance[]
  details?: any
}

// Question text for feature importance labels
const questionTexts = [
  "Persistent patches/plaques",
  "Recurrent skin lesions",
  "Unexplained pruritus",
  "Poikiloderma",
  "Palpable lymph nodes",
  "Weight loss/night sweats",
  "Family history of lymphoma",
]

// Placeholder for local dataset (fallback)
const pretrainedDataset: DatasetEntry[] = [
  // Example entries - replace with your actual dataset
  { features: [1, 0, 1, 0, 0, 0, 0], risk: "Low", score: 2.1 },
  { features: [1, 1, 1, 0, 0, 0, 0], risk: "Moderate", score: 4.3 },
  { features: [1, 1, 1, 1, 0, 0, 0], risk: "Moderate", score: 5.7 },
  { features: [1, 1, 1, 1, 1, 0, 0], risk: "High", score: 7.2 },
  { features: [1, 1, 1, 1, 1, 1, 0], risk: "Very High", score: 8.6 },
  { features: [1, 1, 1, 1, 1, 1, 1], risk: "Very High", score: 9.8 },
]

// Feature importance weights (based on clinical significance)
// These weights represent the relative importance of each feature in determining CTCL risk
// In a real implementation, these would be derived from statistical analysis or machine learning
const featureWeights = [0.25, 0.2, 0.15, 0.15, 0.1, 0.1, 0.05]

/**
 * Calculate risk using Hugging Face Inference API with feature importance
 */
export async function calculateRiskWithHuggingFace(
  answers: Record<string, boolean>,
  modelId: string,
  apiToken: string,
): Promise<RiskResult> {
  // Convert answers object to feature array
  const features = [
    answers.q1 ? 1 : 0,
    answers.q2 ? 1 : 0,
    answers.q3 ? 1 : 0,
    answers.q4 ? 1 : 0,
    answers.q5 ? 1 : 0,
    answers.q6 ? 1 : 0,
    answers.q7 ? 1 : 0,
  ]

  try {
    // Format the input based on the model type
    const payload = {
      inputs: features,
      options: {
        wait_for_model: true,
        use_cache: true,
      },
    }

    // Call the Hugging Face Inference API
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const result = await response.json()

    // Process the result based on the model's output format
    if (Array.isArray(result)) {
      // Find the prediction with highest probability
      const prediction = result.reduce((prev, current) => (prev.score > current.score ? prev : current))

      // Map the label to our risk categories
      let risk: string
      const score = prediction.score * 10 // Scale to 0-10

      if (score < 2.5) risk = "Low"
      else if (score < 5) risk = "Moderate"
      else if (score < 7.5) risk = "High"
      else risk = "Very High"

      // Extract or calculate feature importance
      // This is a simplified approach - actual implementation depends on model capabilities
      const featureImportance = calculateFeatureImportanceFromHuggingFace(features, result)

      return {
        score,
        risk,
        confidence: prediction.score,
        featureImportance,
        details: result,
      }
    } else if (typeof result === "object" && result !== null) {
      // Handle other response formats
      const score = result.score || result.probability || 5
      let risk: string

      if (score < 0.25) risk = "Low"
      else if (score < 0.5) risk = "Moderate"
      else if (score < 0.75) risk = "High"
      else risk = "Very High"

      // Calculate feature importance
      const featureImportance = calculateFeatureImportanceFromHuggingFace(features, result)

      return {
        score: score * 10, // Scale to 0-10
        risk,
        featureImportance,
        details: result,
      }
    }

    // Fallback for unexpected response formats
    throw new Error("Unexpected response format from model")
  } catch (error) {
    console.error("Hugging Face API error:", error)

    // Fallback to local calculation if API fails
    return calculateRiskLocally(answers)
  }
}

/**
 * Extract feature importance from Hugging Face model response
 * This is a simplified implementation - actual extraction depends on model output format
 */
function calculateFeatureImportanceFromHuggingFace(features: number[], modelOutput: any): FeatureImportance[] {
  // Check if model output contains feature importance information
  if (modelOutput.feature_importance || modelOutput.attributions) {
    // Use model-provided feature importance if available
    const importanceValues = modelOutput.feature_importance || modelOutput.attributions

    return importanceValues.map((value: number, index: number) => ({
      id: `q${index + 1}`,
      name: questionTexts[index],
      importance: Math.abs(value),
      direction: value > 0 ? "positive" : value < 0 ? "negative" : "neutral",
    }))
  }

  // If model doesn't provide feature importance, calculate a simple approximation
  // This uses the feature values and predefined weights
  return features
    .map((value, index) => {
      const baseImportance = featureWeights[index]
      const actualImportance = value * baseImportance

      return {
        id: `q${index + 1}`,
        name: questionTexts[index],
        importance: baseImportance,
        direction: value === 1 ? "positive" : "neutral",
      }
    })
    .sort((a, b) => b.importance - a.importance)
}

/**
 * Local risk calculation with feature importance
 */
function calculateRiskLocally(answers: Record<string, boolean>): RiskResult {
  // Convert answers to features array
  const features = [
    answers.q1 ? 1 : 0,
    answers.q2 ? 1 : 0,
    answers.q3 ? 1 : 0,
    answers.q4 ? 1 : 0,
    answers.q5 ? 1 : 0,
    answers.q6 ? 1 : 0,
    answers.q7 ? 1 : 0,
  ]

  // Calculate weighted score based on feature weights
  let weightedScore = 0
  for (let i = 0; i < features.length; i++) {
    weightedScore += features[i] * featureWeights[i]
  }

  // Normalize score to 0-10 scale
  const normalizedScore = weightedScore * 10

  // Determine risk category
  let risk: string
  if (normalizedScore < 2.5) risk = "Low"
  else if (normalizedScore < 5) risk = "Moderate"
  else if (normalizedScore < 7.5) risk = "High"
  else risk = "Very High"

  // Calculate feature importance
  const featureImportance: FeatureImportance[] = features.map((value, index) => {
    const baseImportance = featureWeights[index]
    const actualImportance = value * baseImportance

    return {
      id: `q${index + 1}`,
      name: questionTexts[index],
      importance: actualImportance,
      direction: value === 1 ? "positive" : "neutral",
    }
  })

  // Sort by importance (highest first) and filter out zero importance
  const sortedImportance = featureImportance
    .filter((item) => item.importance > 0)
    .sort((a, b) => b.importance - a.importance)

  return {
    score: normalizedScore,
    risk,
    confidence: 0.7 + weightedScore * 0.3, // Simple confidence metric
    featureImportance: sortedImportance,
  }
}

/**
 * Simple risk calculation for MDCALC-style calculator
 * This function takes a score and returns the risk interpretation
 */
export function calculateRisk(score: number): RiskResult {
  if (score === 0) {
    return {
      score,
      risk: "Very Low",
      description: "No significant risk factors present",
      recommendation: "Routine follow-up as clinically indicated",
    }
  } else if (score <= 2) {
    return {
      score,
      risk: "Low",
      description: "Minimal risk factors present",
      recommendation: "Consider dermatology consultation if symptoms persist",
    }
  } else if (score <= 4) {
    return {
      score,
      risk: "Moderate",
      description: "Some concerning features present",
      recommendation: "Dermatology referral recommended for further evaluation",
    }
  } else if (score <= 7) {
    return {
      score,
      risk: "High",
      description: "Multiple risk factors present",
      recommendation: "Urgent dermatology referral and consider skin biopsy",
    }
  } else {
    return {
      score,
      risk: "Very High",
      description: "High suspicion for CTCL",
      recommendation: "Immediate dermatology/oncology referral and skin biopsy",
    }
  }
}

/**
 * Alternative calculation method using boolean answers (legacy support)
 */
export function calculateRiskFromAnswers(answers: Record<string, boolean>): RiskResult {
  // Convert answers to a simple score
  const score = Object.values(answers).filter(Boolean).length
  return calculateRisk(score)
}

/**
 * Get risk interpretation with color coding for UI
 */
export function getRiskInterpretation(score: number) {
  const result = calculateRisk(score)

  let color: string
  if (score === 0) {
    color = "bg-green-100 text-green-800 border-green-200"
  } else if (score <= 2) {
    color = "bg-green-100 text-green-800 border-green-200"
  } else if (score <= 4) {
    color = "bg-yellow-100 text-yellow-800 border-yellow-200"
  } else if (score <= 7) {
    color = "bg-orange-100 text-orange-800 border-orange-200"
  } else {
    color = "bg-red-100 text-red-800 border-red-200"
  }

  return {
    ...result,
    color,
  }
}

/**
 * Legacy function for backward compatibility
 */
export function calculateRiskLegacy(answers: Record<string, boolean>): RiskResult {
  return calculateRiskLocally(answers)
}
