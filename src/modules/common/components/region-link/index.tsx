"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

type RegionLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export const RegionLink = ({ href, children, className }: RegionLinkProps) => {
  const { countryCode } = useParams()

  const handleClick = () => {
    const targetCountry = href.split("/")[1]

    if (targetCountry !== countryCode) {
      console.log("Switching regions: Deleting old cart cookie...")
      document.cookie =
        "_medusa_cart_id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
