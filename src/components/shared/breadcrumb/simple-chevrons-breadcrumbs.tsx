"use client"
import React from 'react';
import {ChevronRightIcon, HomeIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";

export type BreadCrumbsProps = {
    translations?: any
}

export const SimpleChevronsBreadCrumbs = ({translations}: BreadCrumbsProps) => {

    const params = usePathname();
    const parts = params.split("/").filter((part) => part !== "");
    parts.shift();

    const pages = parts.map((part, index) => {
        const href = `/${parts.slice(0, index + 1).join("/")}`;
        return {
            name: part,
            href,
            current: index === parts.length - 1,
        };
    });

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4 fira-go">
                {pages.map((page) => (
                    <li key={page.name}>
                        {!page.current ? (
                            <div className="flex items-center space-x-4">
                                <Link href={page.href} className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true"/>
                                    <span className="sr-only">Home</span>
                                </Link>
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </div>
                        ) : (
                            <span className="text-sm font-medium text-gray-500 select-none"
                                  aria-current={page.current ? 'page' : undefined}>
                                {translations ? translations(page.name.charAt(0).toUpperCase() + page.name.slice(1).trim()) : page.name}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

SimpleChevronsBreadCrumbs.displayName = 'SimpleChevronsBreadCrumbs';