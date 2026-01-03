"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-4 text-white ">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-2xl-semi font-serif">Order details</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex gap-2 items-center text-white/60 hover:text-white transition-colors"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to overview
        </LocalizedClientLink>
      </div>

      <div
        className="flex flex-col gap-4 h-full bg-transparent w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />

        <div className="border-t border-white/10 pt-4">
          <Items order={order} />
        </div>

        <div className="border-t border-white/10 pt-4">
          <ShippingDetails order={order} />
        </div>

        <div className="border-t border-white/10 pt-4 bg-white/5 p-4 rounded-lg">
          <OrderSummary order={order} />
        </div>

        <div className="mt-8">
          <Help />
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
