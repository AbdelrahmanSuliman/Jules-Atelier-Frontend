"use client"

import { useState } from "react"
import { sdk } from "@lib/util/medusa-sdk"
import { Button, Input, Heading, Text, Label, toast } from "@medusajs/ui"

interface Product {
  id: string
  title: string
  thumbnail?: string | null
}

export default function AppointmentForm({
  products = [],
}: {
  products: Product[]
}) {
  const [type, setType] = useState<"in-store" | "styling">("in-store")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    date: "",
    time: "",
  })

  const handleProductToggle = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id))
    } else if (selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...formData,
      location: "Jules Atelier Main Store",
      appointment_type: type,
      metadata:
        type === "styling"
          ? {
              selected_products: selectedProducts,
            }
          : {},
    }

    try {
      await sdk.client.fetch(`/store/appointments`, {
        method: "POST",
        body: payload,
      })

      toast.success("Appointment Booked", {
        description: `We've scheduled your ${type} session for ${formData.date} at ${formData.time}.`,
      })
      setSelectedProducts([])
    } catch (err) {
      console.error("Booking Error:", err)
      toast.error("Booking Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 bg-[#54463A] text-[#ffffff] shadow-xl rounded-xl border border-[#54463A]">
      <Heading className="mb-2 text-4xl font-serif text-[#ffffff]">
        Book Your Visit
      </Heading>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label className="text-[#ffffff]">Service Type</Label>
          <div className="flex bg-[#463a30] p-1 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-3 rounded-md text-sm font-medium transition ${
                type === "in-store"
                  ? "bg-[#ffffff] shadow text-[#54463A]"
                  : "text-[#ffffff]/60"
              }`}
              onClick={() => setType("in-store")}
            >
              In-Store Browse
            </button>
            <button
              type="button"
              className={`flex-1 py-3 rounded-md text-sm font-medium transition ${
                type === "styling"
                  ? "bg-[#ffffff] shadow text-[#54463A]"
                  : "text-[#ffffff]/60"
              }`}
              onClick={() => setType("styling")}
            >
              Personal Styling
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#ffffff]">Full Name</Label>
            <Input
              required
              className="bg-[#ffffff] text-[#54463A]"
              placeholder="John Doe"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#ffffff]">Email</Label>
            <Input
              type="email"
              required
              className="bg-[#ffffff] text-[#54463A]"
              placeholder="john@example.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#ffffff]">Phone Number</Label>
            <Input
              required
              className="bg-[#ffffff] text-[#54463A]"
              placeholder="+..."
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label className="text-[#ffffff]">Date</Label>
              <Input
                type="date"
                required
                className="bg-[#ffffff] text-[#54463A]"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#ffffff]">Time</Label>
              <Input
                type="time"
                required
                className="bg-[#ffffff] text-[#54463A]"
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {type === "styling" && (
          <div className="space-y-4 pt-4 border-t border-[#ffffff]/20 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center">
              <Label className="text-base text-[#ffffff]">
                Select Items for your Session
              </Label>
              <Text className="text-xs text-[#ffffff]/60">
                {selectedProducts.length} of 4 selected
              </Text>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {products?.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleProductToggle(p.id)}
                  className={`relative border p-4 rounded-xl cursor-pointer transition-all text-center
                    ${
                      selectedProducts.includes(p.id)
                        ? "border-[#ffffff] bg-[#ffffff] text-[#54463A] shadow-md ring-2 ring-[#ffffff] ring-offset-2 ring-offset-[#54463A]"
                        : "border-[#ffffff]/20 hover:border-[#ffffff]/50 bg-[#ffffff]/10 text-[#ffffff]"
                    }`}
                >
                  <Text className="text-xs font-medium truncate">
                    {p.title}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-14 bg-[#ffffff] text-[#54463A] hover:bg-gray-100 rounded-lg text-lg font-semibold"
          isLoading={loading}
        >
          {type === "styling" ? "Book Styling Session" : "Book In-Store Visit"}
        </Button>
      </form>
    </div>
  )
}
