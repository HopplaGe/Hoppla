"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  forwardRef,
  ReactNode,
  RefAttributes,
  RefObject,
  useRef,
  useState,
} from "react";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { Button } from "@/components/hoppla";

const inputVariants = {
  hover: {
    scale: 1,
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

const inputStyle = cva(
  [
    "font-semibold",
    "rounded-xl",
    "flex",
    "flex-col",
    "gap-0.5",
    "justify-center",
    "items-start",
    "group",
    "fira-go",
    "px-1",
    "py-2",
  ],
  {
    variants: {
      color: {
        primary: ["bg-primary", "text-primary", "border-primary"],
        secondary: [
          "bg-secondary",
          "text-secondary",
          "hover:bg-secondary-hover",
        ],
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
      size: {
        xs: ["text-xs"],
        sm: ["text-sm"],
        md: ["text-md"],
        lg: ["text-lg"],
        xl: ["text-xl"],
        "2xl": ["text-2xl"],
        "3xl": ["text-3xl"],
        "4xl": ["text-4xl"],
        "5xl": ["text-5xl"],
      },
      type: {
        solid: [
          "text-white",
          "hover:bg-opacity-95",
          "bg-opacity-100",
          "placeholder-white",
        ],
        outline: [
          "bg-transparent",
          "border-2",
          "border-solid",
          "border-current",
          "hover:bg-transparent",
          "hover:border-2",
        ],
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
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
    },
  },
);

export type InputProps = {
  label: string;
  placeholder?: string;
  onClick?: () => void;
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "default"
    | "white"
    | "black";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  type?: "outline" | "solid" | "ghost";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  animation?: true | false;
} & typeof inputStyle;

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & RefAttributes<HTMLInputElement>
>(({ color, size, rounded, className, animation, type, ...props }, ref) => {
  const [enableClearButton, setEnableClearButton] = useState(false);
  const inputRef = useRef(ref);

  const onClearClick = () => {
    // @ts-expect-error
    inputRef.current.value = "";
    setEnableClearButton(false);
  };

  return (
    <motion.div
      className={cn(inputStyle({ color, size, type, rounded }), className)}
      variants={inputVariants}
      {...(animation && {
        whileHover: "hover",
        whileTap: "tap",
      })}
      {...props}
    >
      <motion.label
        className={cn(
          "px-2 text-xs",
          color === "light" && "text-gray-500",
          color === "white" && "text-black",
        )}
      >
        {props.label}
      </motion.label>
      <div className={"flex flex-row items-center"}>
        <motion.input
          {...props}
          className={cn(
            "w-full bg-transparent focus:outline-none border-none px-2 pt-0 font-normal",
            color === "light" && "text-gray-500",
            color === "white" && "text-black",
          )}
          onChangeCapture={(e) => {
            // @ts-expect-error
            setEnableClearButton(e.target.value.length > 0);
          }}
          ref={inputRef as RefObject<HTMLInputElement>}
          placeholder={props.placeholder}
        />
        {enableClearButton && (
          <Button
            onClick={onClearClick}
            variant="ghost"
            label={""}
            className={"p-0 bg-transparent hover:bg-transparent text-gray-500"}
            startContent={<X size={16} />}
          />
        )}
      </div>
    </motion.div>
  );
});

Input.displayName = "Input";
