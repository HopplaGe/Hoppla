"use client"
import React, {Fragment, useState} from 'react';
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {Bars3Icon, ChartPieIcon, DocumentDuplicateIcon, XMarkIcon} from "@heroicons/react/16/solid";
import {
    BellIcon,
    CalendarIcon,
    FolderIcon,
    HomeIcon,
    Car,
    SignpostBig,
    Building2,
    CarTaxiFront,
    UsersRound, Rss
} from "lucide-react";
import {Dialog, Transition} from "@headlessui/react";
import {cn} from "@/lib/utils";
import {useSession} from "next-auth/react";
import UserDropdownMenu from "@/components/shared/UserDropdownMenu";
import {useLocale, useTranslations} from "next-intl";
import LanguageSwitch from "@/components/partials/LanguageSwitch";
import Logo from "@/components/shared/Logo";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Button} from "@nextui-org/react";
import {adminNavItems} from "@/config/nav.config";

const AdminNavbar = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const session = useSession()
    const {data} = session;
    // const isLoggedIn = !!data;
    // const userRole = data?.user?.role;
    const t = useTranslations("NavBar");

    return (
        <>
            <div
                className="sticky top-0 z-40 flex w-full h-16 shrink-0 justify-between items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}>
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                </button>


                <div className="flex gap-x-4 w-full justify-end lg:gap-x-6">
                    <form className="hidden relative lg:flex flex-1" action="#" method="GET">
                        <label htmlFor="search-field" className="sr-only">
                            Search
                        </label>
                        <MagnifyingGlassIcon
                            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <input
                            id="search-field"
                            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                            placeholder="Search..."
                            type="search"
                            name="search"
                        />
                    </form>
                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>

                        {/* Separator */}
                        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"/>

                        <LanguageSwitch/>

                        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"/>

                        {/* Profile dropdown */}
                        <UserDropdownMenu user={data?.user} t={t}/>
                    </div>
                </div>
            </div>

            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-secondary"/>
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1 scrollbar-hide">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <Button
                                            variant="solid"
                                            color="secondary"
                                            className="py-3 min-w-unit-0"
                                            onClick={() => setSidebarOpen(false)}
                                            startContent={<XMarkIcon className="h-6 w-6" aria-hidden="true"/>}
                                        />
                                        {/*<button type="button" className="-m-2.5 p-2.5"*/}
                                        {/*        onClick={() => setSidebarOpen(false)}>*/}
                                        {/*    <span className="sr-only">Close sidebar</span>*/}
                                        {/*    <XMarkIcon className="h-6 w-6 text-primary" aria-hidden="true"/>*/}
                                        {/*</button>*/}
                                    </div>
                                </Transition.Child>

                                <div
                                    className="flex grow flex-col gap-y-5 overflow-y-auto bg-white pb-4 rounded-r-xl scrollbar-hide">
                                    <div className="flex h-16 px-6 shrink-0 items-center">
                                        <Logo/>
                                    </div>
                                    <nav className="flex flex-1 flex-col ml-4 gap-1">
                                        {adminNavItems.map((item, index) => (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className={cn(
                                                    pathname === "/" + locale + item.href
                                                        ? "bg-secondary text-white rounded-l-xl px-6" :
                                                        "bg-transparent",
                                                    "py-4 hover:bg-secondary hover:text-white",
                                                    "focus:bg-secondary focus:text-white rounded-l-xl px-6",
                                                    'group flex gap-x-3 items-center fira-go hoppla-animation text-sm'
                                                )}
                                            >
                                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                                {item.name}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default AdminNavbar;
