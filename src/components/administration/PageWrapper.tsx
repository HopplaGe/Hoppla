"use client"
import React from 'react';
import {cn} from "@/lib/utils";

export type PageWrapperProps = {
    children: React.ReactNode;
}

const PageWrapper = ({children}: PageWrapperProps) => {
    return (
        <div
            className={cn(
                "px-4",
                "py-6",
                "sm:px-6",
                "lg:pl-8",
                "xl:flex-1",
                "xl:pl-6",
                "space-y-6",
            )}
        >
            {children}
        </div>
    );
};

export default PageWrapper;
