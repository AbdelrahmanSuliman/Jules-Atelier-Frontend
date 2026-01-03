import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Roboto } from "next/font/google"
import "styles/globals.css"
import "flag-icons/css/flag-icons.min.css"
import { Toaster } from "@medusajs/ui"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className="bg-brand-secondary">
        <Toaster />
        <main>{props.children}</main>
      </body>
    </html>
  )
}
