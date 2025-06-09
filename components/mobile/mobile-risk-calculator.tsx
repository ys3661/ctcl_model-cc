"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { calculateRisk } from "@/lib/calculate-risk"
import { ChevronRight, ChevronLeft } from "lucide-react"
import MobileResultsDisplay from "./mobile-results-display"

interface Question {
  id: string
  text: string
}

const questions: Question[] = [
  { id: "q1", text: "Does the patient have a history of Multiple Biopsies?" },
  { id: "q2", text: "Does the patient have a history of Failed Steroids?" },
  { id: "q3", text: "Does the patient have a history of Other Rash?" },
  { id: "q4", text: "Does the patient have a history of Scaly Patch or Plaque?" },
  { id: "q5", text: "Does the patient have a history of Erythema?" },
  { id: "q6", text: "Does the patient have a history of Xerosis?" },
  { id: "q7", text: "Does the patient have a history of Pruritus?" },
]

export default function MobileRiskCalculator() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [results, setResults] = useState<{ score: number; risk: string } | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value === "yes",
    })
  }

  const handleSubmit = () => {
    // Calculate risk based on answers
    const result = calculateRisk(answers)
    setResults(result)
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setResults(null)
    setSubmitted(false)
    setCurrentQuestionIndex(0)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // All questions answered, submit
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const isAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false

  return (
    <div className="space-y-4">
      {!submitted ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-sm font-medium">
              {Object.keys(answers).length}/{questions.length} answered
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
            ></div>
          </div>

          <Card className="p-4">
            <div className="space-y-4">
              <Label htmlFor={currentQuestion.id} className="text-base font-medium">
                {currentQuestion.text}
              </Label>
              <RadioGroup
                id={currentQuestion.id}
                value={answers[currentQuestion.id] === undefined ? "" : answers[currentQuestion.id] ? "yes" : "no"}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="flex space-x-4"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-center h-16 border rounded-md hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="yes" id={`${currentQuestion.id}-yes`} className="mr-2" />
                    <Label htmlFor={`${currentQuestion.id}-yes`} className="cursor-pointer">
                      Yes
                    </Label>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-center h-16 border rounded-md hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="no" id={`${currentQuestion.id}-no`} className="mr-2" />
                    <Label htmlFor={`${currentQuestion.id}-no`} className="cursor-pointer">
                      No
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </Card>

          <div className="flex justify-between mt-4">
            <Button onClick={handlePrevious} variant="outline" disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext} disabled={!isAnswered}>
              {isLastQuestion ? "Calculate Risk" : "Next"}{" "}
              {!isLastQuestion && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <MobileResultsDisplay results={results} />
          <Button onClick={handleReset} variant="outline" className="w-full">
            Start Over
          </Button>
        </div>
      )}
    </div>
  )
}
