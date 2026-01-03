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
    location: "", 
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
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      date: formData.date,
      time: formData.time,
      appointment_type: type,
      location:
        type === "styling"
          ? formData.location
          : "Jules Atelier Main Store - Cairo",
      metadata:
        type === "styling" ? { selected_products: selectedProducts } : {},
    }

    try {
      await sdk.client.fetch(`/store/appointments`, {
        method: "POST",
        body: payload,
      })

      toast.success("Appointment Booked", {
        description: `Your ${type} session is scheduled for ${formData.date}.`,
      })

      setFormData({
        name: "",
        email: "",
        phone_number: "",
        date: "",
        time: "",
        location: "",
      })
      setSelectedProducts([])
    } catch (err) {
      console.error("Booking Error:", err)
      toast.error("Booking Failed", {
        description: "Please check your details and try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 bg-[#54463A] text-white shadow-xl rounded-xl border border-[#54463A]">
      <Heading className="mb-6 text-4xl font-sans text-white text-center">
        Book Your Visit
      </Heading>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Toggle Switch */}
        <div className="space-y-2">
          <Label className="text-white text-xs uppercase tracking-widest">
            Service Type
          </Label>
          <div className="flex bg-[#463a30] p-1 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-3 rounded-md text-sm font-medium transition-all ${
                type === "in-store"
                  ? "bg-white text-[#54463A] shadow"
                  : "text-white/60 hover:text-white"
              }`}
              onClick={() => setType("in-store")}
            >
              In-Store Browse
            </button>
            <button
              type="button"
              className={`flex-1 py-3 rounded-md text-sm font-medium transition-all ${
                type === "styling"
                  ? "bg-white text-[#54463A] shadow"
                  : "text-white/60 hover:text-white"
              }`}
              onClick={() => setType("styling")}
            >
              Personal Styling
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-white text-xs uppercase tracking-widest">
              Full Name
            </Label>
            <Input
              required
              value={formData.name}
              className="bg-white text-[#54463A]"
              placeholder="John Doe"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white text-xs uppercase tracking-widest">
              Email Address
            </Label>
            <Input
              type="email"
              required
              value={formData.email}
              className="bg-white text-[#54463A]"
              placeholder="john@example.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white text-xs uppercase tracking-widest">
              Phone Number
            </Label>
            <Input
              required
              value={formData.phone_number}
              className="bg-white text-[#54463A]"
              placeholder="+20..."
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
            />
          </div>

          <div
            className={`space-y-2 transition-all duration-300 ${
              type === "styling"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 pointer-events-none absolute"
            }`}
          >
            <Label className="text-white text-xs uppercase tracking-widest">
              City
            </Label>
            <Input
              required={type === "styling"}
              value={formData.location}
              className="bg-white text-[#54463A]"
              placeholder="Cairo, Egypt"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white text-xs uppercase tracking-widest">
              Preferred Date
            </Label>
            <Input
              type="date"
              required
              value={formData.date}
              className="bg-white text-[#54463A]"
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white text-xs uppercase tracking-widest">
              Preferred Time
            </Label>
            <Input
              type="time"
              required
              value={formData.time}
              className="bg-white text-[#54463A]"
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            />
          </div>
        </div>

        {type === "styling" && (
          <div className="space-y-4 pt-6 border-t border-white/10 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-white uppercase tracking-widest font-bold">
                Items for Session
              </Label>
              <Text className="text-[10px] text-white/60">
                {selectedProducts.length} OF 4 SELECTED
              </Text>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {products?.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleProductToggle(p.id)}
                  className={`relative border p-3 rounded-lg cursor-pointer transition-all text-center text-[10px] uppercase tracking-tighter
                    ${
                      selectedProducts.includes(p.id)
                        ? "border-white bg-white text-[#54463A] shadow-lg ring-1 ring-white"
                        : "border-white/20 hover:border-white/50 bg-white/5 text-white"
                    }`}
                >
                  {p.title}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-14 bg-white hover:bg-gray-100 rounded-lg text-sm font-bold uppercase tracking-[0.2em] transition-all shadow-md active:scale-[0.98]"
          isLoading={loading}
        >
          {type === "styling"
            ? "Confirm Styling Session"
            : "Confirm In-Store Visit"}
        </Button>
      </form>
    </div>
  )
}
