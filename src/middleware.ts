import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

const REGION_COOKIE = "_medusa_region"
const CACHE_ID_COOKIE = "_medusa_cache_id"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: 0,
}

async function getRegionMap(cacheId: string) {
  if (!BACKEND_URL) {
    throw new Error("MEDUSA_BACKEND_URL is not set.")
  }

  const now = Date.now()

  if (
    regionMapCache.regionMap.size === 0 ||
    regionMapCache.regionMapUpdated < now - 3600 * 1000
  ) {
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: [`regions-${cacheId}`],
      },
      cache: "force-cache",
    }).then(async (res) => {
      const json = await res.json()
      if (!res.ok) throw new Error(json.message)
      return json
    })

    if (!regions?.length) {
      throw new Error("No regions configured in Medusa.")
    }

    regionMapCache.regionMap.clear()

    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        if (c.iso_2) {
          regionMapCache.regionMap.set(c.iso_2.toLowerCase(), region)
        }
      })
    })

    regionMapCache.regionMapUpdated = now
  }

  return regionMapCache.regionMap
}

async function resolveCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion>
) {
  const urlSegment = request.nextUrl.pathname.split("/")[1]?.toLowerCase()
  const savedRegion = request.cookies.get(REGION_COOKIE)?.value
  const vercelRegion = request.headers.get("x-vercel-ip-country")?.toLowerCase()

  if (urlSegment && regionMap.has(urlSegment)) return urlSegment
  if (savedRegion && regionMap.has(savedRegion)) return savedRegion
  if (vercelRegion && regionMap.has(vercelRegion)) return vercelRegion
  if (regionMap.has(DEFAULT_REGION)) return DEFAULT_REGION

  return regionMap.keys().next().value
}

export async function middleware(request: NextRequest) {
  const cacheId =
    request.cookies.get(CACHE_ID_COOKIE)?.value || crypto.randomUUID()

  const regionMap = await getRegionMap(cacheId)
  const countryCode = await resolveCountryCode(request, regionMap)

  const pathname = request.nextUrl.pathname
  const urlSegment = pathname.split("/")[1]
  const urlHasRegion = urlSegment && regionMap.has(urlSegment)

  // Allow static assets & API
  if (pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next()
  }

  // Save region when user navigates explicitly
  if (urlHasRegion) {
    const res = NextResponse.next()

    res.cookies.set(REGION_COOKIE, urlSegment!, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    })

    res.cookies.set(CACHE_ID_COOKIE, cacheId, {
      path: "/",
      maxAge: 60 * 60 * 24,
    })

    return res
  }

  if (pathname === "/") {
    return NextResponse.next()
  }

  // Redirect to resolved region
  if (countryCode) {
    const redirectUrl = new URL(
      `/${countryCode}${pathname}`,
      request.nextUrl.origin
    )

    redirectUrl.search = request.nextUrl.search

    const res = NextResponse.redirect(redirectUrl, 307)

    res.cookies.set(REGION_COOKIE, countryCode, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    })

    res.cookies.set(CACHE_ID_COOKIE, cacheId, {
      path: "/",
      maxAge: 60 * 60 * 24,
    })

    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
