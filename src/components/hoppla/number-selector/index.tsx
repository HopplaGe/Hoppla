"use client";
import { cn } from "@/lib/utils";
import { forwardRef, RefAttributes, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

const numberSelectorVariants = {
    tap: {
        scale: 0.95,
    },
    hover: {
        scale: 1,
        transition: { duration: 0.2 },
    },
    hidden: { opacity: 0, x: "100vw" },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2 },
    },
    drag: {
        x: [0, 10, 0, -10, 0],
        transition: { duration: 0.5 },
    },
    spin: {
        rotate: 360,
        transition: { duration: 2, loop: Infinity },
    },
};

const numberSelectorStyle = cva([], {
    variants: {
        color: {
            primary: ["bg-primary", "text-primary", "border-primary"],
            secondary: ["bg-secondary", "text-secondary", "hover:bg-secondary-hover"],
            default: ["bg-default", "text-default", "hover:bg-default-hover"],
            success: ["bg-success", "text-success", "hover:bg-success-hover"],
            danger: ["bg-danger", "text-danger", "hover:bg-danger-hover"],
            warning: ["bg-warning", "text-warning", "hover:bg-warning-hover"],
            info: ["bg-info", "text-info", "hover:bg-info-hover"],
            light: ["bg-light", "text-light", "hover:bg-light-hover"],
            dark: ["bg-dark", "hover:bg-dark-hover", "text-dark"],
            white: ["bg-white", "text-white", "hover:bg-white-hover"],
            black: ["bg-black", "text-black", "hover:bg-black-hover"],
        },
        type: {
            solid: ["text-white", "hover:bg-opacity-95", "bg-opacity-100", "placeholder-white"],
            outline: ["bg-transparent", "border-2", "border-solid", "border-current", "hover:bg-transparent", "hover:border-2"],
            ghost: ["bg-gray-50", "hover:bg-gray-100"],
        },
        rounded: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
            full: "rounded-full",
        },
        shadow: {
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
            "2xl": "shadow-2xl",
            inner: "shadow-inner",
            none: "shadow-none",
        },
    },
    defaultVariants: {
        color: "white",
        type: "solid",
        rounded: "xl",
        shadow: "none",
    },
});

export type NumberSelectorProps = {
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step: number;
    className?: string;
    color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "default" | "white" | "black";
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
    type?: "outline" | "solid" | "ghost";
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "inner" | "none";
    animation?: true | false;
} & VariantProps<typeof numberSelectorStyle>;

export const NumberSelector = forwardRef<HTMLInputElement, NumberSelectorProps & RefAttributes<HTMLInputElement>>(
    ({ min, max, step, onChange, color, rounded, className, type, shadow, ...props }, ref) => {
        const [value, setValue] = useState<number>(min || 0);
        const handleIncrement = () => {
            if (max && value >= max && max !== 0) {
                return;
            }
            setValue((Number(value) + step) as number);
        };

        const handleDecrement = () => {
            if ((min ?? 0) <= 0 && value <= (min ?? 0)) {
                return;
            }
            setValue((Number(value) - step) as number);
        };

        return (
            <motion.div
                variants={numberSelectorVariants}
                className={cn(
                    "relative overflow-hidden",
                    "rounded-xl min-w-16 w-auto h-12 flex flex-row justify-between items-center",
                    "shadow-xl",
                    numberSelectorStyle({ color, type, rounded, shadow } as const),
                    type === "solid" && color === "white" && "text-black",
                    type === "solid" && color === "light" && "text-black",
                    className,
                )}
                {...props}
            >
                <button
                    onClick={handleDecrement}
                    className={cn("relative block w-12 h-12 disabled:bg-yellow-600", "cursor-pointer", "z-10", "text-sm font-bold")}
                >
                    -
                </button>
                <input
                    ref={ref}
                    className={cn(
                        "spin-button-none w-10 text-center text-sm font-bold outline-none border-none focus:ring-0 bg-transparent",
                        "text-sm font-bold",
                        "cursor-pointer",
                    )}
                    type="number"
                    readOnly
                    value={value}
                    onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10);
                        if (min && newValue < min) {
                            return;
                        }
                        if (max && newValue > max) {
                            return;
                        }
                        setValue(newValue);
                        onChange(newValue);
                    }}
                />
                <button onClick={handleIncrement} className={cn("relative block w-12 h-12", "cursor-pointer", "z-10", "text-sm font-bold")}>
                    +
                </button>
            </motion.div>
        );
    },
);

NumberSelector.displayName = "NumberSelector";
