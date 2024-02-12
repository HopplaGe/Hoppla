import Link from "next/link";
import {cn} from "@/lib/utils";
import {ChevronRight, PersonStanding} from "lucide-react";
import React from "react";


type DirectionHeaderItemProps = {
    location: string;
    symbol: "from" | "to";
};

const DirectionHeaderItem = ({location, symbol}: DirectionHeaderItemProps) => {
    return (
        <li aria-label={symbol === "to" ? "Drop-off location" : "Pick-up location"}
            className="group min-h-10 hover:bg-gray-100 transform transition-all duration-300 ease-in-out">
            <Link href="#" className="flex flex-col px-6">
                <div className="flex justify-between">
                    <div className="flex flex-col pt-1">
                        <time className="fira-go text-primary w-12 font-semibold text-lg">18:00
                        </time>
                        <span className="text-gray-500 text-xs font-semibold">{symbol === "to" ? "" : "2:15"}</span>
                    </div>

                    <div aria-hidden="true"
                         className="relative flex flex-col items-center min-h-10 flex-shrink-0 mx-2 w-2">
                        <div className={cn("w-1 h-3", symbol === "to" ? "bg-primary" : "bg-transparent")}></div>
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
                            <div
                                className="bg-white box-border w-3 h-3 rounded-full border-2 border-primary"
                                aria-hidden="true"></div>
                        </div>
                        <div className={cn("w-1 h-full", symbol === "to" ? "bg-transparent" : "bg-primary")}></div>
                    </div>

                    <div className="relative flex-1 py-2 pr-4 flex flex-col gap-2">
                        <div className="flex flex-col gap-0">
                            <span
                                className="text-sm fira-go">{location.split(",").slice(0, -2)}</span>
                            <span className="text-xs fira-go">
                            {location.split(",").slice(-2).join(",")}
                        </span>
                        </div>

                        <div className="flex gap-2 justify-start items-center">
                            <div className={cn("rounded-full text-white", "bg-success")}>
                                <PersonStanding size={16}/>
                            </div>
                            <span className="text-[10px] text-success uppercase">743 m from your departure</span>
                        </div>
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 group-hover:text-red-600">
                            <ChevronRight/>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default DirectionHeaderItem;