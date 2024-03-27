"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef, ReactNode, Ref, RefAttributes } from "react";
import { cva } from "class-variance-authority";

const buttonVariants = {
    hover: {
        scale: 1.1,
        // rotateZ: 5,
        transition: { duration: 0.2 },
    },
    tap: {
        scale: 0.95,
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

const buttonStyle = cva(["font-semibold", "rounded-xl", "flex", "gap-2", "justify-center", "items-center", "fira-go"], {
    variants: {
        color: {
            primary: ["bg-primary", "hover:bg-primary-hover", "text-primary"],
            secondary: ["bg-secondary", "text-secondary", "hover:bg-secondary-hover"],
            default: ["bg-default", "text-default", "hover:bg-default-hover"],
            success: ["bg-success", "text-success", "hover:bg-success-hover"],
            danger: ["bg-danger", "text-danger", "hover:bg-danger-hover"],
            warning: ["bg-warning", "text-warning", "hover:bg-warning-hover"],
            info: ["bg-info", "text-info", "hover:bg-info-hover"],
            light: ["bg-light", "text-light", "hover:bg-light-hover"],
            dark: ["bg-dark", "hover:bg-dark-hover", "text-dark"],
        },
        size: {
            xs: ["text-xs", "px-2", "py-1"],
            sm: ["text-sm", "px-3", "py-2"],
            md: ["text-md", "px-4", "py-3"],
            lg: ["text-lg", "px-5", "py-4"],
            xl: ["text-xl", "px-6", "py-5"],
            "2xl": ["text-2xl", "px-7", "py-6"],
            "3xl": ["text-3xl", "px-8", "py-7"],
            "4xl": ["text-4xl", "px-9", "py-8"],
            "5xl": ["text-5xl", "px-10", "py-9"],
            "6xl": ["text-6xl", "px-11", "py-10"],
        },
        variant: {
            solid: ["text-white", "hover:bg-opacity-95", "bg-opacity-100"],
            outline: ["bg-transparent", "border-2", "border-solid", "border-current", "hover:bg-transparent", "hover:border-2"],
            ghost: ["bg-gray-50", "hover:bg-gray-100"],
            link: ["bg-transparent", "hover:bg-transparent", "hover:underline"],
        },
        rounded: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
            "3xl": "rounded-3xl",
            full: "rounded-full",
        },
    },
    // compoundVariants: [
    //   {
    //     color: "primary",
    //     size: "sm",
    //     className: "uppercase",
    //   },
    // ],
    defaultVariants: {
        color: "primary",
        size: "sm",
    },
});

export type ButtonProps = {
    label: string;
    onClick?: () => void;
    startContent?: ReactNode;
    endContent?: ReactNode;
    className?: string;
    glow?: boolean;
    color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "default";
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
    variant?: "outline" | "solid" | "ghost" | "link";
    href?: string;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    animation?: true | false;
    disabled?: boolean;
} & typeof buttonStyle;

export const Button = forwardRef<HTMLButtonElement, ButtonProps & RefAttributes<HTMLButtonElement>>(
    ({ color, size, variant, rounded, className, animation, href, ...props }, ref) => {
        return (
            <>
                {href ? (
                    <motion.a
                        variants={buttonVariants}
                        {...(animation && {
                            whileHover: "hover",
                            whileTap: "tap",
                        })}
                        {...props}
                        className={cn(buttonStyle({ color, size, variant, rounded, className }))}
                        href={href}
                        ref={ref as Ref<HTMLAnchorElement>}
                    >
                        {props.startContent && <span>{props.startContent}</span>}
                        {props.label}
                        {props.endContent && <span>{props.endContent}</span>}
                    </motion.a>
                ) : (
                    <motion.button
                        variants={buttonVariants}
                        {...(animation && {
                            whileHover: "hover",
                            whileTap: "tap",
                        })}
                        {...props}
                        className={cn(buttonStyle({ color, size, variant, rounded, className }))}
                        ref={ref}
                        disabled={props.disabled}
                    >
                        {props.startContent && <span>{props.startContent}</span>}
                        {props.label}
                        {props.endContent && <span>{props.endContent}</span>}
                    </motion.button>
                )}
            </>
        );
    },
);

Button.displayName = "Button";
