import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import localFont from "next/font/local"
import "styles/globals.css"
import "flag-icons/css/flag-icons.min.css"
import { Toaster } from "@medusajs/ui"

const sans = localFont({
  src: [
    {
      path: "../../public/fonts/Gambetta/Gambetta-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gambetta/Gambetta-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable}`}>
      <body className="bg-brand-secondary">
        <Toaster />
        <main>{props.children}</main>
      </body>
    </html>
  )
}
