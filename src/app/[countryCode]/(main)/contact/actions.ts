"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export type State = {
  success: boolean
  message: string
  errors?: {
    first_name?: string[]
    last_name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
  }
}

export async function submitContactForm(
  prevState: State,
  formData: FormData
): Promise<State> {
  const first_name = formData.get("first_name") as string
  const last_name = formData.get("last_name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string


  const errors: State["errors"] = {}
  if (!email || !email.includes("@"))
    errors.email = ["Please enter a valid email address."]
  if (!message) errors.message = ["Message cannot be empty."]
  if (!subject) errors.subject = ["Subject is required."]

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please check the highlighted fields.",
      errors,
    }
  }

  try {
    const data = await resend.emails.send({
      from: "Jules Atelier <contact@julesatelier.online>",
      to: ["julesatelier.224@gmail.com"],
      replyTo: email,
      subject: `[Jules Atelier Inquiry] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Times New Roman', serif;">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    
                    <tr>
                      <td align="center" style="background-color: #54463A; padding: 30px 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; font-family: sans-serif;">
                          Jules Atelier
                        </h1>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 40px;">
                        <p style="font-size: 14px; color: #888888; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 1px;">
                          New Inquiry From:
                        </p>
                        <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 22px;">
                          ${first_name} ${last_name}
                        </h2>
                        
                        <p style="margin: 0 0 5px 0; color: #54463A; font-weight: bold;">Subject:</p>
                        <p style="margin: 0 0 20px 0; color: #333333;">${subject}</p>

                        <p style="margin: 0 0 5px 0; color: #54463A; font-weight: bold;">Email:</p>
                        <p style="margin: 0 0 30px 0; color: #333333;">
                          <a href="mailto:${email}" style="color: #54463A; text-decoration: none;">${email}</a>
                        </p>

                        <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #54463A;">
                          <p style="margin: 0; color: #444444; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style="background-color: #f9f9f9; padding: 20px; border-top: 1px solid #eeeeee;">
                        <p style="margin: 0; font-size: 12px; color: #999999; font-family: sans-serif;">
                          Sent via Jules Atelier Contact Form
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (data.error) {
      console.error("Resend Error:", data.error)
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      }
    }

    return { success: true, message: "Message sent successfully." }
  } catch (error) {
    console.error("Server Error:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
