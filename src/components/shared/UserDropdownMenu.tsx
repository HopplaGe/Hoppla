import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {User} from "@nextui-org/user";
import {signOut} from "next-auth/react";

type UserDropdownMenuProps = {
    user: any;
    t: any;
}

const userMenuItems = [
    {name: "Profile", href: "/profile"},
    {name: "MyRides", href: "/my-rides"},
    {name: "MyVehicles", href: "/my-vehicles"},
    {name: "MyTickets", href: "/my-tickets"},
    {name: "MyPayments", href: "/my-payments"},
    {name: "Analytics", href: "/analytics"},
    {name: "Settings", href: "/settings"},
    {name: "LogOut", onClick: () => console.log("logout")},
];


const UseDropdownMenu = ({user, t}: UserDropdownMenuProps) => {
    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <User
                    as="button"
                    avatarProps={{
                        radius: "lg",
                        isBordered: true,
                        src: user?.image as string,
                        alt: user?.name as string,
                        name: user?.name as string,
                    }}
                    className="transition-transform"
                    description={user?.email as string}
                    name={user?.name as string}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label={t('NavBar.UserActions')} variant="flat" className="fira-go" items={userMenuItems}>

                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">{t('UserMenu.SignedInAs')}</p>
                    <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem key="dashboard" href="/dashboard">
                    {t(`UserMenu.Profile`)}
                </DropdownItem>
                <DropdownItem key="my-rides" href="/dashboard/my-rides">
                    {t(`UserMenu.MyRides`)}
                </DropdownItem>
                <DropdownItem key="my-vehicles" href="/dashboard/my-vehicles">
                    {t(`UserMenu.MyVehicles`)}
                </DropdownItem>
                <DropdownItem key="my-tickets" href="/dashboard/my-tickets">
                    {t(`UserMenu.MyTickets`)}
                </DropdownItem>
                <DropdownItem key="my-payments" href="/dashboard/my-payments">
                    {t(`UserMenu.MyPayments`)}
                </DropdownItem>
                <DropdownItem key="analytics" href="/dashboard/analytics">
                    {t(`UserMenu.Analytics`)}
                </DropdownItem>
                <DropdownItem key="settings" href="/dashboard/settings">
                    {t(`UserMenu.Settings`)}
                </DropdownItem>
                <DropdownItem key="logout" onClick={() => signOut()} color="danger">
                    {t(`UserMenu.LogOut`)}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UseDropdownMenu;


export const Item = ({item, t}: any) => {
    return (
        <DropdownItem key={item.name} onClick={item.onClick}>
            {t(`${item.name}`)}
        </DropdownItem>
    );
}