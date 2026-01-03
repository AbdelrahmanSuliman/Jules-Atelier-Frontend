import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Select...", defaultValue, className, children, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            // FORCED: Forced white background and solid black text for the wrapper
            "relative flex items-center text-base-regular border border-ui-border-base !bg-white !text-black rounded-md hover:!bg-gray-50 transition-colors duration-200",
            className
          )}
        >
          <select
            ref={innerRef}
            defaultValue={defaultValue}
            {...props}
            /** * THE FIX:
             * 1. !text-black forces the standard color.
             * 2. [text-fill-color:black] fixes Webkit/Safari overrides.
             * 3. [color:black] ensures standard CSS dominance.
             */
            className={clx(
              "appearance-none flex-1 bg-transparent border-none px-4 py-2.5 transition-colors duration-150 outline-none",
              "!text-black ![color:black] ![text-fill-color:black]",
              {
                "!text-gray-500 ![color:gray] ![text-fill-color:gray]":
                  isPlaceholder,
              }
            )}
          >
            <option disabled value="" className="!text-gray-500">
              {placeholder}
            </option>
            {/* We force the children options to also be black to ensure readability */}
            <optgroup className="!text-black">{children}</optgroup>
          </select>
          <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none !text-gray-500">
            <ChevronUpDown />
          </span>
        </div>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
