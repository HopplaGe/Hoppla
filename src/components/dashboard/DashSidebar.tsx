"use client"
import React, {ReactNode} from 'react';
import {Listbox, ListboxItem, ListboxSection} from "@nextui-org/react";
import {Cog, CreditCard, Home, SignpostBig, Star, Ticket} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const userDashboardMenu = [
    {
        title: "Home",
        href: "/dashboard",
        description: "ManageRides",
        category: "Navigation",
        icon: <Home/>
    },
    {
        title: "Rides",
        href: "/dashboard/rides",
        description: "ManageRides",
        category: "Navigation",
        icon: <SignpostBig/>
    },
    {
        title: "Tickets",
        href: "/dashboard/tickets",
        description: "ManageTickets",
        category: "Navigation",
        icon: <Ticket/>
    },
    {
        title: "Rates",
        href: "/dashboard/rates",
        description: "ManageRates",
        category: "Navigation",
        icon: <Star/>
    },
    {
        title: "Payments",
        href: "/dashboard/payments",
        description: "ManagePayments",
        category: "Manage",
        icon: <CreditCard/>
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        description: "ManageSettings",
        category: "Manage",
        icon: <Cog/>
    }
]


export const ListboxWrapper = ({children}: { children: ReactNode }) => (
    <div
        className="hidden lg:block w-full h-min bg-white  px-1 py-2 rounded-small fira-go">
        {children}
    </div>
);
const DashSidebar = () => {
    const t = useTranslations("Dashboard.DashSidebar");
    const locale = useLocale();

    const pathname = usePathname();

    // console.log(locale)

    return (
        <ListboxWrapper>
            <Listbox variant="flat" aria-label="Listbox menu with sections" items={userDashboardMenu.filter(
                (value, index, self) => self.findIndex((t) => (
                    t.category === value.category
                )) === index
            )}>
                {(item) => (
                    <ListboxSection title={t(item.category)} showDivider={
                        item.category === userDashboardMenu[0].category
                    } key={item.category}>
                        {userDashboardMenu.filter(
                            (menu) => menu.category === item.category
                        ).map((item) => (
                                <ListboxItem
                                    key={item.title}
                                    description={t(item.description)}
                                    startContent={item.icon}
                                    href={item.href}
                                    className={cn(pathname === '/' + locale + item.href ? "bg-default-200" : "")}
                                >
                                    {t(item.title)}
                                </ListboxItem>
                            )
                        )}
                    </ListboxSection>

                )}
            </Listbox>
        </ListboxWrapper>
    );
};

export default DashSidebar;
