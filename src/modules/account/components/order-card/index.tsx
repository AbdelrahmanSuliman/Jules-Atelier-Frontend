"use client"

import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    // Changed bg-white to bg-transparent or bg-[#54463A]
    <div
      className="bg-transparent flex flex-col text-white"
      data-testid="order-card"
    >
      <div className="uppercase text-large-semi mb-1 text-white">
        #<span data-testid="order-display-id">{order.display_id}</span>
      </div>

      {/* Changed divide-gray-200 to divide-white/10 */}
      <div className="flex items-center divide-x divide-white/10 text-small-regular text-white/80">
        <span className="pr-2" data-testid="order-created-at">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2" data-testid="order-amount">
          {convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>

      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-4">
        {order.items?.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2"
              data-testid="order-item"
            >
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              <div className="flex items-center text-small-regular text-white/90">
                <span
                  className="font-semibold text-white"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="ml-2 opacity-60">x</span>
                <span data-testid="item-quantity">{i.quantity}</span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-white/20 rounded-rounded">
            <span className="text-small-regular text-white">
              + {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-white/60">more</span>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button
            data-testid="order-details-link"
            variant="secondary"
            className="bg-transparent border-white text-white hover:bg-white hover:text-[#54463A]"
          >
            See details
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
