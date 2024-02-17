"use client"
import React from 'react';

import {useTranslations} from "next-intl";
import {Ride} from "@prisma/client";
import RideCard from "@/components/rides/RideCard";

type RideListType = {
    searchParams: {
        from: string | undefined;
        to: string;
        date: string;
        seats: number;
        transport_type?: string;
        sort?: string;
        filter?: string;
    },
    rides: any
}


const RidesResultList = ({rides, searchParams}: RideListType) => {

    const t = useTranslations("Rides.ResultList");

    return (
        <>
            <h2 className="text-2xl font-bold fira-go">{t("Results")}</h2>
            <div className='mb-4 fira-go'>
                <p className="text-gray-500 text-xs">
                    {searchParams.from} - {searchParams.to}
                </p>
                <p className="text-gray-500 text-xs">
                    {t("FoundRide", {count: rides.length})}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rides.map((ride: Ride) => (
                    <div key={ride.id}
                         className='bg-card border border-default-100 rounded-xl overflow-hidden'>
                        <RideCard ride={ride} searchParams={searchParams}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RidesResultList;
