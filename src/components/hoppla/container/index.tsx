"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
    return <div className={cn("container mx-auto", className)}>{children}</div>;
};

Container.displayName = "Container";
