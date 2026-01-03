"use client"

import { Button, Heading, Text } from "@medusajs/ui"
import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full bg-transparent">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-white/10 pb-6 last:pb-0 last:border-none"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-4 py-12 text-center text-[#54463A]"
      data-testid="no-orders-container"
    >
      <Heading level="h2" className="text-white text-2xl font-serif">
        Nothing to see here
      </Heading>
      <Text className="text-white/80 max-w-[32ch]">
        You don&apos;t have any orders yet, let us change that {":)"}
      </Text>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button
            data-testid="continue-shopping-button"
            className="bg-white  hover:bg-gray-100 px-8 h-12"
          >
            Continue shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
