"use client";
import { cn } from "@/lib/utils";
import { forwardRef, RefAttributes } from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { Button } from "@/components/hoppla";
import Image from "next/image";

const infoSectionVariants = {
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

const sectionStyle = cva([""], {
  variants: {
    color: {
      primary: ["bg-primary"],
      secondary: ["bg-secondary"],
      default: ["bg-default"],
      success: ["bg-success"],
      danger: ["bg-danger"],
      warning: ["bg-warning"],
      info: ["bg-info"],
      light: ["bg-light"],
      dark: ["bg-dark"],
      white: ["bg-white"],
    },
    variant: {
      light: ["bg-light", "text-dark"],
      dark: ["bg-dark", "text-light"],
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

export type InfoSectionProps = {
  img: string;
  title: string;
  description: string;
  href: string;
  colored?: boolean;
  turned?: boolean;
  linkText?: string;
  className?: string;
  variant?: "light" | "dark";
  color?:
    | "primary"
    | "secondary"
    | "default"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "white";
  animation?: "hover" | "tap" | "hidden" | "visible" | "drag" | "spin";
} & typeof sectionStyle;

export const InfoSection = forwardRef<
  HTMLDivElement,
  InfoSectionProps & RefAttributes<HTMLDivElement>
>(
  (
    {
      variant,
      className,
      animation,
      description,
      href,
      linkText,
      img,
      title,
      colored,
      color,
      turned,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.section
        variants={infoSectionVariants}
        animate={animation}
        ref={ref}
        {...props}
        className={cn(
          colored ? "text-white" : "text-black",
          sectionStyle({ variant }),
          colored ? sectionStyle({ color }) : "",
          className,
        )}
      >
        <div className="page-wrapper py-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center fira-go">
          <div className={cn(turned ? "lg:order-last" : "")}>
            <Image
              src={img}
              alt=""
              height={0}
              width={0}
              className="h-[400px] w-full"
            />
          </div>
          <div className="flex gap-6 flex-col items-start">
            <h2
              className={cn(
                "text-3xl font-bold",
                sectionStyle({ variant }),
                colored ? "text-white" : "text-black",
                color === "white" ? "text-black" : "text-white",
                "lg:text-4xl, bg-transparent",
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                sectionStyle({ variant }),
                colored ? "text-white" : "text-black",
                color === "white" ? "text-black" : "text-white",
                "bg-transparent",
              )}
            >
              {description}
            </p>
            <Button
              href={href}
              size="md"
              variant="solid"
              className="mt-4"
              color={colored ? "dark" : "primary"}
              label={linkText as string}
            />
          </div>
        </div>
      </motion.section>
    );
  },
);

InfoSection.displayName = "InfoSection";
