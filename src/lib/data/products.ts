"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const page = Math.max(pageParam, 1)
  const offset = (page - 1) * limit

  const region = countryCode
    ? await getRegion(countryCode)
    : await retrieveRegion(regionId!)

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,",
          ...queryParams,
        },
        headers,
        cache: "force-cache",
        next: {
          tags: ["products"],
        },
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? page + 1 : null

      return {
        response: { products, count },
        nextPage,
        queryParams,
      }
    })
}

/**
 * Fetches products once, sorts in-memory, then paginates
 */
export const listProductsWithSort = async ({
  page = 1,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 1,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const offset = (page - 1) * limit
  const paginatedProducts = sortedProducts.slice(offset, offset + limit)

  const nextPage = count > offset + limit ? page + 1 : null

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}
