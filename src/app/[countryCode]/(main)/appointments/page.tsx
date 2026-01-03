// src/app/[countryCode]/appointments/page.tsx
import { sdk } from "@lib/util/medusa-sdk"
import AppointmentForm from "./AppointmentForm"

export default async function AppointmentsPage({
  params,
}: {
  params: { countryCode: string }
}) {
  const response = await sdk.store.product.list()

  const products = response?.products || []

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AppointmentForm products={products} />
      </div>
    </main>
  )
}
