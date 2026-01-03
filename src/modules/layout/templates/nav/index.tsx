import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group text-white">
      <header className="relative h-16 mx-auto duration-200">
        <nav className="content-container px-6 flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center gap-4">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-6 h-full">
            <LocalizedClientLink href="/store">
              <p className="transition-colors hover:text-black text-xl-regular">
                Catalog
              </p>
            </LocalizedClientLink>

            <LocalizedClientLink href="/appointments">
              <p className="transition-colors hover:text-black text-xl-regular">
                Appointments
              </p>
            </LocalizedClientLink>

            <LocalizedClientLink href="/about">
              <p className="transition-colors hover:text-black text-xl-regular">
                About
              </p>
            </LocalizedClientLink>

            <LocalizedClientLink href="/contact">
              <p className="transition-colors hover:text-black text-xl-regular whitespace-nowrap">
                Contact Us
              </p>
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden sm:flex items-center gap-x-6 h-full">
              <LocalizedClientLink href="/account">
                <p className="transition-colors hover:text-black text-2xl-regular">
                  Account
                </p>
              </LocalizedClientLink>
            </div>

            <Suspense
              fallback={
                <LocalizedClientLink href="/cart">
                  <p className="transition-colors hover:text-black">Cart (0)</p>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
