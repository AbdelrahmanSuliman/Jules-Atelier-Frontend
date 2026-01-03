"use server"

import { z } from "zod"

const contactSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(prevState: any, formData: FormData) {
  const data = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  }

  // Validate the data
  const result = contactSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: "Please check your inputs.",
    }
  }

  // --- TODO: REPLACE THIS WITH YOUR EMAIL PROVIDER LOGIC ---
  // Example: await resend.emails.send({ ... })
  console.log("SERVER ACTION: Received Contact Form Data:", data)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    message: "Thank you! We have received your message.",
  }
}
