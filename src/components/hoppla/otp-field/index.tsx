"use client";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, forwardRef, RefAttributes, useEffect, useRef, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";

const otpStyle = cva(
    [
        "spin-button-none",
        "disabled:bg-gray-50",
        "disabled:text-gray-100",
        "disabled:cursor-not-allowed",
        "bg-transparent",
        "focus:outline-none",
        "line",
    ],
    {
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
                white: ["bg-white", "text-white", "hover:bg-gray-100"],
                black: ["bg-black", "text-black", "hover:bg-gray-900"],
            },
            size: {
                xs: ["text-lg", "w-8", "h-8"],
                sm: ["text-xl", "w-10", "h-10"],
                md: ["text-3xl", "w-12", "h-12"],
                lg: ["text-4xl", "w-14", "h-14"],
                xl: ["text-5xl", "w-16", "h-16"],
                "2xl": ["text-6xl", "w-20", "h-20"],
                "3xl": ["text-7xl", "w-24", "h-24"],
            },
            type: {
                solid: ["text-white", "hover:bg-opacity-95", "bg-opacity-100", "border-none"],
                outline: ["bg-transparent", "border-2", "border-solid", "border-current", "hover:bg-transparent", "hover:border-2"],
                ghost: ["bg-gray-50", "hover:bg-gray-100", "border-none"],
            },
            rounded: {
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
                full: "rounded-full",
            },
        },
        defaultVariants: {
            color: "primary",
            size: "sm",
        },
    },
);

export type OTPFieldProps = {
    length: number;
    onChange: (otp: string) => void;
    autoFocus?: boolean;
    disabled?: boolean;
    className?: string;
    inputType?: string;
} & VariantProps<typeof otpStyle>;

export const OTPField = forwardRef<HTMLInputElement, OTPFieldProps & RefAttributes<HTMLInputElement>>(
    ({ length, onChange, autoFocus = true, disabled, inputType = "number", color, size, rounded, className, type, ...props }, ref) => {
        const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
        const [optInputIndex, setOptInputIndex] = useState(0);
        const inputRef = useRef<HTMLInputElement>(ref as HTMLInputElement | null);

        useEffect(() => {
            if (autoFocus) {
                inputRef.current?.focus();
            }
        }, [autoFocus, otp]);

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
            const value = e.target.value.slice(0, 1);
            if (value.length > 1) {
                e.target.value = value[0];
            }
            const otpCopy = [...otp];
            otpCopy[optInputIndex] = value;
            setOtp(otpCopy);
            onChange(otpCopy.join(""));
            setOptInputIndex((prev) => (prev < length - 1 ? prev + 1 : prev));

            // if last input is filled, focus on the submit button
            if (optInputIndex === length - 1) {
                inputRef.current?.blur();
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace") {
                e.preventDefault();
                setOtp((prev) => {
                    const otpCopy = [...prev];
                    otpCopy[optInputIndex] = "";
                    return otpCopy;
                });
                setOptInputIndex((prev) => (prev > 0 ? prev - 1 : prev));
                onChange(otp.join(""));
            }
        };

        const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const paste = e.clipboardData.getData("text");
            const otpCopy = [...otp];
            for (let i = 0; i < paste.length; i++) {
                if (otpCopy[i] === undefined) break;
                otpCopy[i] = paste[i];
            }
            setOtp(otpCopy);
            onChange(otpCopy.join(""));

            // focus on the last input
            setOptInputIndex(otpCopy.length - 1);
        };

        return (
            <div className={"flex gap-2"}>
                {otp.map((_, index) => (
                    <input
                        key={index}
                        ref={index === optInputIndex ? inputRef : null}
                        type={inputType}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        autoFocus={autoFocus && index === 0}
                        disabled={disabled}
                        value={otp[index]}
                        className={cn(
                            "bg-gray-50 border border-gray-300 rounded-md text-center text-2xl focus:border-3",
                            "flex items-center justify-center w-12 h-12",
                            inputType === "text" ? "uppercase" : "",
                            otpStyle({ color, size, type, rounded }),
                            (type === "solid" && color === "white") || (type === "solid" && color === "light")
                                ? "text-black focus:bg-black/10"
                                : "",
                            className,
                        )}
                        onChange={(e) => handleOnChange(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onPaste={(e) => handleOnPaste(e)}
                        {...props}
                    />
                ))}
            </div>
        );
    },
);

OTPField.displayName = "OTPField";
