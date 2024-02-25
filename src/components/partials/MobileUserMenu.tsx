"use client"
import React from 'react';
import {Home, SignpostBig, Ticket, User} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "@/i18n/navigation";

const MobileUserMenu = () => {
    const pathName = usePathname();
    return (
        <div
            className="fixed md:hidden z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-t-xl bottom-0 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                <Link data-tooltip-target="tooltip-home" href={"/"}
                      className={cn(
                          "inline-flex flex-col items-center justify-center px-5 rounded-s-xl hover:bg-gray-50 dark:hover:bg-gray-800 group",
                          pathName === "/" ? "bg-gray-50 dark:bg-gray-800" : ""
                      )}>
                    <Home
                        className={cn(
                            "w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary",
                            pathName === "/" ? "text-primary dark:text-primary" : ""
                        )}/>
                    <span className="sr-only">Home</span>
                </Link>
                <div id="tooltip-home" role="tooltip"
                     className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Home
                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                </div>
                <Link data-tooltip-target="tooltip-wallet" href={"/dashboard/tickets"}
                      className={cn(
                          "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group",
                          pathName === "/dashboard/tickets" ? "bg-gray-50 dark:bg-gray-800" : ""
                      )}>
                    <Ticket
                        className={cn(
                            "w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary",
                            pathName === "/dashboard/tickets" ? "text-primary dark:text-primary" : ""
                        )}/>
                    <span className="sr-only">Tickets</span>
                </Link>
                <div id="tooltip-wallet" role="tooltip"
                     className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Tickets
                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                </div>
                <div className="flex items-center justify-center">
                    <Link data-tooltip-target="tooltip-new" href={"/offer-seats"}
                          className="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary rounded-xl hover:bg-primary-dark group focus:outline-none">
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 1v16M1 9h16"/>
                        </svg>
                        <span className="sr-only">Offer a ride</span>
                    </Link>
                </div>
                <div id="tooltip-new" role="tooltip"
                     className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Offer a ride
                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                </div>
                <Link data-tooltip-target="tooltip-settings" href={"/dashboard/rides"}
                      className={cn(
                          "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group",
                          pathName === "/dashboard/rides" ? "bg-gray-50 dark:bg-gray-800" : ""
                      )}>
                    <SignpostBig
                        className={cn(
                            "w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary",
                            pathName === "/dashboard/rides" ? "text-primary dark:text-primary" : ""
                        )}/>
                    <span className="sr-only">Rides</span>
                </Link>
                <div id="tooltip-settings" role="tooltip"
                     className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Rides
                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                </div>
                <Link data-tooltip-target="tooltip-profile" href={"/dashboard"}
                      className={cn(
                          "inline-flex flex-col items-center justify-center px-5 rounded-e-xl hover:bg-gray-50 dark:hover:bg-gray-800 group",
                          pathName === "/dashboard" ? "bg-gray-50 dark:bg-gray-800" : ""
                      )}>
                    <User
                        className={cn(
                            "w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary",
                            pathName === "/dashboard" ? "text-primary dark:text-primary" : ""
                        )}/>
                    <span className="sr-only">Dashboard</span>
                </Link>
                <div id="tooltip-profile" role="tooltip"
                     className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Dashboard
                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                </div>
            </div>
        </div>
    );
};

export default MobileUserMenu;
