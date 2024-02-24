"use client"
import React from 'react';
import {Building2, CalendarIcon, CarTaxiFront, HomeIcon, Rss, SignpostBig, UsersRound} from "lucide-react";
import {ChartPieIcon, DocumentDuplicateIcon} from "@heroicons/react/16/solid";
import {cn} from "@/lib/utils";
import hopplaMiniLogo from "@/assets/images/mini_logo.png";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';


const navigation = [
    {name: 'მთავარი', href: '/manage', icon: HomeIcon, current: true},
    {name: 'მგზავრობები', href: '#', icon: SignpostBig, current: false},
    {name: 'დასახლებული პუნქტები', href: '/manage/populated-areas', icon: Building2, current: false},
    {name: 'კომპანიები', href: '/manage/companies', icon: CarTaxiFront, current: false},
    {name: 'მომხმარებლები', href: '#', icon: UsersRound, current: false},
    {name: 'ბლოგი', href: '/manage/articles', icon: Rss, current: false},
    {name: 'რაპორტები', href: '#', icon: ChartPieIcon, current: false},
]

const AdminSidebar = () => {

    const locale = useLocale();
    const pathname = usePathname();

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
                                <Link
                                    href={item.href}
                                    className={cn(
                                        pathname === "/" + locale + item.href ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-primary',
                                        'group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold hoppla-animation'
                                    )}
                                >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                    <span className="sr-only">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default AdminSidebar;
