import { Metadata } from "next"
import Hero from "@modules/home/components/hero"
import Footer from "@modules/layout/templates/footer"

export const metadata: Metadata = {
  title: "Jules Atelier Homepage",
  description: `Explore the finest handcrafted streetwear available`,
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  return (
    <main className="bg-black z-0">
      <Hero />
      <Footer />
    </main>
  )
}
