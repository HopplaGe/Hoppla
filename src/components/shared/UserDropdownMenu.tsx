import React from 'react';
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {User} from "@nextui-org/user";
import {signOut} from "next-auth/react";
import {ShieldCheck, Users} from "lucide-react";
import {cn} from "@/lib/utils";
import {userMenuItems} from "@/config/nav.config";
import MobileUserMenu from "@/components/partials/MobileUserMenu";

type UserDropdownMenuProps = {
    user: any;
    t: any;
}

const UseDropdownMenu = ({user, t}: UserDropdownMenuProps) => {

    return (
        <>
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <div>
                        <div className='hidden sm:block'>
                            <User
                                as="button"
                                avatarProps={{
                                    radius: "lg",
                                    isBordered: false,
                                    src: user?.image as string,
                                    alt: user?.name as string,
                                    name: user?.name as string,
                                }}
                                className="transition-transform"
                                description={user?.email as string}
                                name={user?.name as string}
                            />
                        </div>
                        <div className='sm:hidden'>
                            <Avatar
                                radius="lg"
                                src={user?.image as string}
                                alt={user?.name as string}
                                name={user?.name as string}
                            />
                        </div>
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label={t('NavBar.UserActions')} variant="flat" className="fira-go"
                              items={userMenuItems}>

                    <DropdownItem key="profile"
                                  className="h-14"
                                  color={user?.role === "ADMIN" ? "success" : "default"}
                                  variant="flat"
                                  endContent={user?.role === "ADMIN" ? <ShieldCheck size={18}/> : <Users size={18}/>}
                    >
                        <div className="w-full gap-2 flex flex-row justify-between items-center">
                            <div className="flex flex-col items-start gap-0.5">
                                <p className="font-semibold">{t('UserMenu.SignedInAs')}</p>
                                <p className="font-semibold">{user?.email}</p>
                            </div>
                        </div>
                    </DropdownItem>

                    <DropdownItem key="manage" className={cn(user?.role === "ADMIN" ? "flex" : "hidden")}
                                  href="/manage">
                        ადმინისტრირება
                    </DropdownItem>
                    <DropdownItem key="dashboard" href={"/dashboard"}>
                        {t(`UserMenu.Profile`)}
                    </DropdownItem>
                    <DropdownItem key="my-rides" href="/dashboard/rides">
                        {t(`UserMenu.MyRides`)}
                    </DropdownItem>
                    <DropdownItem key="my-vehicles" href={"/dashboard/vehicles"}>
                        {t(`UserMenu.MyVehicles`)}
                    </DropdownItem>
                    <DropdownItem key="my-tickets" href={"/dashboard/tickets"}>
                        {t(`UserMenu.MyTickets`)}
                    </DropdownItem>
                    <DropdownItem key="my-payments" href={"/dashboard/payments"}>
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
        </>
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