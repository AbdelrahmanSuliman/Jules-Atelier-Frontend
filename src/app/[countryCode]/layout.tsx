import { Metadata } from "next"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Jules Atelier Homepage",
  description:
    "Shop the finest collections.",
}

export default async function StoreLayout(props: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { children } = props

  return (
    <>
      <div className="py-12"/>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <LocalizedClientLink href="/">
          <Image
            src="/images/logo-white.png"
            alt="Jules Atelier"
            width={80}
            height={80}
            priority
          />
        </LocalizedClientLink>
      </div>
      <Nav />
      {children}
    </>
  )
}
