"use server"

import { Resend } from "resend"

export async function submitFeedback(prevState: any, formData: FormData) {
  try {
    // Extract form data first
    const name = (formData.get("name") as string) || "Anonymous"
    const email = (formData.get("email") as string) || "Not provided"
    const feedbackType = (formData.get("feedbackType") as string) || "General feedback"
    const message = formData.get("message") as string
    const suggestions = (formData.get("suggestions") as string) || "No specific suggestions provided"

    // Validate required fields
    if (!message || message.trim() === "") {
      return {
        success: false,
        message: "Please provide your feedback message.",
      }
    }

    // Use environment variable or fallback to provided key for testing
    const apiKey = process.env.RESEND_API_KEY || "re_Ydf47o6D_LkJXJrF4xzBy3zwuuZs1svj3"

    if (!apiKey) {
      // Fallback logging if no key available
      console.log("=== FEEDBACK SUBMISSION (No API Key) ===")
      console.log("Date:", new Date().toLocaleString())
      console.log("Name:", name)
      console.log("Email:", email)
      console.log("Feedback Type:", feedbackType)
      console.log("Message:", message)
      console.log("Suggestions:", suggestions)
      console.log("=== END FEEDBACK ===")

      return {
        success: true,
        message: "Thank you for your feedback! (Development mode - logged to console)",
      }
    }

    // Initialize Resend with API key
    const resend = new Resend(apiKey)

    // Create email content
    const emailContent = `
      <h2>New Feedback Submission - CTCL Risk Calculator</h2>
      
      <h3>Submission Details:</h3>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Feedback Type:</strong> ${feedbackType}</p>
      
      <h3>Feedback Message:</h3>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, "<br>")}
      </div>
      
      <h3>Suggestions for Improvement:</h3>
      <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${suggestions.replace(/\n/g, "<br>")}
      </div>
      
      <hr>
      <p style="color: #666; font-size: 12px;">
        This email was automatically generated from the CTCL Risk Calculator feedback form.
      </p>
    `

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: "CTCL Risk Calculator <noreply@resend.dev>",
      to: "ctclriskcalculator@gmail.com",
      subject: `New Feedback: ${feedbackType} - CTCL Risk Calculator`,
      html: emailContent,
      replyTo: email !== "Not provided" ? email : undefined,
    })

    if (emailResult.error) {
      console.error("Email sending failed:", emailResult.error)
      return {
        success: false,
        message: "There was an error sending your feedback. Please try again or contact us directly.",
      }
    }

    console.log("Feedback email sent successfully:", emailResult.data?.id)

    return {
      success: true,
      message:
        "Thank you for your feedback! Your message has been sent successfully to ctclriskcalculator@gmail.com and we'll review it carefully.",
    }
  } catch (error) {
    console.error("Error submitting feedback:", error)
    return {
      success: false,
      message: "An error occurred while submitting your feedback. Please try again later.",
    }
  }
}
