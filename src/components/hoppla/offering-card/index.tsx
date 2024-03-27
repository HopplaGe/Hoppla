"use client";
import { cn } from "@/lib/utils";
import { ElementType, forwardRef, RefAttributes } from "react";
import { cva } from "class-variance-authority";

const offeringCardStyle = cva(["flex flex-col gap-1 py-4 md:py-8 px-4 hoppla-animation max-w-80 fira-go"], {
    variants: {
        color: {
            primary: ["text-primary", "text-primary-dark"],
            secondary: ["text-secondary", "text-secondary-dark"],
            default: ["text-default", "text-default-dark"],
            success: ["text-success", "text-success-dark"],
            danger: ["text-danger", "text-danger-dark"],
            warning: ["text-warning", "text-warning-dark"],
            info: ["text-info", "text-info-dark"],
            light: ["text-light", "text-light-dark"],
            dark: ["text-dark", "text-dark-dark"],
            white: ["text-white", "text-gray-100"],
        },
        variant: {
            light: ["bg-white", "text-gray-800", "hover:bg-gray-100"],
            dark: ["bg-gray-800", "text-white", "hover:bg-gray-700"],
        },
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
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
    },
});

export type OfferingCardProps = {
    title: string;
    description: string;
    icon: ElementType;
    variant: "light" | "dark";
    rounded: "sm" | "md" | "lg" | "xl";
    color: "primary" | "secondary" | "default" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "white";
} & typeof offeringCardStyle;

export const OfferCard = forwardRef<HTMLLIElement, OfferingCardProps & RefAttributes<HTMLLIElement>>(
    ({ description, icon, title, variant, rounded, color, ...props }, ref) => {
        const Icon = icon;
        return (
            <li className={offeringCardStyle({ variant, rounded })} {...props} ref={ref}>
                <div className="mb-1">
                    <Icon className={cn("w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16", offeringCardStyle({ color }), "px-0 py-0 md:py-0")} />
                </div>
                <h3 className={cn("text-sm md:text-md lg:text-lg font-semibold", offeringCardStyle({ color }), "px-0 py-0 md:py-0")}>
                    {title}
                </h3>
                <p className={cn("text-xs md:text-sm", variant === "light" ? "text-gray-600" : "text-gray-400")}>{description}</p>
            </li>
        );
    },
);

OfferCard.displayName = "OfferCard";
