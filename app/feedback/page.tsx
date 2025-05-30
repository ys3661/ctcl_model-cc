"use client"

import { useActionState } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitFeedback } from "./actions"

// Initial state for the form
const initialState = {
  success: false,
  message: "",
}

export default function FeedbackPage() {
  const [state, formAction, isPending] = useActionState(submitFeedback, initialState)

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
