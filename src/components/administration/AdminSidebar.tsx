"use client"
import React, {Fragment, useState} from 'react';
import {Transition} from "@headlessui/react";
import {CalendarIcon, FolderIcon, HomeIcon, UsersIcon} from "lucide-react";
import {ChartPieIcon, DocumentDuplicateIcon, XMarkIcon} from "@heroicons/react/16/solid";
import {cn} from "@/lib/utils";
import {Dialog} from "@headlessui/react";
import hopplaMiniLogo from "@/assets/images/mini_logo.png";
import Image from "next/image";
import Link from "next/link";


const navigation = [
    {name: 'Dashboard', href: '#', icon: HomeIcon, current: true},
    {name: 'Team', href: '#', icon: UsersIcon, current: false},
    {name: 'Projects', href: '#', icon: FolderIcon, current: false},
    {name: 'Calendar', href: '#', icon: CalendarIcon, current: false},
    {name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false},
    {name: 'Reports', href: '#', icon: ChartPieIcon, current: false},
]

const AdminSidebar = () => {

    return (
        <>

            <div
                className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-secondary lg:pb-4">
                <div className="flex h-16 shrink-0 items-center justify-center">
                    <Link href="/">
                        <Image src={hopplaMiniLogo} alt="Hoppla.ge" width={32}/>
                    </Link>
                </div>
                <nav className="mt-8">
                    <ul role="list" className="flex flex-col items-center space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={cn(
                                        item.current ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-primary',
                                        'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                                    )}
                                >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                    <span className="sr-only">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default AdminSidebar;
