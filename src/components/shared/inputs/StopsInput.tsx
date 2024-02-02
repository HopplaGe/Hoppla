"use client"
import * as React from "react"

import {cn} from "@/lib/utils"
import {Input} from "@nextui-org/react";
import {Waypoints} from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onClear: () => void
    stopValue: string
    setStopValue: (value: string) => void
}

const StopsInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        const handleInputValueChange = (e: any) => props.setStopValue(e.target.value);

        return (
            <Input
                ref={ref}
                type={type}
                className={cn("max-w-full fira-go", className)}
                label="გაჩერებები"
                placeholder="მაგ: ქუთაისი"
                startContent={<Waypoints size={20}/>}
                onKeyDown={props.onKeyPress}
                // @ts-ignore
                color="default"
                onClick={props.onClick}
                {...props}
                value={props.stopValue}
                onChange={(e) => handleInputValueChange(e)}
            />
        )
    }
)
StopsInput.displayName = "Input"

export {StopsInput}