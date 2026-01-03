"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email")

  if (!email || typeof email !== "string") {
    return { error: "Email is required" }
  }

  try {
    await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    })

    return { success: true }
  } catch (e: any) {
    if (e.message?.includes("already exists")) {
      return { error: "You are already part of the family." }
    }

    console.error("Resend Error:", e)
    return { error: "Something went wrong. Please try again." }
  }
}
