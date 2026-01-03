"use client"

import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    if (!str) return "N/A"
    const formatted = str.split("_").join(" ")
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="text-white">
      <Text className="text-white/90">
        We have sent the order confirmation details to{" "}
        <span className="text-white font-semibold" data-testid="order-email">
          {order.email}
        </span>
        .
      </Text>

      <Text className="mt-2 text-white/80">
        Order date:{" "}
        <span data-testid="order-date" className="text-white">
          {new Date(order.created_at).toDateString()}
        </span>
      </Text>

      <Text className="mt-2 text-white font-medium">
        Order number: <span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text className="text-white/70">
              Order status:{" "}
              <span className="text-white" data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text className="text-white/70">
              Payment status:{" "}
              <span className="text-white" data-testid="order-payment-status">
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
