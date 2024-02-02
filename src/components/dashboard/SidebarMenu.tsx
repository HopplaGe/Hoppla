"use client"
import React from 'react';
import {cn} from "@/lib/utils";
import {Bell, CreditCard, Fingerprint, Home, User} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";


const secondaryNavigation = [
    {name: 'მთავარი', href: '/dashboard', icon: Home},
    {name: 'პერსონალური ინფო', href: '/dashboard/profile', icon: User},
    {name: 'დაცვა', href: '#', icon: Fingerprint},
    {name: 'შეტყობინებები', href: '#', icon: Bell},
    {name: 'გადახდები', href: '#', icon: CreditCard},
]

const SidebarMenu = () => {

    const pathname = usePathname()

    return (
        <aside
            className="flex overflow-x-auto border-b border-gray-900/5 lg:block lg:w-64 lg:flex-none lg:border-0">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
                <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                    {secondaryNavigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    pathname === item.href
                                        ? 'bg-gray-50 text-primary'
                                        : 'text-secondary hover:text-secondary hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        pathname === item.href ? 'text-primary' : 'text-gray-400 group-hover:text-secondary',
                                        'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default SidebarMenu;
