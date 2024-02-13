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
    }
}


const RidesResultList = ({rides}: { rides: any }) => {

    console.log(rides);

    const t = useTranslations("Rides");

    return (
        <>
            <h2 className="text-2xl font-bold">Results</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rides.map((ride: Ride) => (
                    <div key={ride.id}
                         className='bg-white shadow-lg border border-gray-200 rounded-xl  overflow-hidden'>
                        <RideCard ride={ride} driver={null}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RidesResultList;
