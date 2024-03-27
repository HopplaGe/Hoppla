"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef, ReactNode, RefAttributes } from "react";
import { cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const listMenuVariants = {
    hover: {
        scale: 1.03,
        transition: { duration: 0.02 },
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

const listMenuStyle = cva(["text-gray-700"], {
    variants: {
        variant: {
            dark: ["text-gray-200", "bg-gray-800"],
            light: ["text-gray-700", "bg-gray-100"],
        },
        color: {
            primary: ["text-primary", "bg-primary", "border-primary"],
            secondary: ["text-secondary", "bg-secondary", "border-secondary"],
            success: ["text-success", "bg-success", "border-success"],
            danger: ["text-danger", "bg-danger", "border-danger"],
            warning: ["text-warning", "bg-warning", "border-warning"],
            info: ["text-info", "bg-info", "border-info"],
            light: ["text-light", "bg-light", "border-light"],
            dark: ["text-dark", "bg-dark", "border-dark"],
            white: ["text-white", "bg-white", "border-white"],
            black: ["text-black", "bg-black", "border-black"],
        },
        rounded: {
            none: "rounded-none",
            sm: "rounded-sm",
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
            "3xl": "rounded-3xl",
        },
    },
    // compoundVariants: [
    //   {
    //     color: "primary",
    //     size: "sm",
    //     className: "uppercase",
    //   },
    // ],
    defaultVariants: {},
});

export type listMenuProps = {
    color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "white" | "black";
    variant?: "dark" | "light";
    rounded?: "sm" | "lg" | "xl" | "2xl" | "3xl" | "none";
    className?: string;
    classNames?: {
        [key: string]: string;
    };
    data?: {
        name: string;
        description: string;
        href: string;
        icon?: LucideIcon;
        category: string;
    }[];
} & typeof listMenuStyle;

export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
    <div className="hidden lg:block w-full h-min  px-1 py-2 rounded-small fira-go">{children}</div>
);

export const ListMenu = forwardRef<HTMLUListElement, listMenuProps & RefAttributes<HTMLUListElement>>(
    ({ variant, color, classNames, rounded, ...props }, ref) => {
        return (
            <ListboxWrapper>
                <motion.ul
                    variants={listMenuVariants}
                    ref={ref}
                    {...props}
                    {...classNames}
                    className={cn(
                        listMenuStyle({ rounded, variant }),
                        "flex flex-col gap-1 w-full h-min p-2 fira-go min-w-64 fira-go",
                        classNames?.base,
                    )}
                >
                    {props.data?.map((item, index) => (
                        <a href={item.href as string} key={index}>
                            {item.category !== (props.data?.[index - 1]?.category as string) && (
                                <motion.h5 className={"text-xs mb-1 font-semibold"}>{item.category as string}</motion.h5>
                            )}

                            <motion.li
                                className={cn(
                                    "flex justify-start items-center gap-2 w-full h-12 fira-go px-2 py-2",
                                    "cursor-pointer transition-all",
                                    listMenuStyle({ rounded }),
                                    `${variant === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`,
                                    classNames?.item,
                                )}
                                variants={listMenuVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                {item.icon && <item.icon size={24} className={cn(listMenuStyle({ color }), "bg-transparent")} />}
                                <div className={cn(listMenuStyle({ color }), "flex flex-col text-sm bg-transparent")}>
                                    {item.name as string}
                                    <p className={cn(listMenuStyle({ variant }), "text-xs bg-transparent")}>{item.description as string}</p>
                                </div>
                            </motion.li>
                        </a>
                    ))}
                </motion.ul>
            </ListboxWrapper>
        );
    },
);

ListMenu.displayName = "ListMenu";
