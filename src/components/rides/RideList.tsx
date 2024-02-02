import React from 'react';
import RideCard from "@/components/rides/RidesCard";
import {getRides} from "@/lib/actions/rides";

const RidesList = async () => {
    const rides = await getRides();
    return (
        <ol className="divide-y-0 divide-gray-50 text-sm leading-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {rides && rides.map((ride, index) => (
                // @ts-ignore
                <RideCard ride={ride} key={index}/>
            ))}
        </ol>
    );
};

export default RidesList;
