import { Metadata } from "next"
import Nav from "@modules/layout/templates/nav"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Jules Atelier Homepage",
  description: "Shop the finest collections.",
}

export default async function StoreLayout(props: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  return (
    <>
      <div className="py-12" />
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <Link href={`/${params.countryCode}`}>
          <Image
            src="/images/logo-white.png"
            alt="Jules Atelier"
            width={80}
            height={80}
            priority
          />
        </Link>
      </div>

      <Nav countryCode={params.countryCode} />

      {props.children}
    </>
  )
}
