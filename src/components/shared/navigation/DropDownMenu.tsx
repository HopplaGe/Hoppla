import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {cn} from "@/lib/utils";
import {signOut} from "next-auth/react";
import {Link} from "@nextui-org/react";
import {ShieldCheck} from "lucide-react";

type DropDownMenuProps = {
    userNavigation: { name: string; href: string; }[]
    role: string | null | undefined;
}

const DropDownMenu = ({userNavigation, role}: DropDownMenuProps) => {

    // delete userNavigation object whose href is /management if role is not ADMIN
    if (role !== "ADMIN") {
        userNavigation = userNavigation.filter((item) => item.href !== "/management")
    }

    return (
        <>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-20 mt-6 w-48 origin-top-right rounded-md bg-white py-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                    {userNavigation.map((item, index) => (
                        <Menu.Item key={index}>
                            <Link
                                showAnchorIcon
                                anchorIcon={role === "ADMIN" && item.href === '/management' ?
                                    <ShieldCheck size={16}/> : ''}
                                href={item.href}
                                className={cn(
                                    'flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left',
                                    role === "ADMIN" && item.href === '/management' ? 'bg-lime-800/10 hover:bg-lime-800/20 text-lime-600' : '',
                                )}
                            >
                                {item.name}
                            </Link>
                        </Menu.Item>
                    ))}
                    <Menu.Item>
                        {({active}: { active: boolean }) => (
                            <button
                                onClick={() => signOut()}
                                className={cn(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                )}
                            >
                                გასვლა
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </>
    );
};

export default DropDownMenu;
