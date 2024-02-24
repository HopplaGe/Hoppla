"use client"
import React, {Fragment} from 'react';
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Dialog, Transition} from '@headlessui/react'
import {X} from "lucide-react";
import Logo from "@/components/shared/Logo";
import {Button} from "@nextui-org/react";

type MobileNavProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    items: { name: string; href: string }[];
    t: any;
    locale: string;
    isLoggedIn: boolean;
    pathName: string;
};

const MobileNav = ({
                       open,
                       setOpen,
                       items,
                       t,
                       locale,
                       isLoggedIn,
                       pathName,
                   }: MobileNavProps) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" onClose={setOpen}
                    className={cn(open ? "block" : "hidden", "lg:hidden w-full h-screen fixed top-0 left-0 z-50 fira-go")}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-primary"/>
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
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
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
                                        variant="light"
                                        color="default"
                                        className="px-0! min-w-0 block"
                                        onClick={() => setOpen(false)}
                                        startContent={<X color="white"/>}
                                    />
                                </div>
                            </Transition.Child>
                            <div
                                className="flex grow flex-col gap-y-5 overflow-y-auto bg-white pb-4 rounded-r-xl">
                                <div className="flex h-16 px-6 shrink-0 items-center">
                                    <Logo/>
                                </div>
                                <nav className="flex flex-1 flex-col ml-4 gap-2">
                                    {items.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={cn(pathName === ("/" + locale + item.href) ?
                                                    "bg-primary text-white rounded-l-xl px-6" :
                                                    "bg-transparent",
                                                "py-4 hover:bg-primary hover:text-white",
                                                "focus:bg-primary focus:text-white rounded-l-xl px-6",
                                            )}
                                            onClick={() => setOpen(false)}
                                        >
                                            {t(item.name)}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>

            </Dialog>
        </Transition.Root>
    );
};

export default MobileNav;
