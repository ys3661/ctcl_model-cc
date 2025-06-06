"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { submitFeedback } from "./actions"

// Initial state for the form
const initialState = {
  success: false,
  message: "",
}

export default function FeedbackPage() {
  const [state, formAction, isPending] = useActionState(submitFeedback, initialState)
  const [isResearchParticipant, setIsResearchParticipant] = useState(false)

  if (state?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Link href="/about" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to About
          </Link>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Feedback Submitted!</h2>
              <p className="text-gray-600 mb-6">{state.message}</p>
              <div className="space-y-3">
                <Link href="/about">
                  <Button variant="outline" className="w-full">
                    Back to About
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="w-full">Return to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Link href="/about" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to About
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Feedback & Suggestions</CardTitle>
            <CardDescription>
              Help us improve the CTCL Risk Assessment Application. Your input is valuable to us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name (Optional)</Label>
                  <Input id="name" name="name" placeholder="Your name" disabled={isPending} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedbackType">Feedback Type</Label>
                <Select name="feedbackType" disabled={isPending}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug-report">Bug Report</SelectItem>
                    <SelectItem value="feature-request">Feature Request</SelectItem>
                    <SelectItem value="ui-improvement">UI/UX Improvement</SelectItem>
                    <SelectItem value="clinical-accuracy">Clinical Accuracy</SelectItem>
                    <SelectItem value="general-feedback">General Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Research Study Participation */}
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="researchParticipant"
                    name="researchParticipant"
                    disabled={isPending}
                    checked={isResearchParticipant}
                    onCheckedChange={(checked) => setIsResearchParticipant(checked === true)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="researchParticipant"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I am participating in the qualitative research study
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Check this box if you are part of our research study to access additional questions
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Feedback *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Please share your thoughts, suggestions, or report any issues you've encountered..."
                  className="min-h-[120px]"
                  required
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="suggestions">Suggestions for Improvement (Optional)</Label>
                <Textarea
                  id="suggestions"
                  name="suggestions"
                  placeholder="Please share any specific suggestions for improving the application..."
                  className="min-h-[100px]"
                  disabled={isPending}
                />
              </div>

              {/* Research Study Questions - Conditionally Rendered */}
              {isResearchParticipant && (
                <div className="space-y-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800">Research Study Questions</h3>

                  <div className="space-y-2">
                    <Label htmlFor="workflowFit">
                      1. Workflow Fit: How did the CTCL tool fit into your typical clinical workflow?
                    </Label>
                    <Textarea
                      id="workflowFit"
                      name="workflowFit"
                      placeholder="Please describe how the tool integrated with your clinical workflow..."
                      className="min-h-[80px]"
                      disabled={isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinicalImpact">
                      2. Clinical Impact: Did the tool affect how often you considered CTCL as a diagnosis? If so, how?
                    </Label>
                    <Textarea
                      id="clinicalImpact"
                      name="clinicalImpact"
                      placeholder="Please describe any changes in your diagnostic considerations..."
                      className="min-h-[80px]"
                      disabled={isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="usefulFeatures">
                      3. Most Useful Features: Which feature(s) did you find most helpful?
                    </Label>
                    <Textarea
                      id="usefulFeatures"
                      name="usefulFeatures"
                      placeholder="Please describe the most helpful features..."
                      className="min-h-[80px]"
                      disabled={isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="leastUsefulFeatures">
                      4. Least Useful Features: Were there any features that were not useful or could be improved?
                    </Label>
                    <Textarea
                      id="leastUsefulFeatures"
                      name="leastUsefulFeatures"
                      placeholder="Please describe any features that could be improved..."
                      className="min-h-[80px]"
                      disabled={isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barriers">
                      5. Barriers: Did you encounter any challenges or barriers while using the tool?
                    </Label>
                    <Textarea
                      id="barriers"
                      name="barriers"
                      placeholder="Please describe any challenges you encountered..."
                      className="min-h-[80px]"
                      disabled={isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="improvementSuggestions">
                      6. Suggestions: What one improvement would most increase the tool's value for you?
                    </Label>
                    <Textarea
                      id="improvementSuggestions"
                      name="improvementSuggestions"
                      placeholder="Please describe the most important improvement..."
                      className="min-h-[80px]"
                      disabled={isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="overallImpression">
                      7. Overall Impression: What is your overall impression of the CTCL app?
                    </Label>
                    <Textarea
                      id="overallImpression"
                      name="overallImpression"
                      placeholder="Please share your overall thoughts about the application..."
                      className="min-h-[80px]"
                      disabled={isPending}
                    />
                  </div>
                </div>
              )}

              {state && !state.success && state.message && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{state.message}</div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" disabled={isPending} className="flex-1">
                  {isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" asChild disabled={isPending} className="flex-1 sm:flex-none">
                  <Link href="/about">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
