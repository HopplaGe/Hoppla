"use client"
import React, {ReactNode} from 'react';
import {Listbox, ListboxItem, ListboxSection} from "@nextui-org/react";
import {Cog, CreditCard, Home, SignpostBig, Star, Ticket} from "lucide-react";
import {useTranslations} from "next-intl";

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
        className="w-full h-min bg-white shadow-md px-1 py-2 rounded-small fira-go">
        {children}
    </div>
);
const DashSidebar = () => {
    const t = useTranslations("Dashboard.DashSidebar");

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
