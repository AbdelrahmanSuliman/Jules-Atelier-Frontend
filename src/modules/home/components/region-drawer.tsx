"use client"
import {} from "@modules/common/components/region-link/index"
import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"

const regions = [
  { id: "eg", name: "Egypt", href: "/eg" },
  { id: "pt", name: "Portugal", href: "/pt" },
]

export default function RegionDrawer() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 md:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-black border-l border-white/10 shadow-2xl py-6">
                    <div className="px-6 md:px-10 mt-10 mb-10">
                      <Dialog.Title className="text-xl md:text-2xl font-light uppercase tracking-[0.2em] text-white">
                        Select Region
                      </Dialog.Title>
                    </div>

                    <div className="relative mt-6 flex-1 px-6 md:px-10 flex flex-col gap-4">
                      {regions.map((region) => (
                        <Link
                          key={region.id}
                          href={region.href}
                          onClick={() => {
                            document.cookie =
                              "_medusa_cart_id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                            setOpen(false) 
                          }}
                          className="group relative flex items-center justify-between p-6 border border-white/10 hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                        >
                          <span className="text-lg font-bold text-white uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                            {region.name}
                          </span>

                          <svg
                            className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
