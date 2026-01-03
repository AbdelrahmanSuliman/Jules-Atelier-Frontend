"use client"

import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"
import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password") {
        setInputType(showPassword ? "text" : "password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 txt-compact-medium-plus !text-white/90">
            {topLabel}
          </Label>
        )}
        <div className="flex relative w-full">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className="peer pt-4 pb-1 block w-full h-12 px-4 mt-0 !bg-white border border-transparent rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 !text-black !placeholder-gray-500 transition-all duration-200"
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="absolute left-4 top-3 transition-all duration-200 cursor-text pointer-events-none 
                       !text-gray-500
                       peer-focus:top-1 peer-focus:text-[10px] peer-focus:!text-black
                       peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:!text-black"
          >
            {label}
            {required && <span className="text-rose-500 ml-1">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="!text-gray-400 px-4 focus:outline-none absolute right-0 top-1/2 -translate-y-1/2 hover:!text-black"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"
export default Input
