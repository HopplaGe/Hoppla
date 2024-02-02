import * as React from "react"

import {cn} from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "block w-full h-12 rounded-md border focus:border-0 focus:shadow-md outline-none py-1.5 px-6 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 fira-go",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export {Input}
