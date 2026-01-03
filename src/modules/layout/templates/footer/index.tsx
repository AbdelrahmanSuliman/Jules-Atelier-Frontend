"use client" 

import { useState } from "react"
import { subscribeToNewsletter } from "@lib/actions/newsletter"

export default function Footer() {
  const [message, setMessage] = useState("")
  const [isPending, setIsPending] = useState(false)

  async function handleAction(formData: FormData) {
    setIsPending(true)
    const result = await subscribeToNewsletter(formData)
    setIsPending(false)

    if (result?.error) {
      setMessage(result.error)
    } else {
      setMessage("Welcome to the family.")
    }
  }

  return (
    <footer className="w-full bg-black border-t border-white/5">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col md:flex-row items-center justify-between py-16 border-b border-white/5 gap-8">
          <div className="flex flex-col gap-y-2 text-center md:text-left">
            <h3 className="text-white text-lg font-bold uppercase tracking-[0.2em]">
              Become Part of the Jules Family
            </h3>
            <p className="text-gray-400 text-xs uppercase tracking-widest max-w-[450px] leading-relaxed">
              An inner circle for those who value detail, quality, and design.
              Exclusive drops. Private updates. Atelier access.
            </p>
          </div>

          <div className="flex flex-col w-full max-w-sm gap-y-2">
            <form action={handleAction} className="flex items-center gap-x-2">
              <input
                name="email" // This name must match formData.get("email")
                type="email"
                required
                placeholder="ENTER YOUR EMAIL"
                className="bg-white/10 placeholder-white/50 text-white text-xs uppercase tracking-widest rounded-l-md px-4 py-3 focus:outline-none transition-all flex-1 border-b border-transparent focus:border-white"
              />
              <button
                type="submit"
                disabled={isPending}
                className="bg-white text-black text-xs font-bold uppercase tracking-widest rounded-r-md px-6 py-3 hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                {isPending ? "..." : "Subscribe"}
              </button>
            </form>
            {message && (
              <p className="text-[10px] text-white uppercase tracking-widest mt-2 animate-pulse">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
