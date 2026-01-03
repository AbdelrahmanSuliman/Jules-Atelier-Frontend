"use client"

import { useState } from "react"
import { submitContactForm, State } from "./actions" // Ensure path is correct
import { CheckCircleSolid, Spinner } from "@medusajs/icons" // Assuming you have Medusa icons

export default function ContactPage() {
  const [state, setState] = useState<State>({ success: false, message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const result = await submitContactForm(state, formData)

    setState(result)
    setIsSubmitting(false)
  }

  if (state.success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#54463A] text-white p-6 animate-in fade-in zoom-in duration-500">
        <h1 className="text-3xl font-serif mb-2">Message Sent</h1>
        <p className="text-white/70 mb-8 text-center max-w-md">
          Thank you for reaching out. We have received your inquiry and will
          respond to {state.message.includes("@") ? "your email" : "you"}{" "}
          shortly.
        </p>
        <button
          onClick={() => setState({ success: false, message: "" })}
          className="px-8 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-[#54463A] transition-all duration-300 uppercase tracking-widest text-xs"
        >
          Send Another
        </button>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#54463A] py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">


        {state.message && !state.success && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-100 rounded text-center text-sm">
            {state.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white/70 ml-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                required
                placeholder="John"
                className="w-full bg-white text-black border-none px-4 py-3 rounded-sm outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white/70 ml-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                required
                placeholder="Doe"
                className="w-full bg-white text-black border-none px-4 py-3 rounded-sm outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white/70 ml-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@example.com"
              className="w-full bg-white text-black border-none px-4 py-3 rounded-sm outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-400"
            />
            {state.errors?.email && (
              <span className="text-red-300 text-xs ml-1">
                {state.errors.email[0]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white/70 ml-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              placeholder="Order Inquiry / General Question"
              className="w-full bg-white text-black border-none px-4 py-3 rounded-sm outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white/70 ml-1">
              Message
            </label>
            <textarea
              name="message"
              required
              placeholder="How can we help you today?"
              rows={6}
              className="w-full bg-white text-black border-none px-4 py-3 rounded-sm outline-none resize-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full md:w-auto md:self-end px-10 py-4 bg-white text-[#54463A] font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Spinner className="animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
