  import { Metadata } from "next"

  import Hero from "@modules/home/components/hero"
  import { listCollections } from "@lib/data/collections"
  import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
    title: "Jules Atelier Homepage",
    description:
      `Explore the finest handcrafted streetwear available`,
  }

  export default async function Home(props: {
    params: Promise<{ countryCode: string }>
  }) {
    const params = await props.params

    const { countryCode } = params


    return (
      <>
        <Hero />
      </>
    )
  }
