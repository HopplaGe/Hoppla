"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { ElementType, forwardRef, RefAttributes } from "react";

const statCardVariants = {
  hover: {
    scale: 1.05,
    rotateZ: 5,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 1.01,
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

const statCardStyle = cva("", {
  variants: {
    color: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      dark: "bg-dark text-light",
      light: "bg-light text-dark",
      success: "bg-success/10 text-success-dark",
      danger: "bg-danger/10 text-danger-dark",
      warning: "bg-warning/10 text-warning-dark",
      info: "bg-info/10 text-info-dark",
      white: "bg-white text-dark",
      black: "bg-black text-white",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
  },
  defaultVariants: {
    color: "success",
  },
});

export type StatCardProps = {
  title: string;
  value: number | string;
  color?: string;
  icon: ElementType;
  percent?: string;
  status?: string;
} & VariantProps<typeof statCardStyle>;

export const StatCard = forwardRef<
  HTMLDivElement,
  StatCardProps & RefAttributes<HTMLDivElement>
>(({ title, value, color, rounded, shadow, icon, percent, status }, ref) => {
  const Icon = icon;
  return (
    <motion.div
      variants={statCardVariants}
      ref={ref}
      className={cn(
        "grid grid-cols-3 gap-x-4 px-6 py-4 bg-white",
        statCardStyle({ color, rounded, shadow }),
      )}
    >
      <div className="col-span-2">
        <div className="col-span-2 xl:text-xl 2xl:text-3xl font-bold">
          {value}
        </div>
        <div className="col-span-2 fira-go text-xs">{title}</div>
        {percent && (
          <div className="col-span-2 fira-go flex flex-row gap-1 justify-start items-center text-[0.6rem]">
            <span
              className={cn(
                "flex flex-row gap-1 justify-start items-center",
                status === "increase" ? "text-emerald-500" : "text-red-500",
              )}
            >
              {status === "increase" ? (
                <TrendingUp size={10} />
              ) : (
                <TrendingDown size={10} />
              )}
              {percent}
            </span>
            <small className="">გასული თვიდან</small>
          </div>
        )}
      </div>
      <div className="col-start-3 row-start-1 row-end-4 grid place-items-center justify-end">
        <div
          className={cn(
            "rounded-md p-1",
            statCardStyle({
              color,
              rounded,
            }),
            color === "white" && "bg-black",
            "bg-opacity-5",
          )}
        >
          {icon && <Icon size={22} className={""} />}
        </div>
      </div>
    </motion.div>
  );
});

StatCard.displayName = "StatCard";
