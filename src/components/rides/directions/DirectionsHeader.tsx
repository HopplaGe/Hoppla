"use client"
import useDirections from "@/hooks/maps/useDirections";
import MapBg from "@/components/shared/maps/MapBg";
import DirectionHeaderItem from "./DirectionHeaderItem";
import React from "react";
import { cn } from "@/lib/utils";

type DirectionsHeaderProps = {
    from: string;
    to: string;
};
const DirectionsHeader = ({ from, to }: DirectionsHeaderProps) => {

    const { duration } = useDirections(from, to);

    return (
        <div className="relative h-44">
            <div
                className="py-10 page-wrapper absolute bottom-0 lg:relative w-full z-10">
                <div className="page-wrapper">
                    <ul className={cn("flex flex-col md:w-full lg:w-2/4 h-auto rounded-xl list-none overflow-hidden bg-white shadow-lg border border-gray-200 z-10")}>

                        <DirectionHeaderItem location={from} symbol={"from"} />
                        <DirectionHeaderItem location={to} symbol={"to"} />
                    </ul>
                </div>
            </div>
            <div
                className="absolute h-full inset-0 w-full object-cover bg-blend-screen opacity-60 focus:outline-0">
                <MapBg />
            </div>
        </div>
    );
};

export default DirectionsHeader;
