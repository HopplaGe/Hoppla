"use client"
import React from 'react';

import {useTranslations} from "next-intl";
import {Ride} from "@prisma/client";
import RideCard from "@/components/rides/RideCard";
import {useRides} from "@/hooks/rides/useRides";

type RideListType = {
    searchParams: {
        from: string | undefined;
        to: string;
        date: string;
        seats: number;
        transport_type?: string;
        sort?: string;
        filter?: string;
    }
}


const RidesResultList = ({searchParams}: RideListType) => {

    const t = useTranslations("Rides.ResultList");

    const {data: rides, isLoading, error} = useRides(searchParams);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    return (
        <div className='flex flex-col gap-4'>
            <h2 className="text-2xl font-bold fira-go">{t("Results")}</h2>
            <div className='mb-4 fira-go'>
                <p className="text-gray-500 text-xs">
                    {searchParams.from} - {searchParams.to}
                </p>
                <p className="text-gray-500 text-xs">
                    {t("FoundRide", {count: rides?.length})}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rides?.map((ride: Ride) => (
                    <div key={ride.id}
                         className='bg-card border border-default-100 rounded-xl overflow-hidden'>
                        <RideCard ride={ride} searchParams={searchParams}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RidesResultList;
